import "reflect-metadata";
import { __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { createConnection } from "typeorm";

const main = async () => {
  await createConnection();
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    // context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({app});

  app.listen(4000, () => {
    console.log("graphql server started on localhost:4000/graphql");
  });
};

main().catch((err) => {
  console.error(err);
});











