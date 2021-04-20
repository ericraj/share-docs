import { NonEmptyArray } from "type-graphql";
import { CategoryResolver } from "./categories";
import { HelloResolver } from "./hello";
import { LoginResolver, LogoutResolver, RegisterResolver } from "./users";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,
  LoginResolver,
  LogoutResolver,
  RegisterResolver,
  CategoryResolver
];

export default resolvers;
