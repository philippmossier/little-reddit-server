# HOW USER SESSION WORK

storing some data into session
takes every data stuck on the `session` object and save it on redis.
Starts when i set a cookie in the login or register function:
`req.session.userId = user.id;`

`{userId: 1}` -> send that to redis (redis is a key-value store)

key to look up for a value
key looks something like this and maps to our userId object

## <---- key on redis--->       <--stored value on redis -->

1; `sess:aasdlhakjhadsfsdf`  ->    `{ userId: 1}`

## ___________________________________________<--signed version of the redis key-->

2; express-session will set a cookie on my browser like: `xzxjflfsdfsdffsdfaas`

3; when user makes a request:
`xzxjflfsdfsdffsdfaas` -> sent to the server

4; when the signed version of the redis key gets on the server, the server unsigns it with our specified secret (decrypt)
`xzxjflfsdfsdffsdfaas` -> secret unsigns to: -> `sess:aasdlhakjhadsfsdf`

5; make a request to redis
`sess:aasdlhakjhadsfsdf` -> `{ userId: 1}`

Now the session is stored on

req.sesion = { userId: 1 }
