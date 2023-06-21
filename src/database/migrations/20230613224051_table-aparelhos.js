/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("aparelhos", tbl => {
        tbl.increments ('id');
        tbl.text ("descricao", 255).unique ().notNullable();
        tbl.text ("marca", 128).notNullable();
        tbl.decimal ("valor").notNullable();
    });    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("aparelhos");
};
