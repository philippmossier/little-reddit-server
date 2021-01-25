# Workflow 💻

## Backend

**Step 1**
Add a new Entity and decorate them with type-graphql and typeorm to tell PostgreSQL how
the new table looks like.
Files need to be Uppercase like `User.tsx`.

**Step 2**
Add Resolver to make actions on an Entity (e.g. actions, validation, authentification)
Resolvers are written in lowercase like `user.tsx`, and need the same name as the entity they are assigned to.

💡 Some basic decorator and types whe use:

- Resolvers: query, mutation
- Types: InputType and ObjectType

🕮 InputTypes are used for inputs on forms etc.
🕮 ObjectTypes are used for describing the Response Object of a Response etc.

**Step 3**
Run Mutations with typeorm when one of your Entity needs a change (or revert a migration)

🕮 For breaking changes for example adding a required field to an existing entity, we need  to wipe out the database table or make the field nullable (optional)

---

## Frontend

**Step 1**
Add graphql mutations, queries depending on the new Resolver.

**Step 2**
run `npm run gen` to autogenerate types from the backend schema.

This generates types from the schema defined on our server (all entities, resolvers)
On Top of that we can add our own types to the schema in the graphQL folder on the client (fragments, mutations, querys, urql-mutation-hooks)
Urql mutation hooks are based on our schema types and so we dont need to write our own hooks to update our component state.

## PSQL

```psql
sql -d littlereddit -U phil
SELECT * FROM post;
SELECT * FROM "user"; (user needs quotes, maybe because of conflict with reserved keyword)
DELETE FROM "user" WHERE username='eeeeeeee'; (singleQuoteHere)
DELETE FROM "user" WHERE username!='Philipp'; (deletes every user except me)
\d (list all tables)
\l (list all databases)
\du (list all users)
```

🕮 We can also view data on pgadmin4(littlereddit)

🕮 Migration and DB-Table Actions can also  be run in index.ts with:

```typescript
    // run migrations:
    await connection.runMigrations();

    // deletes all records of a specific table:
    await Post.delete({}); // same as sql: DELETE FROM post;
```

> delete DB create DB create DB-Tables with bash or psql:

```bash
createdb dbname
dropdb dbname
```

```psql
CREATE DATABASE [databasename]; or create database littlereddit;
DROP DATABASE littlereddit;   or drop database littlereddit;
```

INFO: "synchronize": true, => automatically creates the DB tables for you without running migrations (set this to false if you manually use migrations to create a table)

## typorm migrations

<https://github.com/typeorm/typeorm/blob/master/docs/migrations.md>

- add an empty migration where you can write SQL manually and run your self created migrations afterwards
npm run typeorm migration:create -- -n myCustomMigration
or npx typeorm migration:create -n DummyPosts

Run your custom migration with:

```index.ts
    // run migrations:
    await connection.runMigrations();
```

- generates a new migrations, depending on the current entities (only if changed since the last migration run):
npm run typeorm migration:generate -- -n UserMigration2

- runs all missing migration (mostly the last one with the newest timestamp):
npm run typeorm migration:run

- reverts the last migration (newest timestamp):
npm run typeorm migration:revert

### Graphql Vscode Extension

To get intellisense depending on your graphql schema
Schema can be found on your graphql endpoint for example: <http://localhost:4000/graphql>

1. install vscode extension locally

- name in vscode extension store: graphql.vscode-graphql
