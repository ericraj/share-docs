import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Tag } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { validateTag } from "../../utils/validateTag";
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

    // TODO : check if current user is creator user ?

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
    const tag = result.raw[0];
    return { tag };
  }
}
