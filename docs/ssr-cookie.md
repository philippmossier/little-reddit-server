# ssr explained

- if we do a client side request it automatically sends a cookie to the server
- the first time we go to a page it gets server side rendered

- if some bugs only happen on ssr, thats probably because next.js does not forward the cookie to the graphql.api so we do not get the user     specific data (cookie lost by next.js and does not arrive at the graphql.api, so we need SSR-cookie-forwarding)

## SSR compared to CSR

ssr:
    browser -> next.js -> graphql.api
csr:
    browser -> graphql.api

## how to se nextjs logs from SSR ?

> createUrqlClient file on the client code:

```typescript
const createUrqlClient = (ssrExchange: any, ctx: any) => { 
  let cookie = '';
  if (isServer()) {
    // log is shown in the terminal where `npm run dev` gots executed (nextJS logs)
    // console.log('ctx', ctx.req.headers.cookie);
    cookie = ctx.req.headers.cookie;
  }
  return {
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: 'include' as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    ...
    ...
    };
```
