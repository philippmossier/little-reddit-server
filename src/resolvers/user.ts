import { Resolver, InputType, Field, Mutation, Arg, ObjectType, Ctx, Query } from 'type-graphql';
import argon2 from 'argon2';
import { User } from '../entities/User';
import { MyContext } from 'src/types';

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

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

@Resolver()
export class UserResolver {
    @Query(() => User, {nullable:true})
    me(@Ctx() { req}: MyContext) {
        if (!req.session.userId) {
            return null
        }
        return User.findOne(req.session.userId);
    }
    


    @Mutation(() => UserResponse)
    async register(@Arg('options') options: UsernamePasswordInput): Promise<UserResponse> {
        if (options.username.length <= 2) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: 'Length must be greather than 2',
                    },
                ],
            };
        }

        if (options.password.length <= 2) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'Length must be greather than 3',
                    },
                ],
            };
        }
        const hashedPassword = await argon2.hash(options.password);
        const user = User.create({ username: options.username, password: hashedPassword });

        try {
            await user.save();
        } catch (error) {
            // duplicate username error
            if (error.code === '23505' || error.detail.includes('already exists')) {
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'username has already been taken',
                        },
                    ],
                };
            }
        }
        return { user };
    }

    @Mutation(() => UserResponse)
    async login(@Arg('options') options: UsernamePasswordInput, @Ctx() { req }: MyContext): Promise<UserResponse> {
        const user = await User.findOneOrFail({ username: options.username });
        if (!user) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: 'That username does not exist',
                    },
                ],
            };
        }
        const valid = await argon2.verify(user.password, options.password);
        if (!valid) {
            return {
                errors: [{ field: 'password', message: 'incorrect password' }],
            };
        }

        req.session.userId = user.id;

        return {
            user,
        };
    }
}
