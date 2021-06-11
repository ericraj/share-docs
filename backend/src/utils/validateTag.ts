import { TagInputs, UpdateTagInputs } from "../resolvers/tags/inputs";

const validateTag = (inputs: TagInputs | UpdateTagInputs) => {
  if (!inputs.name) {
    return [{ field: "name", message: "field is required" }];
  }

  return null;
};

export default validateTag;
