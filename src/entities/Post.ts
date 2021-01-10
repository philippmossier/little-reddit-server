import { ObjectType, Field } from 'type-graphql';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
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

    // we store that foreign key in a creatorId
    @Field()
    @Column()
    creatorId: number;

    // For relations we have to specify the type which we want connect to
    // in this case our Type is User
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
