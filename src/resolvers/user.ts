import { Resolver, Query, InputType, Field, Mutation, Arg} from "type-graphql";
import { User } from "src/entities/User";

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@Resolver()
export class UserResolver {
    @Mutation(() => String)
    async register(
        @Arg('options') options: UsernamePasswordInput
        ): Promise<User> {
            return User.create({username: options.username, password: options.password}).save();
        }
}