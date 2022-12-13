import path from "path";
import log from "../pkg/log";

interface Config {
  rootDir: string;
}

let instance: Config | null = null;

namespace config {
  export const get = () => {
    if (instance == null) {
      instance = init();
    }
    return instance;
  };

  export const init = () => {
    instance = {
      rootDir: "",
    };

    return instance;
  };

  export const setRootDir = (rootDir: string) => {
    if (!instance) {
      throw new Error("config wasn't setup properly");
    }

    instance.rootDir = rootDir;

    log.info(Object.values(config).toString());
  };
}

export default config;
