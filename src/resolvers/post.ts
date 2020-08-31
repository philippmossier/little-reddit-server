import { Resolver, Query, Arg, Mutation} from "type-graphql";
import { Post } from "../entities/Post";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id") id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    ): Promise<Post> {
    return Post.create({title}).save();
  }
}