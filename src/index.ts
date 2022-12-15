import express, { Express } from "express";
import { graphqlHTTP } from "express-graphql";
import config from "./pkg/config";
import InitGQL from "./graphql";
import Handlers from "./handlers";
import InitDB from "./pkg/db/db";
import log from "./pkg/log";
import MerchantRepository from "./repositories/merchants";
import applyRoutes from "./routes";
import MerchantUseCase from "./usecases/merchants";
import path from "path";

const init = () => {
  try {
    const rootPath = path.resolve(__dirname, "../../conf/config.ini");

    log.init();
    config.init(rootPath);
  } catch (err) {
    console.error("failed to initialize, err:", err);
    process.exit(1);
  }
};

const main = async () => {
  try {
    const app: Express = express();
    const port = "3000";

    const db = await InitDB();

    const mRepo = new MerchantRepository({ db: db });

    const mUC = new MerchantUseCase({ merchantRepo: mRepo });

    const gql = await InitGQL({ merchantUC: mUC });

    const h = new Handlers({ merchantUC: mUC });

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: gql,
        graphiql: true,
      })
    );

    applyRoutes(app, h);

    app.listen(port, () => {
      log.info(`⚡️[server]: Server is running at http://localhost:${port}`);
    });

    // graceful shutdown
    // for (let signal of ["SIGTERM", "SIGINT"]) {
    //   process.on(signal, async () => {
    //     console.log("⚡️[server]: closing");
    //     await Delay(100);

    //     srv.close((err) => {
    //       console.log("⚡️[server]: closed");
    //       process.exit(err ? 1 : 0);
    //     });
    //   });
    // }
  } catch (err) {
    log.error("cant establish server, err:", err);
  }
};

init();
main();
