import { Knex } from "knex";
import { GetSort, Paginated, Pagination, Sortable } from "../entity/query";
import Merchant, { CreateMerchant, UpdateMerchant } from "../entity/merchant";
import log from "../pkg/log";
import e from "../pkg/e/errors";
import code from "../pkg/e/code";

export interface Dependencies {
  db: Knex;
}

class MerchantRepository {
  private db: Knex;

  constructor(dep: Dependencies) {
    this.db = dep.db;
  }

  public GetAll = async (
    param: Pagination & Sortable
  ): Promise<Paginated<Merchant[]>> => {
    try {
      let countQuery = this.db.from("merchants").count("* as count").first();

      let query = this.db
        .from("merchants")
        .select([
          "id",
          "name",
          "phone",
          "lat",
          "lon",
          "is_active",
          "created_at",
          "updated_at",
        ]);

      if (param.limit > 0) {
        query = query.limit(param.limit).offset(param.offset);
      }

      for (const key of [
        "id",
        "name",
        "phone",
        "lat",
        "lon",
        "is_active",
        "created_at",
        "updated_at",
      ]) {
        const sortField = param.sort.get(key);
        if (sortField != undefined) {
          query = query.orderBy(key, GetSort(sortField));
        }
      }

      let [count, data] = await Promise.all([countQuery, query]);

      const res = new Paginated<Merchant[]>(
        data.map((d) => Merchant.fromPlain(d)),
        count["count"]
      );
      return res;
    } catch (err) {
      log.error("db operation err:", err);
      throw e.ErrorOrDefault(err, code.ERR_DATABASE_UNKNOWN);
    }
  };

  public GetByID = async (id: number): Promise<Merchant | null> => {
    try {
      const data = await this.db
        .from("merchants")
        .select([
          "id",
          "name",
          "phone",
          "lat",
          "lon",
          "is_active",
          "created_at",
          "updated_at",
        ])
        .where("id", id);

      if (data.length <= 0) {
        return null;
      }

      return Merchant.fromPlain(data[0]);
    } catch (err) {
      log.error("db operation err:", err);
      throw e.ErrorOrDefault(err, code.ERR_DATABASE_UNKNOWN);
    }
  };

  public ToggleIsActive = async (
    ids: number[],
    isActive: boolean | undefined
  ): Promise<Merchant[]> => {
    try {
      const returned = await this.db
        .whereIn("id", ids)
        .update({
          is_active:
            isActive == undefined ? this.db.raw("not is_active") : isActive,
        })
        .from("merchants")
        .returning([
          "id",
          "name",
          "phone",
          "lat",
          "lon",
          "is_active",
          "created_at",
          "updated_at",
        ]);

      if (returned.length == 0) {
        throw new e.Error(code.ERR_MERCHANT_NOT_FOUND);
      }

      return returned.map((d) => Merchant.fromPlain(d));
    } catch (err) {
      log.error("db operation err:", err);
      throw e.ErrorOrDefault(err, code.ERR_DATABASE_UNKNOWN);
    }
  };

  public Create = async (param: CreateMerchant): Promise<Merchant> => {
    try {
      const data = await this.db
        .insert(param)
        .into("merchants")
        .returning("id");

      const id = data[0]["id"];

      const returning = await this.GetByID(id);
      if (returning == null) {
        log.error(`cant get created merchant with id ${id}`);
        throw new e.Error(code.ERR_MERCHANT_NOT_FOUND);
      }

      return returning;
    } catch (err) {
      log.error("db operation err:", err);
      throw e.ErrorOrDefault(err, code.ERR_DATABASE_UNKNOWN);
    }
  };

  public Update = async (param: UpdateMerchant): Promise<Merchant> => {
    try {
      param.updated_at = new Date();

      const rowAffected = await this.db
        .update(param)
        .into("merchants")
        .where({ id: param.id });

      if (rowAffected == 0) {
        log.error(`can't update merchant with id ${param.id}`);
        throw new e.Error(code.ERR_MERCHANT_NOT_FOUND);
      }

      const updated = await this.GetByID(param.id);
      if (updated == null) {
        log.error(`cant get updated merchant with id ${param.id}`);
        throw new e.Error(code.ERR_MERCHANT_NOT_FOUND);
      }

      return updated;
    } catch (err) {
      log.error("db operation err:", err);
      throw e.ErrorOrDefault(err, code.ERR_DATABASE_UNKNOWN);
    }
  };
}

export default MerchantRepository;
