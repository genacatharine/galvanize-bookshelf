
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function (table) {
    table.increments()
    table.varchar('title', 255).notNullable().defaultTo('')
    table.varchar('author', 255).notNullable().defaultTo('')
    table.varchar('genre', 255).notNullable().defaultTo('')
    table.text('description').notNullable().defaultTo('')
    table.text('cover_url').notNullable().defaultTo('')
    // table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable()
    // table.timestamp('updated_at').defaultTo(knex.raw('now()')).notNullable()
    table.timestamps(true, true)

  })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('books')
};
