import { Knex, knex } from "knex";
import log from "../log";

export const config = {
  client: "postgresql",
  connection: {
    host: "host.docker.internal",
    port: 4101,
    database: "bipi-db",
    user: "bipi",
    password: "bipidb",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

const InitDB = async () => {
  const instance: Knex = knex(config as Knex.Config);

  await instance.raw("select 1");
  log.info(`Connected to database - OK`);

  // .then(() => {
  //   console.log(`Connected to database - OK`);
  // })
  // .catch((err) => {
  //   console.error(`Failed to connect to database: ${err}`);
  //   process.exit(1);
  // });

  return instance;
};

export default InitDB;
