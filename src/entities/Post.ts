import { ObjectType, Field, Int } from 'type-graphql';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import { Upvote } from './Upvote';
import { User } from './User';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    text!: string;

    @Field()
    @Column({ type: 'int', default: 0 })
    points!: number;

    // only a graphQL schema value so we declare no column here
    @Field(() => Int, { nullable: true })
    voteStatus: number | null; // 1 or -1 | null

    @ManyToOne(() => Upvote, (upvote) => upvote.post)
    upvotes: Upvote[];

    // we store that foreign key in a creatorId
    @Field()
    @Column()
    creatorId: number;

    // For relations we have to specify the type which we want connect to
    // in this case our Type is User
    @Field()
    @ManyToOne(() => User, (user) => user.posts)
    // name of key effect the name of the foreign key, creator => creatorId
    // on the oder side of the relation we have to specify the opposite relation
    // in that case its OneToMany on our User-Entity
    creator: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
