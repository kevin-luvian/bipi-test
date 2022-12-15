import {
  GraphQLFieldConfig,
  GraphQLInt,
  GraphQLString,
} from "graphql";

class HelloResolver {
  public getHellos = (): GraphQLFieldConfig<any, any> => ({
    type: GraphQLString,
    resolve(_, args) {
      return `Hello, Graphql!`;
    },
  });

  public getHello = (): GraphQLFieldConfig<any, any> => ({
    type: GraphQLString,
    args: {
      id: { type: GraphQLInt },
    },
    resolve(_, args) {
      const id = parseInt(args.id, 10);
      return `Hello, Graphql ${id}!`;
    },
  });
}

export default HelloResolver;
