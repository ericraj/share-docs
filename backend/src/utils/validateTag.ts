import { TagInputs, UpdateTagInputs } from "src/resolvers/tags/inputs";

export const validateTag = (inputs: TagInputs | UpdateTagInputs) => {
  if (!inputs.name) {
    return [{ field: "name", message: "field is required" }];
  }

  return null;
};
