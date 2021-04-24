import { Category } from "../entities";
import { DocumentInputs, UpdateDocumentInputs } from "../resolvers/documents/inputs";
import { FieldError } from "../resolvers/error";

export const validateDocument = async (
  inputs: DocumentInputs | UpdateDocumentInputs
): Promise<FieldError[] | null> => {
  const { title, link, categoryId } = inputs;
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

  return null;
};
