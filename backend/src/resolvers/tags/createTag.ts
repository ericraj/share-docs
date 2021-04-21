import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Tag } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { ErrorResponse, TagResponse } from "../response";
import { TagInputs } from "./inputs";

@Resolver(Tag)
export default class CreateTagResolver {
  @Mutation(() => TagResponse)
  @UseMiddleware(isAuth)
  async createTag(@Arg("inputs") inputs: TagInputs, @Ctx() { req }: Context): Promise<TagResponse> {
    if (!inputs.name) {
      const errors: ErrorResponse = { errors: [{ field: "name", message: "field is required" }] };
      return errors;
    }

    const tag = await Tag.create({ ...inputs, creatorId: (req.session as any).userId }).save();
    return { tag };
  }
}
