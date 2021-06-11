import { CategoryInputs, UpdateCategoryInputs } from "../resolvers/categories/inputs";

const validateCategory = (inputs: CategoryInputs | UpdateCategoryInputs) => {
  if (!inputs.name) {
    return [{ field: "name", message: "Please complete all fields" }];
  }
  return null;
};

export default validateCategory;
