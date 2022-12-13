import { buildSchema } from "type-graphql";
import HelloResolver from "./resolvers/hello";

const InitGQL = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
    emitSchemaFile: true,
  });

  return schema;
};

export default InitGQL;
