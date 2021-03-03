# queryBuilder example

```typescript
const qb = getConnection()
            .getRepository(Post)
            .createQueryBuilder('p')
            .innerJoinAndSelect('p.creator', 'u', 'u.id = p."creatorId"')
            .orderBy('p."createdAt"', 'DESC')
            .take(realLimitPlusOne);
        if (cursor) {
            qb.where('p."createdAt" < :cursor', {
                cursor: new Date(parseInt(cursor)),
            });
        }
        const posts = await qb.getMany();
```

Note: take is the same as limit but less error-prone in complex queries, source: <https://typeorm.io/#/select-query-builder/using-pagination>

## queryBuilder vs nonQueryBuilder Example

```ts
 @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { req }: MyContext,
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }
        const hashedPassword = await argon2.hash(options.password);

        // ------------------ WITHOUT queryBuilder Version (BaseEntity Version): -------------------
        // const user = User.create({
        //     username: options.username,
        //     email: options.email,
        //     password: hashedPassword,
        // });
        // try {
        //     await user.save();
        // } catch (error) {
        //     // duplicate username error
        //     if (
        //         error.code === '23505' ||
        //         error.detail.includes('already exists')
        //     ) {
        //         return {
        //             errors: [
        //                 {
        //                     field: 'username',
        //                     message: 'username has already been taken',
        //                 },
        //             ],
        //         };
        //     }
        // }

        // EntityManager Version (takes 2 Arguments instead of 1)
        // the same as above but longer, without extending BaseEntity:
        // getManager().create(User, {
        //     username: options.username,
        //     email: options.email,
        //     password: hashedPassword
        // }).save()

        // Repository Version:
        // Using repository (same as Entitymanager but its operations are limited to a concrete entity.)
        // getRepository(User).create({ // you can also get it via getConnection().getRepository() or getManager().getRepository()
        //     username: options.username,
        //     email: options.email,
        //     password: hashedPassword
        // }).save()

        // --------------------- queryBuilder Version: ------------------------
        // This Version feels more like SQL
        let user;
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    email: options.email,
                    username: options.username,
                    password: hashedPassword,
                })
                .returning('*')
                .execute();
            user = result.raw[0];
        } catch (err) {
            //|| err.detail.includes("already exists")) {
            // duplicate username error
            if (err.code === '23505') {
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'username already taken',
                        },
                    ],
                };
            }
        }

        // store user id session after register (not only after login)
        // this will set a cookie on the user
        // keep them logged in
        req.session.userId = user.id;

        return { user };
    }
```
