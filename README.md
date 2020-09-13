# started project at 28.8.2020 11:40 PM

Video 2h:45
<https://www.youtube.com/watch?v=I6ypD7qv3Z8&t=19772s>

BEFORE START:

sudo service postgresql status
sudo service postgresql start

tab1:
redis-server
redis-cli ping

tab2:
npm run dev

SQL:
psql -d newreddit -U phil
SELECT * FROM post;
SELECT * FROM "user"; (user needs quotes, maybe because of conflict with reserved keyword)
DELETE FROM "user" WHERE username='eeeeeeee'; (singleQuoteHere)
DELETE FROM "user" WHERE username!='Philipp'; (deletes every user except me)
\d (list all tables)
\l (list all databases)
\du (list all users)
`
## delete DB create DB create DB-Tables

createdb dbname
dropdb dbname
INFO: "synchronize": true, => automatically creates the DB tables for you without running
      migrations. (set this to false if you manually use migrations to create a table)

## this project includes follow technologies

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

## versions

postgresql: 12.4
node: 14.5.0
npm: 6.14.5

## scripts explanation

- npm run watch (compiles ts to js into dist folder)
- node dist/index.js
- start is faster as start2
- "tsc -w" recompiles our typescript code everytime we change a typescript file
- "nodemon dist/index.js" re-execute the js code that changes in the dist folder

## shell history

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

## setup eslint with prettier (non-react or react, link: <https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project>)

npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev

npm install prettier eslint-config-prettier eslint-plugin-prettier --dev

video 1:41

npm install redis connect-redis express-session (alternative ioredis instead of redis)
npm install -D @types/redis @types/express-session @type/connect-redis

## if redis cookie called 'qid' dont show up under devtools>application>cookies you need to go to browser localhost:4000/graphql > settings > set "request.credentials": "omit",  to "request.credentials": "include"
