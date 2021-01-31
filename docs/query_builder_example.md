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