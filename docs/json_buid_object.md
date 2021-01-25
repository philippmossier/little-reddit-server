# Why we need json_build_query

## ---------------------------------------- Without json_build_query ----------------------------------------

SQL query

```typescript with sql
      const posts = await getConnection().query(
            `
        select p.*, 
        u.id, u.username, u.email, u."createdAt", u."updatedAt" from post p
        inner join public.user u on u.id = p."creatorId"
        ${cursor ? `where p."createdAt" < $2` : ''}
        order by p."createdAt" DESC
        limit $1
        `,
            replacements,
        );
```

result:

```js
{
    id: 1,
    title: 'Killing of John Lennon, The',
    text: 'My text',
    points: 0,
    creatorId: 1,
    createdAt: 2021-01-10T21:52:20.973Z,
    updatedAt: 2021-01-19T21:19:33.750Z,
    username: 'deda',
    email: 'deda@gmail.com'
  },
```

## ---------------------------------------- With json_build_query -------------------------------------------

query:

```typescript with sql
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
```

result:

```js
{
    id: 32,
    title: 'Killing of John Lennon, The',
    text: 'My Text',
    points: 0,
    creatorId: 1,
    createdAt: 2021-01-10T06:17:23.000Z,
    updatedAt: 2021-01-24T13:15:47.654Z,
    creator: {
      id: 1,
      username: 'deda',
      email: 'deda@gmail.com',
      createdAt: '2021-01-10T22:52:20.973511',
      updatedAt: '2021-01-19T22:19:33.750118'
    }
}
```
