### Creating a docker machine

- `docker-machine create -d amazonec2 ${machineName} --amazonec2-region us-west-1  --amazonec2-secret-key ${secretKey} --amazonec2-access-key ${accessKey}`
- `docker-machine env ${machineName}`
- Run eval command at the end of previous outpu

### Debugging docker machine

To view information about docker machines on your local system: 

- `docker-machine active` to view the currently set docker machine
- `docker-machine ls` to view all docker machine setup on the local system


To view specific information about a single docker machine:

- `docker-machine config ${machineName}` to view the config of a docker machine
- `docker-machine ip ${machineName} to view the ip of a docker machine
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
 
