import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/user';
import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { COOKIE_NAME, __prod__ } from './constants';
import cors from 'cors';

const main = async () => {
    // sendEmail('bob@bob.com', 'hello there');
    const connection = await createConnection();
    connection && console.log('connected to PostgreSQL-DB ');
    // await Post.delete({}); // deletes all items from post table

    // // ---- create new record on Post table
    // const db_init = await createConnection();
    // const repository = await db_init.getRepository(Post);
    // let post = new Post;
    // post.title = "created without resolver
    // await repository.save(post)

    // you can use all typeorm methods on your connection like connection.migration etc

    // run migrations:
    await connection.runMigrations();

    // delete all records of a specific table:
    // await Post.delete({}); // same as sql `DELETE FROM post;`

    const app = express();
    const RedisStore = connectRedis(session);
    const redis = new Redis();
    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        }),
    );
    app.use(
        session({
            name: COOKIE_NAME, // custom cookie name added (visible in devtools>application>cookies)
            store: new RedisStore({
                client: redis,
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
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log('apollo-graphql server started on localhost:4000/graphql');
    });
};

main().catch((err) => {
    console.error(err);
});
