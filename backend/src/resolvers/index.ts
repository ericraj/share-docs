import { NonEmptyArray } from "type-graphql";
import { HelloResolver } from "./hello";
import { CreateTagResolver, DeleteTagResolver, GetTagResolver, UpdateTagResolver } from "./tags";
import { LoginResolver, LogoutResolver, RegisterResolver } from "./users";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,

  // Tag
  CreateTagResolver,
  DeleteTagResolver,
  GetTagResolver,
  UpdateTagResolver,

  // User
  LoginResolver,
  LogoutResolver,
  RegisterResolver
];

export default resolvers;
