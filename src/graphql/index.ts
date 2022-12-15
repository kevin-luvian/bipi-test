import { GraphQLObjectType, GraphQLSchema } from "graphql";
import log from "../pkg/log";
import MerchantUseCase from "../usecases/merchants";
import HelloResolver from "./resolvers/hello";
import MerchantResolver from "./resolvers/merchants";

export interface Dependencies {
  merchantUC: MerchantUseCase;
}

const InitGQL = async (dep: Dependencies) => {
  const helloResolver = new HelloResolver();
  const merchantResolver = new MerchantResolver(dep.merchantUC);

  const schemas = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
        hellos: helloResolver.getHellos(),
        hello: helloResolver.getHello(),

        getMerchants: merchantResolver.GetMerchants(),
        getMerchant: merchantResolver.GetMerchant(),
      },
    }),
    mutation: new GraphQLObjectType({
      name: "RootMutationType",
      fields: {
        createMerchant: merchantResolver.CreateMerchant(),
        updateMerchant: merchantResolver.UpdateMerchant(),
        toggleMerchantsIsActive: merchantResolver.ToggleMerchantIsActiveBulk(),
      },
    }),
  });

  log.info("graphql schema created");

  return schemas;
};

export default InitGQL;
