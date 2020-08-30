# started project at 28.8.2020 11:40 PM
BEFORE START: sudo service postgresql start
# this project includes follow technologies:
- React
- TypeScript
- GraphQL
- URQL/Apollo
- Node.js
- PostgreSQL
- MikroORM/TypeORM
- Redis
- Next.js
- TypeGraphQL
- TailwindCSS

# versions:
node: 14.5.0
yarn: 1.22.5 (he used 1.21.1)
npm: 6.14.5
postgresql: 12.4

**video: 39:50**

# "tsc -w" recompiles our typescript code everytime we change a typescript file
# "nodemon dist/index.js" re-execute the js code that changes in the dist folder


# shell history 

mkdir gh/lireddit && cd gh/lireddit
code .
npm init -y
nvm install 14.5.0
nvm alias default 14.5
nvm ls
npm -v
yarn -v
yarn set version 1.21.1
yarn add -D @types/node typescript

yarn add -D ts-node
npx tsconfig.json (select node)


yarn watch (compiles ts to js into dist folder)
node dist/index.js

yarn start (faster)
yarn start2
yarn add -D nodemon

yarn add @mikro-orm/cli @mikro-orm/core @mikro-orm/migrations @mikro-orm/postgresql pg

createdb ngreddit
npx mikro-orm migration:create
yarn add express apollo-server-express graphql type-graphql
yarn add -D @types/express


```
yarn add -D @types/node @types/express typescript ts-node nodemon

yarn add @mikro-orm/cli @mikro-orm/core @mikro-orm/migrations @mikro-orm/postgresql \
pg express apollo-server-express graphql type-graphql


yarn add -D class-validator (only install if you get an error without it)

```

  "mikro-orm": {
    "useTsNode": true,
    "configPaths": [
      "./src/mikro-orm.config.ts",
      "./dist/mikro-orm.config.js"
    ]
  }


  yarn add reflect-metadata