import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Category, Tag, User } from ".";
import { DOCUMENTS_TAGS_TABLE_NAME } from "../constants";

@ObjectType()
@Entity()
export class Document extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  link: string;

  @Field(() => Int)
  @Column()
  categoryId: number;

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.documents, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  category: Category;

  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, tag => tag.documents, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinTable({ name: DOCUMENTS_TAGS_TABLE_NAME })
  tags?: Tag[];

  @Field(() => Int)
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
