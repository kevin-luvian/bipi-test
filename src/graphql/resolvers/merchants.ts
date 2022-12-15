import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from "graphql";
import {
  SanitizeCreateMerchant,
  SanitizeUpdateMerchant,
} from "../../entity/merchant";
import { ifNullDefault } from "../../pkg/utils";
import MerchantUseCase from "../../usecases/merchants";
import {
  MerchantGQL,
  MerchantMutationGQL,
  MerchantsMutationGQL,
  PaginatedMerchantGQL,
} from "../typeDefs/merchants";
import e from "../../pkg/e/errors";
import code from "../../pkg/e/code";
import { SortEnum } from "../typeDefs/types";
import log from "../../pkg/log";

class MerchantResolver {
  muc: MerchantUseCase;

  constructor(muc: MerchantUseCase) {
    this.muc = muc;
  }

  public GetMerchants = (): GraphQLFieldConfig<any, any> => {
    const parent = this;
    return {
      type: PaginatedMerchantGQL,
      args: {
        page: { type: GraphQLInt },
        per_page: { type: GraphQLInt },
        id: { type: SortEnum },
        name: { type: SortEnum },
        phone: { type: SortEnum },
        lat: { type: SortEnum },
        lon: { type: SortEnum },
        is_active: { type: SortEnum },
        created_at: { type: SortEnum },
      },
      async resolve(_, args) {
        log.info("args", args.name);
        const page = args.page ? parseInt(args.page, 10) : -1;
        const perPage = args.per_page ? parseInt(args.per_page, 10) : 0;

        const sort = new Map<string, boolean>();
        for (const key of [
          "id",
          "name",
          "phone",
          "lat",
          "lon",
          "is_active",
          "created_at",
        ]) {
          sort.set(key, args[key]);
        }

        const res = await parent.muc.GetAllPaginated({
          page: page,
          perPage: perPage,
          sort: sort,
        });
        return {
          nodes: res.merchants,
          total: res.total,
        };
      },
    };
  };

  public GetMerchant = (): GraphQLFieldConfig<any, any> => {
    const parent = this;
    return {
      type: MerchantGQL,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(_, args) {
        const id = parseInt(args.id, 10);
        return parent.muc.GetByID(id);
      },
    };
  };

  public CreateMerchant = (): GraphQLFieldConfig<any, any> => {
    const parent = this;
    return {
      type: MerchantMutationGQL,
      args: {
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        lon: { type: GraphQLFloat },
        is_active: { type: GraphQLBoolean },
      },
      async resolve(_, args) {
        const param = SanitizeCreateMerchant({
          name: args.name,
          phone: args.phone,
          lat: args.lat,
          lon: args.lon,
          is_active: args.is_active,
        });

        try {
          return {
            node: await parent.muc.Create(param),
            error: new e.Error(code.SUCCESS),
          };
        } catch (err: any) {
          return {
            node: undefined,
            error: err as e.Error,
          };
        }
      },
    };
  };

  public UpdateMerchant = (): GraphQLFieldConfig<any, any> => {
    const parent = this;
    return {
      type: MerchantMutationGQL,
      args: {
        id: { type: GraphQLInt! },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        lon: { type: GraphQLFloat },
        is_active: { type: GraphQLBoolean },
      },
      async resolve(_, args) {
        const id = ifNullDefault<number>(args.id, -1);
        if (id < 0) {
          throw new Error("invalid id args");
        }

        const param = SanitizeUpdateMerchant({
          id: id,
          name: args.name,
          phone: args.phone,
          lat: args.lat,
          lon: args.lon,
          is_active: args.is_active,
        });

        try {
          return {
            node: await parent.muc.Update(param),
            error: new e.Error(code.SUCCESS),
          };
        } catch (err: any) {
          return {
            node: null,
            error: err as e.Error,
          };
        }
      },
    };
  };

  public ToggleMerchantIsActiveBulk = (): GraphQLFieldConfig<any, any> => {
    const parent = this;

    return {
      type: MerchantsMutationGQL,
      args: {
        ids: { type: GraphQLList(GraphQLInt)! },
        is_active: { type: GraphQLBoolean },
      },
      async resolve(_, args) {
        const ids = ifNullDefault(args.ids, [] as number[]);
        if (ids.length == 0) {
          throw new Error("required ids");
        }

        try {
          const merchants = await parent.muc.ToggleIsActiveBulk(
            ids,
            args.is_active
          );

          return {
            nodes: merchants,
            error: new e.Error(code.SUCCESS),
          };
        } catch (err: any) {
          return {
            nodes: [],
            error: err as e.Error,
          };
        }
      },
    };
  };
}

export default MerchantResolver;
