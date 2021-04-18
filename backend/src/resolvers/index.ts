import { NonEmptyArray } from "type-graphql";
import { HelloResolver } from "./hello";
import { LoginResolver, RegisterResolver } from "./users";

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,
  LoginResolver,
  RegisterResolver
];

export default resolvers;
