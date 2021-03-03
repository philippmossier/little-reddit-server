import 'reflect-metadata';
import 'dotenv-safe/config';
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
import { createUserLoader } from './utils/createUserLoader';
import { createUpvoteLoader } from './utils/createUpvoteLoader';
import { Post } from './entities/Post';
import { User } from './entities/User';
import { Upvote } from './entities/Upvote';
import path from 'path';

const main = async () => {
    const connection = await createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        logging: true,
        // synchronize: true, // only for dev mode, so migrations run outomatically
        migrations: [path.join(__dirname, './migrations/*')],
        entities: [Post, User, Upvote],
    });
    connection && console.log('connected to PostgreSQL-DB ');

    await connection.runMigrations();

    const app = express();
    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);
    __prod__ && app.set('trust proxy', 1);
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
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
                // domain: __prod__ ? '.insertDomainNameHere.com' : undefined, // try this when having cookie problems
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET, // changed to random string
            resave: false,
        }),
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            userLoader: createUserLoader(),
            upvoteLoader: createUpvoteLoader(),
        }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(parseInt(process.env.PORT), () => {
        console.log('apollo-graphql server started on localhost:4000/graphql');
    });
};

main().catch((err) => {
    console.error(err);
});
