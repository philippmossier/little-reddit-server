# Workflow 💻

09:11 stopped at adding upVOte frontend
todo warning for post query missing id

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

```typescript index.ts
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

## ormconfig.json

is not used in production
is only used for development

Protip: create a initial migration to create all tables for an empty DB.
To do that just do these steps:

1. create a new postgresDB with `createdb dbname`
2. edit orm config and put in the new DB name like `"database": "littlereddit4",`
3. run typeorm cli command `npx typeorm migration:generate -n Initial`

**For production SETUP:**

1. Make sure that you have the Inital Migration for the production DB
2. Optional also make a second migration for dummy posts after creating the Initial Migration
    (so the timestamp is  right and Inital migration runs before)
3. make sure to add this line `await connection.runMigrations();` to the index.ts file,
    so migrations run after the DB gets connected

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

- generates all missing migrations, depending on the current entities (only if changed since the last migration run):
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

# DAILY STARTUP STEPS:

3. Start postgreSQL
sudo service postgresql status
sudo service postgresql start

4. Start redis server for our user session(no config needed)
redis-server
redis-cli ping

5. run little-reddit-server
cd little-reddit-server
npm run dev

6. run little-reddit-web
cd little-reddit-web
npm run dev

## Which tech stack is used ?

- React
- TypeScript
- GraphQL
- URQL (switch later to Apollo)
- Node.js
- PostgreSQL
- TypeORM
- Redis
- Next.js
- TypeGraphQL
- TailwindCSS (later also try a chakra version)
- React Hook Forms

## TODOS

[] update to react 17 in frontend
[] automate project setup with docker
[] make this app more secure (maybe with JWT)
[] compare stack with REST API (node,go,rust)

## nodejs scripts explanation

- npm run watch (compiles ts to js into dist folder)
- node dist/index.js
- start is faster as start2
- "tsc -w" recompiles our typescript code everytime we change a typescript file
- "nodemon dist/index.js" re-execute the js code that changes in the dist folder

# current package update state

Backend: all;
Frontend: all except of: react react-dom react-is (peer deps conflict with nextJS but should be fixed with nextJS 10.6)

## COOKIE:

 if redis cookie called 'qid' dont show up under devtools>application>cookies you need to go to browser localhost:4000/graphql > settings > set "request.credentials": "omit",  to "request.credentials": "include"

## setup eslint with prettier (non-react or react, link: <https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project>)

npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
npm install prettier eslint-config-prettier eslint-plugin-prettier --dev
npm install redis connect-redis express-session (alternative ioredis instead of redis)
npm install -D @types/redis @types/express-session @type/connect-redis

### started project at 28.8.2020 11:40 PM

## shell history (old and incomplete)

```bash
mkdir gh/newreddit && cd gh/newreddit
code .
npm init -y
nvm install 14.5.0
nvm alias default 14.5
nvm ls
npm -v
npm install -D @types/node typescript ts-node nodemon pg @types/express (alternative ts-node-dev instead of ts-node)
npm install express apollo-server-express graphql type-graphql \
reflect-metadata
npm install class-validator (only needed if tsconfig>skipLipCheck = false)
npx tsconfig.json (select node)
npm install cors
npm install -D @types/cors
npm install nodemailer
npm install -D @types/nodemailer
npm install uuid ioredis
npm install -D @types/uuid @types/ioredis
npm uninstall redis
```
