import { ObjectType, Field } from 'type-graphql';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { Post } from './Post';
import { Upvote } from './Upvote';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    username!: string;

    @Column({ type: 'text' })
    password!: string;

    @Column({ type: 'text', unique: true })
    email!: string;

    @OneToMany(() => Post, (post) => post.creator)
    posts: Post[];

    @ManyToOne(() => Upvote, (upvote) => upvote.user)
    upvotes: Upvote[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
// Typeorm transforms string automatically into type: 'text',
// so you do not need to explicit add `@Column({ type: 'text' })`
