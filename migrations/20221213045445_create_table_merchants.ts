import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  await knex.schema.createTable("merchants", (table) => {
    table.increments("id").unique().notNullable().primary().unsigned();
    table.string("name").notNullable();
    table.string("phone").notNullable();
    table.decimal("lat").notNullable();
    table.decimal("lon").notNullable();
    table.boolean("is_active").notNullable().defaultTo(true);
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("merchants");
}
