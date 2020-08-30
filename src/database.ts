// import { createConnection } from 'typeorm';
// import { Post } from './entities/Post';

// export const init_db = async() => {
//   const connection = await createConnection();
//   await connection.dropDatabase();
//   await connection.synchronize();

//   // Types
//   const post = new Post();
//   post.title = 'test asdasdasd';
//   await post.save();

// }