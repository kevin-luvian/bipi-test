import { Knex, knex } from "knex";
import config from "../config";
import log from "../log";

const InitDB = async () => {
  const instance: Knex = knex(config.get().knex);

  // log raw database query on development
  if (config.IsDevENV()) {
    instance.on("query", function (query) {
      log.info(
        "knex query:",
        query["sql"],
        "args:",
        JSON.stringify(query["bindings"])
      );
    });
  }

  await instance.raw("select 1");
  log.info(`Connected to database - OK`);

  return instance;
};

export default InitDB;
