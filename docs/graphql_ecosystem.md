####################################
######## GRAPHQL-ECOSYSTEM #########
####################################

frontend architecture
========================

- graphQL Client for React like: apollo-client, urql(smaller bundle size as apollo) for fetching logic abstraction. There is also Relay(harder to learn but interesting FUTURE potential) , graphql-react(even smaller bundle than urql) and mst-gql(i duno if thats a thing atm)
- codeGeneretator like: graphQL-codegen(recommended) or apollo-cli for typegeneration and query and mutation hooks

backend architecture
=========================

- writing the schema with code first or schema first:
 code first: type-graphql (to create graphql-schema and resolvers using classes and decorators)
 schmea first: prisma 2 (write your schema with psdl)

- Use a ORM when code first (With GraphQL you need 2 Schemas one for your DB and one for GraphQL):  
  TypeORM to write your entities and make migrations (Postgres, MySQL ...) <-- Typeorm is recommended because they have good integration with type-graphql
  TypeORM lets you write only 1 schema which represents your DB-schema and the graphQL-schema (Single Source of truth)
  Mongoose (for MongoDB)
  Sequelize
  Objection.js
  Knex.js

- Nodejs GraphQL Server:
 Apollo-Server: appolo-server-express
                appolo-server-fastify
                appolo-server-koa
                appolo-server-hapi
                NestJS
                GraphQL Yoga2
                Express GraphQL
                (Apollo-server and NestJS are the top 2 choices)

- server framework: express

- session middleware: express-session

- redis client for nodejs: ioredis

- databases: Postgres, MongoDB, ElasticSearch, FaunaDB, Neo4j...
- Solving the N+1 Problem: DataLoader or JoinMonster

- GraphQL Services:
 AWS AppSync (Uses AWS cloud..and lambda functions)
 PostGraphile (Put your Business Logic into Postgres Functions)
 Hasura (Put your Business Logic in Serverless Functions using a serverless cloud provider like lambda )
 Prisma2 (Put your business logic into javascript but not sure because Prisma 2 is not released yet, but this is interesting for the FUTURE)
