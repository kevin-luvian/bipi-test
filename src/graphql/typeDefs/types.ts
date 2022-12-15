import {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const MutationError = new GraphQLObjectType({
  name: "MutationErrorType",
  fields: () => ({
    message: { type: GraphQLString },
    code: { type: GraphQLInt },
  }),
});

export const SortEnum = new GraphQLEnumType({
  name: "SortType",
  values: {
    ASC: { value: true },
    DESC: { value: false },
  },
});
