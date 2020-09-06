import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/user';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __prod__ } from './constants';

const main = async () => {
    const connection = await createConnection();
    connection && console.log('connected to PostgreSQL-DB ');
    // // ---- create new record on Post table
    // const db_init = await createConnection();
    // const repository = await db_init.getRepository(Post);
    // let post = new Post;
    // post.title = "created without resolver
    // await repository.save(post)

    // you can use all typeorm methods on your connection like connection.migration etc

    const app = express();
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    app.use(
        session({
            name: 'qid', // custom cookie name added (visible in devtools>application>cookies)
            store: new RedisStore({
                client: redisClient,
                disableTouch: true, // added this option, so session lasts forever
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: 'lax', // csrf
                secure: __prod__, // cookie only works in https (only set this to true when using https in prod)
            },
            saveUninitialized: false,
            secret: 'werfdsfasdwengfhsfareadffdtgg', // changed to random string
            resave: false,
        }),
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('apollo-graphql server started on localhost:4000/graphql');
    });
};

main().catch((err) => {
    console.error(err);
});
