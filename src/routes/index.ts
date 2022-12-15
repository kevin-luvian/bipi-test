import Handler from "../handlers";
import { Router, Express, Request, Response } from "express";
import bodyParser from "body-parser";

const applyRoutes = (app: Express, h: Handler) => {
  app.use(bodyParser.json());

  const root = Router();

  // merchants endpoints
  const mr = Router();
  {
    mr.get("/", h.Merchant.GetMerchants);
    root.use("/merchants", mr);
  }

  // root endpoints
  root.get("/", (req: Request, res: Response) => {
    res.send("Backend Express Server");
  });

  app.use("/api", root);
};

export default applyRoutes;
