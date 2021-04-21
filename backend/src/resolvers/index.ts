import { NonEmptyArray } from "type-graphql";
import { HelloResolver } from "./hello";
import { CreateTagResolver } from "./tags";
import { LoginResolver, LogoutResolver, RegisterResolver } from "./users";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,
  CreateTagResolver,
  LoginResolver,
  LogoutResolver,
  RegisterResolver
];

export default resolvers;
