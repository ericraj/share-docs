import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Category, Tag, User } from ".";

@ObjectType()
@Entity()
export class Document extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  link: string;

  @Field()
  @Column()
  categoryId: number;

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.documents)
  category: Category;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, tag => tag.documents)
  tags?: Tag[];

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.documents)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
