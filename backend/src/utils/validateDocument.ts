import { Category, Tag } from "../entities";
import { DocumentInputs, UpdateDocumentInputs } from "../resolvers/documents/inputs";
import { FieldError } from "../resolvers/error";

export const validateDocument = async (
  inputs: DocumentInputs | UpdateDocumentInputs
): Promise<FieldError[] | null> => {
  const { title, link, categoryId, tagsIds } = inputs;
  if (!title) {
    return [{ field: "title", message: "field is required" }];
  }

  if (!link) {
    return [{ field: "link", message: "field is required" }];
  }

  if (!categoryId) {
    return [{ field: "categoryId", message: "field is required" }];
  }

  // Check category
  const category = await Category.findOne(categoryId);
  if (!category) {
    return [{ field: "categoryId", message: `category with id ${categoryId} not found` }];
  }

  // Check tags
  if (tagsIds && tagsIds.length > 0) {
    const tags = await Tag.findByIds(tagsIds);
    if (tags.length !== tagsIds.length) {
      const ids = tags.map(t => t.id);
      const diff = tagsIds.filter(id => !ids.includes(id));
      if (diff.length > 0) {
        return [{ field: "tagsIds", message: `tag with id ${diff.join(", ")} not found` }];
      }
    }
  }

  return null;
};
