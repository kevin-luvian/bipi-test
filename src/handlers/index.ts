import log from "../pkg/log";
import MerchantUseCase from "../usecases/merchants";
import Merchant from "./merchants";

export interface Dependencies {
  merchantUC: MerchantUseCase;
}

class Handlers {
  public Merchant: Merchant;

  constructor(dep: Dependencies) {
    this.Merchant = new Merchant(dep.merchantUC);

    log.info("handlers created");
  }
}

export default Handlers;
