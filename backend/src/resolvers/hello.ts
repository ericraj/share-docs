import { Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../middlewares";

@Resolver()
export default class HelloResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  hello() {
    return "Hello World";
  }
}
