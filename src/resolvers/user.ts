import {
    Resolver,
    Field,
    Mutation,
    Arg,
    ObjectType,
    Ctx,
    Query,
} from 'type-graphql';
import argon2 from 'argon2';
import { User } from '../entities/User';
import { MyContext } from '../types';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants';
import { UsernamePasswordInput } from './UsernamePasswordInput';
import { validateRegister } from '../utils/validateRegister';
import { getConnection } from 'typeorm';
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]; // optional in case of error

    @Field(() => User, { nullable: true })
    user?: User; // optional in case of error
}

@Resolver(User)
export class UserResolver {
    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() { redis, req }: MyContext,
    ): Promise<UserResponse> {
        if (newPassword.length <= 2) {
            return {
                errors: [
                    {
                        field: 'newPassword',
                        message: 'length must be greater than 2',
                    },
                ],
            };
        }

        const key = FORGET_PASSWORD_PREFIX + token;
        const userId = await redis.get(key);
        if (!userId) {
            return {
                errors: [
                    {
                        field: 'token',
                        message: 'token expired',
                    },
                ],
            };
        }
        // User sended the right token, we know who the user is (we got the userId with the token)
        // now we can update the user
        const userIdNum = parseInt(userId);
        const user = await User.findOne(userIdNum);

        // rare case when user maybe gots deleted during pw change process
        if (!user) {
            return {
                errors: [
                    {
                        field: 'token',
                        message: 'user no longer exists',
                    },
                ],
            };
        }
        await User.update(
            { id: userIdNum },
            {
                password: await argon2.hash(newPassword),
            },
        );
        // delete token (when user uses link again, we get an expired error message in the frontend)
        await redis.del(key);

        // log in user after change password
        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redis }: MyContext,
    ) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // the email is not in the db
            return true;
        }

        const token = v4();
        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            'ex',
            1000 * 60 * 60 * 24 * 3,
        ); // 3days
        await sendEmail(
            email,
            `<a href="http://localhost:3000/change-password/${token}">reset password</a>`,
        );

        return true;
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: MyContext): Promise<User | undefined> | null {
        console.log('session:', req.session);

        // you are not logged in
        if (!req.session.userId) {
            return null;
        }
        return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { req }: MyContext,
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }
        const hashedPassword = await argon2.hash(options.password);

        // ------------------ WITHOUT queryBuilder Version: -------------------
        // const user = User.create({
        //     username: options.username,
        //     email: options.email,
        //     password: hashedPassword,
        // });
        // try {
        //     await user.save();
        // } catch (error) {
        //     // duplicate username error
        //     if (
        //         error.code === '23505' ||
        //         error.detail.includes('already exists')
        //     ) {
        //         return {
        //             errors: [
        //                 {
        //                     field: 'username',
        //                     message: 'username has already been taken',
        //                 },
        //             ],
        //         };
        //     }
        // }

        // ---------------- WITHOUT queryBuilder Version end ------------------

        // --------------------- queryBuilder Version: ------------------------
        let user;
        try {
            // User.create({}).save()
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    email: options.username,
                    username: options.username,
                    password: hashedPassword,
                })
                .returning('*')
                .execute();
            user = result.raw[0];
        } catch (err) {
            //|| err.detail.includes("already exists")) {
            // duplicate username error
            if (err.code === '23505') {
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'username already taken',
                        },
                    ],
                };
            }
        }
        // ------------------ queryBuilder Version end ------------------------

        // store user id session after register (not only after login)
        // this will set a cookie on the user
        // keep them logged in
        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext,
    ): Promise<UserResponse> {
        const user = await User.findOne(
            usernameOrEmail.includes('@')
                ? { where: { email: usernameOrEmail } }
                : { where: { username: usernameOrEmail } },
        );
        if (!user) {
            return {
                errors: [
                    {
                        field: 'usernameOrEmail',
                        message: "username or email doesn't exist",
                    },
                ],
            };
        }
        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'incorrect password',
                    },
                ],
            };
        }

        req.session.userId = user.id;

        return {
            user,
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            }),
        );
    }
}
