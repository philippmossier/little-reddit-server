# What you have to do if one of your Query Resolver changes?

## Before

> graphQL query looks like this (When query is 100 % like Post-Entity):

```graphql
query Posts($limit: Int!, $cursor: String){
    posts(limit: $limit, cursor: $cursor){
        id
        createdAt
        updatedAt
        title
        textSnippet
    }
  }
```

> Resolver posts query (basic):

```typescript
@InputType()
class PostInput {
    @Field()
    title: string;
    @Field()
    text: string;
}

@Resolver(Post)
export class PostResolver {
    @FieldResolver(() => String)
    textSnippet(@Root() post: Post) {
        return post.text.slice(0, 50);
    }

    @Query(() => [Post])
    async posts(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    ): Promise<Post[]> {
        
        const realLimit = Math.min(50, limit);
        const qb = getConnection()
            .getRepository(Post)
            .createQueryBuilder('p')
            .orderBy('"createdAt"', 'DESC')
            .take(realLimit);

        if (cursor) {
            qb.where('"createdAt" < :cursor', {
                cursor: new Date(parseInt(cursor)),
            });
        }

        return qb.getMany(); 
    }

}
```

---

## After

> Resolver posts query (decorated with PaginatedPosts):

After decorating the query return object with PaginatedPosts, query must be changed to this.

```graphql
query Posts($limit: Int!, $cursor: String){
    posts (limit: $limit, cursor: $cursor){
      hasMore
    posts {
      id
      createdAt
      updatedAt
      title
      textSnippet
    }
  }
}
```

```typescript
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

        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;
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
}
```

### Development cycle

Backend:

Graphql Playground <http://localhost:4000/graphql> can be used to test the new queries. After testing on gql-playground BACKEND is done, so move on to FRONTEND.

FRONTEND:

As the graphql schema has changed on our backend we have to update our frontend-queries and rerun code-gen. Tipp: Just copy the query from backend-gql-playground and put it to the related folder.
