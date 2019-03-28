
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'ed', password: '$2a$12$NzjfpQc8rTlMarLj7TXu6eC/EonpotMXyFX7U5dUAQyBgg2XWtoJO' },
        { username: 'jason', password: '$2a$12$NzjfpQc8rTlMarLj7TXu6eC/EonpotMXyFX7U5dUAQyBgg2XWtoJO' },
        { username: 'raymond', password: '$2a$12$NzjfpQc8rTlMarLj7TXu6eC/EonpotMXyFX7U5dUAQyBgg2XWtoJO' }
      ]);
    });
};
