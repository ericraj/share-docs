import { EntitySchema } from "typeorm";
import Category from "./Category";
import Document from "./Document";
import Tag from "./Tag";
import User from "./User";

const entities: (string | Function | EntitySchema<any>)[] = [Category, Document, Tag, User];

export { Category, Document, Tag, User };

export default entities;
