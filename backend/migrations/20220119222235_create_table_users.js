exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary().notNull();
        table.string('name').notNull();
        table.string('email').notNull();
        table.string('password').notNull();
        table.boolean('isAdmin');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};