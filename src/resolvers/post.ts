import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../types';
import {
    Resolver,
    Query,
    Arg,
    Mutation,
    InputType,
    Field,
    Ctx,
    UseMiddleware,
    Int,
    FieldResolver,
    Root,
    ObjectType,
} from 'type-graphql';
import { Post } from '../entities/Post';
import { getConnection } from 'typeorm';

@InputType()
class PostInput {
    @Field()
    title: string;
    @Field()
    text: string;
}

@ObjectType()
class PaginatedPosts {
    @Field(() => [Post])
    posts: Post[];
    @Field()
    hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
    @FieldResolver(() => String)
    textSnippet(@Root() post: Post) {
        return post.text.slice(0, 50);
    }

    @Query(() => PaginatedPosts)
    async posts(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedPosts> {
        // pagination "load more button" logic: (Load more button is only visible if there are unfetched posts in the database)
        // user requests 20 posts but we fetch 21, so we always know if there are more posts which the user has not fetched yet
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;
        // take is the same as limit but less error-prone in complex queries, source: https://typeorm.io/#/select-query-builder/using-pagination
        const qb = getConnection()
            .getRepository(Post)
            .createQueryBuilder('p')
            .orderBy('"createdAt"', 'DESC')
            .take(realLimitPlusOne);
        if (cursor) {
            qb.where('"createdAt" < :cursor', {
                cursor: new Date(parseInt(cursor)),
            });
        }

        const posts = await qb.getMany();

        return {
            posts: posts.slice(0, realLimit),
            hasMore: posts.length === realLimitPlusOne,
        };
    }
    @Query(() => Post, { nullable: true })
    post(@Arg('id') id: number): Promise<Post | undefined> {
        return Post.findOne(id);
    }

    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg('input') input: PostInput,
        @Ctx() { req }: MyContext,
    ): Promise<Post> {
        // FIXED with latest typeorm update: uses 2 sql queries (1 to select 1 to insert) not ideal but this is easier
        return Post.create({
            ...input,
            creatorId: req.session.userId, // We know who the user is based on their session so we pass their id
        }).save();
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('id') id: number,
        @Arg('title', () => String, {
            nullable: true,
        })
        title: string,
    ): Promise<Post | null> {
        // FIXED with latest typeorm update: 2 sql Version (single sql version comes later)
        const post = await Post.findOne(id);
        if (!post) {
            return null;
        }
        if (typeof title !== 'undefined') {
            await Post.update({ id }, { title });
        }
        // returns old post after updated
        return post;
    }

    @Mutation(() => Boolean)
    async deletePost(@Arg('id') id: number): Promise<boolean> {
        await Post.delete(id);
        return true;
    }
}
