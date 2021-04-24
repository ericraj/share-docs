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

    // Check tags
    const { tagsIds } = inputs;
    let tags: Tag[] = [];
    if (tagsIds && tagsIds.length > 0) {
      tags = await Tag.findByIds(tagsIds);
      if (tags.length !== tagsIds.length) {
        const ids = tags.map(t => t.id);
        const diff = tagsIds.filter(id => !ids.includes(id));
        if (diff.length > 0) {
          return {
            errors: [{ field: "tagsIds", message: `tag with id ${diff.join(", ")} not found` }]
          };
        }
      }
    }

    const document = await Document.create({
      ...inputs,
      tags,
      creatorId: (req.session as any).userId
    }).save();

    return { document };
  }
}
