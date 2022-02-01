
exports.up = function(knex) {
  return knex.schema.createTable('products', table => {
    table.increments('id').primary().notNull();
    table.string('description').notNull();
    table.float('price').notNull();
    table.string('img_url').notNull();

  });
};

exports.down = function(knex) {
      return knex.schema.dropTable('products');
};
