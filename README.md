# GraphQL API for little reddit clone

### Main Goals for the project:

- Write Resolvers and Entities on my own, instead of using a GraphQL-Service like Hasura.
- Use the code-first/active-record approach. (TypeORM, type-graphql).
- Stay flexible how to comminicate with PostgreSQL, using raw SQL or typeORM-queryBuilder. 
- Write authentication on my own.
- Use redis for sessions.
- Sync all resolvers and entity types with the frontend app.
- Set up a password reset mailer (nodemailer)


### Stack i used: 

- Typescript
- TypeORM
- type-graphql
- redis
- express
- apollo-server-express

---

💡 Addional notes are in the docs folder

# How to start this server: 

1. check versions:
postgreSQL: 13 
node: 15.6   (needed for npm 7.0)
npm: 7.4.0   (because of newest npm peer dependencies feature)

2. configure postgreSQL (optional):
Need to config your postgreSQL for the fist time ?
https://stackoverflow.com/questions/1471571/how-to-configure-postgresql-for-the-first-time

3. create a new postreSQL DB and edit database URL in `.env` 
4. Start redis server for user session(version 6.no config needed)
   Just use the standard redis port 127.0.0.1:6379
	 Start up a redis server with: `redis-server`

5. run little-reddit-server
	`cd little-reddit-server`
	`npm run dev`

6. run little-reddit-web
	`cd little-reddit-web`
	`npm run dev`

