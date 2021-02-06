import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

// m to n
// many to many
// user<->posts
// user -> join table <-posts
// user -> upvotes <- posts

// @ObjectType()
@Entity()
export class Upvote extends BaseEntity {
    // @Field()
    @Column({ type: 'int' })
    value: number;

    // @Field()
    @PrimaryColumn()
    userId: number;

    // @Field(() => User)
    @ManyToOne(() => User, (user) => user.upvotes)
    user: User;

    // @Field()
    @PrimaryColumn()
    postId: number;

    // @Field(()=> Post)
    @ManyToOne(() => Post, (post) => post.upvotes)

    // // cascade delete: when a post gets deleted this gets deleted too
    // @ManyToOne(() => Post, (post) => post.upvotes, {
    //     onDelete: 'CASCADE',
    // })
    post: Post;
}
