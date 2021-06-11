import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Tag } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import checkCurrentUser from "../../utils/checkCurrentUser";
import validateTag from "../../utils/validateTag";
import { TagResponse } from "../types";
import { UpdateTagInputs } from "./inputs";

@Resolver(Tag)
export default class UpdateTagResolver {
  @Mutation(() => TagResponse)
  @UseMiddleware(isAuth)
  async updateTag(
    @Arg("inputs") inputs: UpdateTagInputs,
    @Ctx() { req }: Context
  ): Promise<TagResponse | null> {
    const errors = validateTag(inputs);
    if (errors) return { errors };

    const tag = await Tag.findOne(inputs.id);

    if (!tag) {
      return { errors: [{ field: "id", message: "tag not found" }] };
    }

    checkCurrentUser(tag.creatorId, (req.session as any).userId);

    const result = await getConnection()
      .createQueryBuilder()
      .update(Tag)
      .set({ name: inputs.name })
      .where('id = :id and "creatorId" = :creatorId', {
        id: inputs.id,
        creatorId: (req.session as any).userId
      })
      .returning("*")
      .execute();
    const res = result.raw[0];
    return { tag: res };
  }
}
