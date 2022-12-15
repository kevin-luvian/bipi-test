import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { MutationError } from "./types";

export const MerchantGQL = new GraphQLObjectType({
  name: "MerchantType",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    lat: { type: GraphQLFloat },
    lon: { type: GraphQLFloat },
    is_active: { type: GraphQLBoolean },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});

export const PaginatedMerchantGQL = new GraphQLObjectType({
  name: "PaginatedMerchantType",
  fields: () => ({
    nodes: { type: GraphQLList(MerchantGQL) },
    total: { type: GraphQLInt },
  }),
});

export const MerchantMutationGQL = new GraphQLObjectType({
  name: "MerchantMutationType",
  fields: () => ({
    node: { type: MerchantGQL },
    error: { type: MutationError },
  }),
});

export const MerchantsMutationGQL = new GraphQLObjectType({
  name: "MerchantsMutationType",
  fields: () => ({
    nodes: { type: GraphQLList(MerchantGQL) },
    error: { type: MutationError },
  }),
});
