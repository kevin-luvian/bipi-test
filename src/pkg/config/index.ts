import fs from "fs";
import ini from "ini";
import log from "../log";
import { Knex } from "knex";

interface Config {
  env: string;
  knex: Knex.Config;
}

let instance: Config | null = null;

namespace config {
  export const ENV = {
    Development: "development",
    Production: "production",
  };

  export const init = (filePath: string) => {
    const iniCfg = ini.parse(fs.readFileSync(filePath, "utf-8"));

    instance = {
      env: getEnv(iniCfg.app.ENV),
      knex: {
        client: iniCfg.db.Client,
        connection: {
          host: iniCfg.db.Host,
          port: iniCfg.db.Port,
          database: iniCfg.db.Database,
          user: iniCfg.db.User,
          password: iniCfg.db.Password,
        },
        pool: {
          min: 2,
          max: 10,
        },
      },
    };

    log.info("config info", instance);
  };

  export const IsDevENV = () => get().env == ENV.Development;

  export const get = () => {
    if (instance == null) {
      throw new Error("config not configured properly");
    }
    return instance;
  };

  const getEnv = (env: string) => {
    switch (env) {
      case ENV.Production:
        return ENV.Production;
      default:
        return ENV.Development;
    }
  };
}

export default config;
