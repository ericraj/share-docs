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
import { TABLES_NAMES } from "../constants";
import Category from "./Category";
import Tag from "./Tag";
import User from "./User";

@ObjectType()
@Entity({ name: TABLES_NAMES.documents })
export default class Document extends BaseEntity {
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
  @JoinTable({
    name: TABLES_NAMES.documents_tags,
    joinColumn: { name: "documentId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tagId", referencedColumnName: "id" }
  })
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
