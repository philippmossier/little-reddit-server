// import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { Post } from "./entities/Post";
// import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();


  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ orm: orm.em })
  });

  apolloServer.applyMiddleware({app});
  // app.get('/', (_,res)=> {
  //   res.send('asdasdasdasd')
  // })

  app.listen(5100, () => {
    console.log("graphql runs on port 5100/graphql");
  });
    // const post = orm.em.create(Post, {title: 'my second post'});
    // await orm.em.persistAndFlush(post);
    const posts = await orm.em.find(Post, {});
    console.log('------ALL POSTS------', posts)
};

main().catch((err) => {
  console.error(err);
});

