# delete connected relations when deleting records

**non cascade way:**

```typescript
@Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg('id', () => Int) id: number,
        @Ctx() { req }: MyContext,
    ): Promise<boolean> {
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
```

**cascade way:**

 ```typescript
     // cascade delete: when a post gets deleted this gets deleted too
    @ManyToOne(() => Post, (post) => post.upvotes, {
       onDelete: 'CASCADE',
  })
```
