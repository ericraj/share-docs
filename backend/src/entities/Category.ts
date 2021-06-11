import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { TABLES_NAMES } from "../constants";
import Document from "./Document";
import User from "./User";

@ObjectType()
@Entity({ name: TABLES_NAMES.categories })
export default class Category extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Document])
  @OneToMany(() => Document, document => document.category)
  documents: Document[];

  @Field(() => Int)
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.categories)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
