# started project at 28.8.2020 11:40 PM
BEFORE START: sudo service postgresql status
BEFORE START: sudo service postgresql start
# delete DB create DB create DB-Tables
createdb dbname
dropdb dbname
INFO: "synchronize": true, => automatically creates the DB tables for you without running 
      migrations. (set this to false if you manually use migrations to create a table)
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
- TailwindCSSj

# versions:
postgresql: 12.4
node: 14.5.0
npm: 6.14.5

**video: 1h:19m**
https://www.youtube.com/watch?v=I6ypD7qv3Z8&t=19772s

# scripts explanation
- npm run watch (compiles ts to js into dist folder)
- node dist/index.js
- start is faster as start2
- "tsc -w" recompiles our typescript code everytime we change a typescript file
- "nodemon dist/index.js" re-execute the js code that changes in the dist folder

# shell history 

mkdir gh/newreddit && cd gh/newreddit
code .
npm init -y
nvm install 14.5.0
nvm alias default 14.5
nvm ls
npm -v
npm install -D @types/node typescript ts-node nodemon pg @types/express
npm install express apollo-server-express graphql type-graphql \
reflect-metadata class-validator 
npx tsconfig.json (select node)

# setup eslint with prettier (non-react or react, link: https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev

npm install prettier eslint-config-prettier eslint-plugin-prettier --dev

