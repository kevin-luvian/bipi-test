import Handler from "../handlers";
import { Router, Express, Request, Response } from "express";
import bodyParser from "body-parser";

const applyRoutes = (app: Express, h: Handler) => {
  app.use(bodyParser.json());

  // all
  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server 2sasdasd");
  });

  //
  const mr = Router();
  {
    mr.get("/", h.Merchant.GetMerchants);
    app.use("/merchants", mr);
  }
};

export default applyRoutes;
