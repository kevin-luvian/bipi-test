import { CreateMerchant, UpdateMerchant } from "../entity/merchant";
import { Sortable } from "../entity/query";
import code from "../pkg/e/code";
import e from "../pkg/e/errors";
import log from "../pkg/log";
import MerchantRepository from "../repositories/merchants";

export interface Dependencies {
  merchantRepo: MerchantRepository;
}

class MerchantUseCase {
  private merchantRepo: MerchantRepository;

  constructor(dep: Dependencies) {
    this.merchantRepo = dep.merchantRepo;
  }

  public GetAll = async () => {
    try {
      const merchants = await this.merchantRepo.GetAll({
        limit: -1,
        offset: 0,
        sort: new Map<string, boolean>(),
      });
      return merchants;
    } catch (err) {
      log.error("cant get merchants, err:", err);
      return [];
    }
  };

  public GetAllPaginated = async (
    args: { page: number; perPage: number } & Sortable
  ) => {
    try {
      let offset = args.page * args.perPage;
      if (offset < 0) {
        offset = 0;
      }

      const data = await this.merchantRepo.GetAll({
        offset: offset,
        limit: args.perPage,
        sort: args.sort,
      });

      return {
        merchants: data.data,
        total: data.total,
      };
    } catch (err) {
      log.error("cant get merchants, err:", err);
      return {
        merchants: [],
        total: 0,
      };
    }
  };

  public GetByID = async (id: number) => {
    try {
      const merchant = await this.merchantRepo.GetByID(id);
      return merchant;
    } catch (err) {
      log.error("cant get merchants, err:", err);
      throw e.ErrorOrDefault(err, code.ERR_MERCHANT_NOT_FOUND);
    }
  };

  public ToggleIsActiveBulk = async (
    ids: number[],
    isActive: boolean | undefined
  ) => {
    try {
      const merchant = await this.merchantRepo.ToggleIsActive(ids, isActive);
      return merchant;
    } catch (err) {
      throw e.ErrorOrDefault(err, code.ERROR);
    }
  };

  public Create = async (param: CreateMerchant) => {
    try {
      const merchant = await this.merchantRepo.Create(param);
      return merchant;
    } catch (err) {
      throw e.ErrorOrDefault(err, code.ERROR);
    }
  };

  public Update = async (param: UpdateMerchant) => {
    try {
      const merchant = await this.merchantRepo.Update(param);
      return merchant;
    } catch (err) {
      throw e.ErrorOrDefault(err, code.ERROR);
    }
  };
}

export default MerchantUseCase;
