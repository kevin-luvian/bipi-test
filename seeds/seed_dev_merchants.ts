import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("merchants").del();

    await knex("merchants").insert([
        { id: 1, name: "merch-1", phone: "+62812345", lat: 10.5, lon: 10.7, is_active: true },
        { id: 2, name: "merch-2", phone: "+62812345", lat: 10.5, lon: 10.7 },
        { id: 3, name: "merch-3", phone: "+62812345", lat: 10.5, lon: 10.7, is_active: false },
        { id: 4, name: "merch-4", phone: "+62812345", lat: 10.5, lon: 10.7 },
        { id: 5, name: "merch-5", phone: "+62812345", lat: 10.5, lon: 10.7 },
    ]);

    // reset sequences for postgresql
    await knex.raw("select setval('merchants_id_seq', (select max(merchants.id) from merchants));")
};
