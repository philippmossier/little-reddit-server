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

        // SQL version:
        const replacements: any[] = [realLimitPlusOne];
        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }

        // postgreSQL can load multiple schemas in one DB and user is a reserved word so we
        // have to specify which user table (from wich schema we want to select the user like public.user)

        // Why json_build_object ?
        // We need to change the shape of the data here, because our graphQL Posts query
        // expects a creator object like this: creator: {username: "dede", email: "dede@gmail.com"}
        // SQL gives us every creator fields on top level so we have to build this nested creator object on our own

        const posts = await getConnection().query(
            `
        select p.*, 
        json_build_object(
            'id', u.id,
            'username', u.username,
            'email', u.email,
            'createdAt', u."createdAt",
            'updatedAt', u."updatedAt"
        ) creator
        from post p
        inner join public.user u on u.id = p."creatorId"
        ${cursor ? `where p."createdAt" < $2` : ''}
        order by p."createdAt" DESC
        limit $1
        `,
            replacements,
        );

        // // query builder version (does not work so we can just write plain SQL):
        // const qb = getConnection()
        //     .getRepository(Post)
        //     .createQueryBuilder('p')
        //     .innerJoinAndSelect('p.creator', 'u', 'u.id = p."creatorId"')
        //     .orderBy('p."createdAt"', 'DESC')
        //     .take(realLimitPlusOne);
        // if (cursor) {
        //     qb.where('p."createdAt" < :cursor', {
        //         cursor: new Date(parseInt(cursor)),
        //     });
        // }
        // const posts = await qb.getMany();

        console.log('---------------- POSTS -----------------', posts);
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
