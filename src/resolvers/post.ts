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
      // uses 2 sql queries (1 to select 1 to insert) not ideal but this is easier
    return Post.create({title}).save();
  }

  @Mutation(() => Post, {nullable: true})
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, {nullable:true} ) title: string,
    ): Promise<Post | null> {
      // 2 sql Version (single sql version comes later)
      const post = await Post.findOne(id);
      if (!post) {
        return null;
      }
      if (typeof title !== "undefined"){
        await Post.update({id}, {title});
      }
      // returns old post after updated
      return post;
  }

  @Mutation(()=> Boolean)
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    await Post.delete(id);
    return true;
  }

}