import { isAuth } from "../middlewares";
import { Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  hello() {
    return "Hello World";
  }
}
