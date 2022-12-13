import express, { Express, Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import config from "./config";
import InitGQL from "./graphql/schema";
import Handlers, { Dependencies } from "./handlers";
import InitDB from "./pkg/db/db";
import log from "./pkg/log";
import MerchantRepository from "./repositories/merchants";
import applyRoutes from "./routes";
import MerchantUseCase from "./usecases/merchants";
import path from "path";

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return "Hello world!";
//   },
// };

const init = () => {
  try {
    log.init();
    config.init();
    config.setRootDir(path.resolve(__dirname));
  } catch (err) {
    console.error("cant initialize app, err:", err);
  }
};

const main = async () => {
  try {
    const app: Express = express();
    const port = "3000";

    const gqlSchema = await InitGQL();
    const db = await InitDB();

    const mRepo = new MerchantRepository({ db: db });

    const mUC = new MerchantUseCase({});

    const h = new Handlers({
      globalPath: "abc",
      merchantUC: mUC,
    });

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: gqlSchema,
        // rootValue: root,
        graphiql: true,
      })
    );

    applyRoutes(app, h);

    const srv = app.listen(port, () => {
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
