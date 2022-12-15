import { Request, Response } from "express";
import MerchantUseCase from "../usecases/merchants";

export class Merchant {
  private merchantUC: MerchantUseCase;

  constructor(merchantUC: MerchantUseCase) {
    this.merchantUC = merchantUC;
  }

  public GetMerchants = async (req: Request, res: Response) => {
    const data = await this.merchantUC.GetAll();
    res.json({ merchants: data });
  };
}

export default Merchant;
