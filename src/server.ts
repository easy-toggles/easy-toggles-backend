import config from './config'

import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import WorkspaceResolver from "./resolvers/workspace.resolver";
import ToggleResolver from "./resolvers/toggle.resolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [WorkspaceResolver, ToggleResolver],
    emitSchemaFile: true,
  });

  const server = new GraphQLServer({
    schema,
  });

  server.start(config.get('APOLLO_OPTIONS'), ({ port }) => console.log(`Server is running on http://localhost:${port}`));
}

bootstrap();