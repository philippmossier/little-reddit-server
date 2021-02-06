# Fetching relations

** example is a post or posts query from the Post-entity

* When fetching a post we also want some informations of the user who created the post (User-Entity)
* Post <-> User

**The easy Way:**
Create a FieldResolver for the creator on the post resolver (easy way)

```typescript
@Resolver(Post)
export class PostResolver {
    @FieldResolver(() => String)
    creator(@Root() post: Post) {
        return User.findOne(post.creatorId);
    }
 ...
 ...
```

* Without a dataLoader we are very inefficeiend because we fetch 20 posts we have 21 sql-queries. 1 query for for our posts query and 20 sql-queries for fetching the creators of each post*

**The raw sql way:**

* Fetch relations with `json_build_object and inner join` or `typeorm-relations`
* We can achieve that with `json_build_object and inner join` or `typeorm-relations`

```typescript
@Query(() => Post, { nullable: true })
    post(@Arg('id', () => Int) id: number): Promise<Post | undefined> {
        // for simple relations we can use typeorms-relations, for advanced queries like above its better to write rawSQL
        return Post.findOne(id, { relations: ['creator'] }); // needed if we have no creatorId fieldResolver on our post/posts query
    }
```

```typescript
@Query(() => PaginatedPosts)
    async posts(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
        @Ctx() { req }: MyContext,
    ): Promise<PaginatedPosts> {
        // pagination "load more button" logic: (Load more button is only visible if there are unfetched posts in the database)
        // user requests 20 posts but we fetch 21, so we always know if there are more posts which the user has not fetched yet
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const replacements: any[] = [realLimitPlusOne];

        if (req.session.userId) {
            replacements.push(req.session.userId);
        }

        let cursorIdx = 3;
        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
            cursorIdx = replacements.length;
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
        ) creator,
        ${
            req.session.userId
                ? '(select value from upvote where "userId" = $2 and "postId" = p.id) "voteStatus"'
                : 'null as "voteStatus"'
        }
        from post p
        inner join public.user u on u.id = p."creatorId"
        ${cursor ? `where p."createdAt" < $${cursorIdx}` : ''}
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
```
