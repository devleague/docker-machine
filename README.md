## Docker Machine

#### 1.) Creating a EC2 Instance using Docker-machince

```
docker-machine create -d amazonec2 \
--amazonec2-region us-west-2 \
--amazonec2-secret-key ${secretKey} \
--amazonec2-access-key ${accessKey} \
${machineName}
```

#### Debugging docker machine

To view information about docker machines on your local system:

- `docker-machine active` to view the currently set docker machine
- `docker-machine ls` to view all docker machine setup on the local system


To view specific information about a single docker machine:

- `docker-machine config ${machineName}` to view the config of a docker machine
- `docker-machine ip ${machineName}` to view the ip of a docker machine
- `docker-machine status ${machineName}` to view the status of a docker machine
- `docker-machine ssh ${machineName}` to login to the ec2 instance


To fix issues connecting to your docker machine:

- `docker-machine provision ${machineName}` to reinstall docker and certs on a ec2 instance
- `docker-machine regenerate-certs ${machineName}` to regenerate certs (used to connect to a docker machine) and save them locally as well as on the ec2 instance


To bring start, stop, kill, or remove a docker machine (allow a lot of time for all of these command to finish):

- `docker-machine start ${machineName}`
- `docker-machine stop ${machineName}`
- `docker-machine kill ${machineName}`
- `docker-machine restart ${machineName}`


## AWS RDS


#### 2.) Get EC2Instance information

```
aws ec2 describe-instances
```

The security group id we'll be using can be found under Instance -> NetworkInterfaces -> Groups -> GroupId where the GroupName matches "Docker Machine". From now on, it'll be referred to using ${securityGroupID}.


#### 3.) Update SG inbound to allow 5432, 80, 8080

```
aws ec2 authorize-security-group-ingress \  
--group-id ${securityGroupID} \  
--ip-permissions IpProtocol=tcp,FromPort=5432,ToPort=5432,IpRanges=[{CidrIp=0.0.0.0/0}] IpProtocol=tcp,FromPort=8080,ToPort=8080,IpRanges=[{CidrIp=0.0.0.0/0}] IpProtocol=tcp,FromPort=80,ToPort=80,IpRanges=[{CidrIp=0.0.0.0/0}] IpProtocol=tcp,FromPort=6379,ToPort=6379,IpRanges=[{CidrIp=0.0.0.0/0}]
```


#### 4.) Create a Postgres RDS Instance:  
```
aws rds create-db-instance \
--allocated-storage 20 \
--db-name ${databaseName} \
--db-instance-class db.t3.micro \
--db-instance-identifier ${instanceName} \
--vpc-security-group-ids ${securityGroupID} \
--engine postgres \
--master-username ${username} \
--master-user-password ${password}
```


#### 5.) Update .env with new postgres host
**List RDS Instances: (JSON formatted):**  

```aws rds describe-db-instances```

The Endpoint section has a Address key that can be used as the ${host} from now on. Update the .env file with   
`POSTGRES_HOSTNAME=${host}`


#### 6.) Build docker image
`docker build -t ${dockerUsername}/${imageName}:${version}`

`docker push ${dockerUsername}/${imageName}:${version}`


#### 7.) Run docker image on EC2

`docker-machine env ${machineName}`  

`eval $(docker-machine env ${machineName})`

`docker-compose -f docker-compose.prod.yml up`  


## Elasticache

#### 8.) Create Elasticache instance\

```
aws elasticache create-cache-cluster \
--cache-cluster-id ${machineName} \
--cache-node-type cache.t2.micro \
--num-cache-nodes 1 \
--engine redis \
--security-group-ids ${securityGroupID} \
```


#### 9.) List ElasticCache Instances: (JSON formatted)  
`aws elasticache describe-cache-clusters --show-cache-node-info`

Under "CacheClusters" -> "CacheNodes" -> "Endpoint" is the endpoint of the redis cache that we'll need. Update .env file with  
`REDIS_HOSTNAME=redis://${cacheEndpoint}:6379`

Restart your docker-compose.




## Clean up

** Unset Docker-Machine **
```
docker-machine env --unset
eval $(docker-machine env --unset)
```

** Delete Docker Machine locally and EC2 Remotely **

```
docker-machine rm ${machineName}
```

** Manually Delete Security Group **

** Manually Delete Network Interface (VPC) **

** Delete RDS Instance **

```
aws rds delete-db-instance --db-instance-identifier ${instanceName} --skip-final-snapshot
```

** Delete ElastiCache Cluster **

```
aws elasticache delete-cache-cluster --cache-cluster-id ${machineName}
```


## Major Changes

- Update docker-compose.override.yml
 - Add POSTGRES_HOSTNAME to environment
 - Add REDIS_HOSTNAME to environment
- Update docker-compose.prod.yml
 - Remove postgres-primary-db
 - Remove redis-server
- 
