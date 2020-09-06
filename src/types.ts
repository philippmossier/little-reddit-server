import { Request, Response } from 'express';
import { RedisClient } from 'redis';

export type MyContext = {
    req: Request & { session: Express.Session };
    redis: RedisClient;
    res: Response;
};
