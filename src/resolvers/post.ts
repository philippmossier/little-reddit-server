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
import { Upvote } from '../entities/Upvote';

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

    @FieldResolver(() => String)
    creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
        return userLoader.load(post.creatorId);
    }

    @FieldResolver(() => Int, { nullable: true })
    async voteStatus(
        @Root() post: Post,
        @Ctx() { upvoteLoader, req }: MyContext,
    ) {
        if (!req.session.userId) {
            return null;
        }
        const upvote = await upvoteLoader.load({
            postId: post.id,
            userId: req.session.userId,
        });
        return upvote ? upvote.value : null;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async vote(
        @Arg('postId', () => Int) postId: number,
        @Arg('value', () => Int) value: number,
        @Ctx() { req }: MyContext,
    ) {
        const isUpvote = value !== -1;
        const realValue = isUpvote ? 1 : -1;
        const { userId } = req.session;

        const upvote = await Upvote.findOne({ where: { postId, userId } });

        // user has voted on the post before and they are changing their vote
        if (upvote && upvote.value !== realValue) {
            await getConnection().transaction(async (tm) => {
                // seperate into 2 queries, if one fails, automaticly both fail, because they are both in one transaction
                await tm.query(
                    `
                update upvote
                set value = $1
                where "postId" = $2 and "userId" = $3
                `,
                    [realValue, postId, userId],
                );

                // 2 * realValue because we want to change the points by 2 when changing a upvote to an downVote
                // points: 3 to => points: 1 (because -1 for reverting upvote and -1 for setting downvote)
                await tm.query(
                    `
                update post
                set points = points + $1
                where id = $2
                `,
                    [2 * realValue, postId],
                );
            });
        } else if (!upvote) {
            // has never voted before
            await getConnection().transaction(async (tm) => {
                await tm.query(
                    `
                    insert into upvote ("userId", "postId", value)
                    values ($1,$2,$3)
                    `,
                    [userId, postId, realValue],
                );
                await tm.query(
                    `
                    update post
                    set points = points + $1
                    where id = $2
                    `,
                    [realValue, postId],
                );
            });
        }
        return true;
    }

    @Query(() => PaginatedPosts)
    async posts(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedPosts> {
        // Load more button is only visible if there are unfetched posts in the database.
        // User requests 20 posts but we fetch 21, so we always know if there are more posts which the user has not fetched yet
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const replacements: any[] = [realLimitPlusOne];

        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }
        const posts = await getConnection().query(
            `
        select p.*
        from post p
        ${cursor ? `where p."createdAt" < $2` : ''}
        order by p."createdAt" DESC
        limit $1
        `,
            replacements,
        );

        return {
            posts: posts.slice(0, realLimit),
            hasMore: posts.length === realLimitPlusOne,
        };
    }

    @Query(() => Post, { nullable: true })
    post(@Arg('id', () => Int) id: number): Promise<Post | undefined> {
        return Post.findOne(id);
    }

    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg('input') input: PostInput,
        @Ctx() { req }: MyContext,
    ): Promise<Post> {
        return Post.create({
            ...input,
            creatorId: req.session.userId, // We know who the user is based on their session so we pass their id
        }).save();
    }

    @Mutation(() => Post, { nullable: true })
    @UseMiddleware(isAuth)
    async updatePost(
        @Arg('id', () => Int) id: number,
        @Arg('title') title: string,
        @Arg('text') text: string,
        @Ctx() { req }: MyContext,
    ): Promise<Post | null> {
        const result = await getConnection()
            .createQueryBuilder()
            .update(Post)
            .set({ title, text })
            .where('id = :id and "creatorId" =:creatorId', {
                // typeorm allows named variables, with raw-sql we need $1 $2
                id,
                creatorId: req.session.userId,
            })
            .returning('*')
            .execute();

        return result.raw[0];
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg('id', () => Int) id: number,
        @Ctx() { req }: MyContext,
    ): Promise<boolean> {
        // Not cascade way of deleting Upvotes after Post deletion (you need to filter out null values in frontend because post gets set to null at deletion)
        const post = await Post.findOne(id);
        if (!post) {
            return false;
        }

        if (post?.creatorId !== req.session.userId) {
            throw new Error('not authorized');
        }
        await Upvote.delete({ postId: id });
        await Post.delete({ id, creatorId: req.session.userId });

        return true;
    }
}
