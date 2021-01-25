# How to run this APP

1. check versions:
postgreSQL: 13 
node: 15.6   (needed for npm 7.0)
npm: 7.4.0   (because of newest npm peer dependencies feature)

2. configure postgreSQL (optional):
Need to config your postgreSQL for the fist time ?
https://stackoverflow.com/questions/1471571/how-to-configure-postgresql-for-the-first-time

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
