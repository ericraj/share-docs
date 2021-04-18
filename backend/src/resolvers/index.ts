import { NonEmptyArray } from "type-graphql";
import { HelloResolver } from "./hello";
import { LoginResolver, LogoutResolver, RegisterResolver } from "./users";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,
  LoginResolver,
  LogoutResolver,
  RegisterResolver
];

export default resolvers;
