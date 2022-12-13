import { Router, Request, Response, NextFunction } from "express";

export class Merchant {
  public path: string = "";

  constructor(path: string) {
    this.path = path;
  }

  public GetMerchants = async (request: Request, response: Response) => {
    const id = request.params.id;
    const userQuery = "UQ";
    response.json({ id, userQuery, path: this.path });
  };
}

export default Merchant