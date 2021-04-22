import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Tag } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { validateTag } from "../../utils/validateTag";
import { TagResponse } from "../types";
import { TagInputs } from "./inputs";

@Resolver(Tag)
export default class CreateTagResolver {
  @Mutation(() => TagResponse)
  @UseMiddleware(isAuth)
  async createTag(@Arg("inputs") inputs: TagInputs, @Ctx() { req }: Context): Promise<TagResponse> {
    const errors = validateTag(inputs);
    if (errors) return { errors };

    const tag = await Tag.create({ ...inputs, creatorId: (req.session as any).userId }).save();
    return { tag };
  }
}
