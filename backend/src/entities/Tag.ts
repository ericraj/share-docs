import { Field, Int, ObjectType } from "type-graphql";
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
import { TABLES_NAMES } from "../constants";
import Document from "./Document";
import User from "./User";

@ObjectType()
@Entity({ name: TABLES_NAMES.tags })
export default class Tag extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Document], { nullable: true })
  @ManyToMany(() => Document, document => document.tags)
  documents?: Document[];

  @Field(() => Int)
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.tags)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
