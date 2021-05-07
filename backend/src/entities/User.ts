import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Category, Document, Tag } from ".";
import { TABLES_NAMES } from "../constants";

@ObjectType()
@Entity({ name: TABLES_NAMES.users })
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => Category, category => category.creator)
  categories: Category[];

  @OneToMany(() => Document, document => document.creator)
  documents: Document[];

  @OneToMany(() => Tag, tag => tag.creator)
  tags: Tag[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
