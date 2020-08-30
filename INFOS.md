
# create a post
```
 if (conn) {
      let post = new Post();
    post.title = "Me and Bears";
    conn.manager
            .save(post)
            .then(post => {
                console.log("post has been saved. post id is", post.id);
            });
   }
```

