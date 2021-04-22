import { Category, Tag } from "../entities";
import { DocumentInputs, UpdateDocumentInputs } from "../resolvers/documents/inputs";
import { FieldError } from "../resolvers/error";

export const validateDocument = async (
  inputs: DocumentInputs | UpdateDocumentInputs
): Promise<FieldError[] | null> => {
  if (!inputs.title) {
    return [{ field: "title", message: "field is required" }];
  }

  if (!inputs.link) {
    return [{ field: "link", message: "field is required" }];
  }

  if (!inputs.categoryId) {
    return [{ field: "categoryId", message: "field is required" }];
  }

  // Check category
  const category = await Category.findOne(inputs.categoryId);
  if (!category) {
    return [{ field: "categoryId", message: `category with id ${inputs.categoryId} not found` }];
  }

  // Check tags
  if (inputs.tagsIds && inputs.tagsIds.length > 0) {
    inputs.tagsIds.map(async id => {
      const tag = await Tag.findOne(id);
      if (!tag) {
        return [{ field: "tagsIds", message: `tag with id ${id} not found` }];
      }
      return null;
    });
  }

  return null;
};
