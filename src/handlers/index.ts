import log from "../pkg/log";
import MerchantUseCase from "../usecases/merchants";
import Merchant from "./merchants";

export interface Dependencies {
  globalPath: string;
  merchantUC: MerchantUseCase;
}

class Handlers {
  public path: string = "";

  public Merchant: Merchant;
  private mUC: MerchantUseCase;

  constructor(dep: Dependencies) {
    this.path = dep.globalPath;
    this.mUC = dep.merchantUC;

    this.Merchant = new Merchant("");

    log.info("handlers created", "bruhh", "wazzap");
  }
}

export default Handlers;
