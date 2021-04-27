import { NonEmptyArray } from "type-graphql";
import {
  CreateCategoryResolver,
  DeleteCategoryResolver,
  GetCategoriesResolver,
  GetCategoryResolver,
  UpdateCategoryResolver
} from "./categories/";
import { CreateDocumentResolver, GetDocumentResolver, UpdateDocumentResolver } from "./documents";
import { HelloResolver } from "./hello";
import {
  CreateTagResolver,
  DeleteTagResolver,
  GetTagResolver,
  GetTagsResolver,
  UpdateTagResolver
} from "./tags";
import { LoginResolver, LogoutResolver, RegisterResolver } from "./users";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,

  // Document
  CreateDocumentResolver,
  GetDocumentResolver,
  UpdateDocumentResolver,

  // Tag
  CreateTagResolver,
  DeleteTagResolver,
  GetTagResolver,
  GetTagsResolver,
  UpdateTagResolver,

  // User
  LoginResolver,
  LogoutResolver,
  RegisterResolver,

  // Category
  CreateCategoryResolver,
  DeleteCategoryResolver,
  GetCategoriesResolver,
  GetCategoryResolver,
  UpdateCategoryResolver
];

export default resolvers;
