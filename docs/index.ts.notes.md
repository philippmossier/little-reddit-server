# notes from index.ts file

await Post.delete({}); // deletes all items from post table

## delete all records of a specific table

await Post.delete({}); // same as sql `DELETE FROM post;`

## create new record on Post table

const db_init = await createConnection();
const repository = await db_init.getRepository(Post);
let post = new Post;
post.title = "created without resolver
await repository.save(post)

**you can use all typeorm methods on your connection like connection.runMigrations etc**
