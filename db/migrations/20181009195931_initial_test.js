exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('vineyards', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('location');
      table.integer('date_established');
      table.boolean('harvest');

      table.timestamps(true, true);
    }),
    knex.schema.createTable('wines', function(table) {
      table.increments('id').primary;
      table.string('name');
      table.string('grape_type');
      table.string('color');
      table.integer('production_year');
      table.integer('score');
      table.string('price');
      table.integer('vineyard_id').unsigned();
      table.foreign('vineyard_id').references('vineyards.id');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('wines'),
    knex.schema.dropTable('vineyards')
  ]);
};
