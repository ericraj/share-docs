import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Document, Tag } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { validateDocument } from "../../utils/validateDocument";
import { DocumentResponse } from "../types";
import { DocumentInputs } from "./inputs";

@Resolver(Document)
export default class CreateDocumentResolver {
  @Mutation(() => DocumentResponse)
  @UseMiddleware(isAuth)
  async createDocument(
    @Arg("inputs") inputs: DocumentInputs,
    @Ctx() { req }: Context
  ): Promise<DocumentResponse> {
    const errors = await validateDocument(inputs);
    if (errors) return { errors };

    const { tagsIds } = inputs;

    const document = await Document.create({
      ...inputs,
      tags: tagsIds ? await Tag.findByIds(tagsIds) : [],
      creatorId: (req.session as any).userId
    }).save();

    return { document };
  }
}
