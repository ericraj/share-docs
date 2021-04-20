import { CategoryInput } from "../resolvers/categoryInput";

export const validateCategory = (inputs: CategoryInput) => {
  if (!inputs.name) {
    let field: string = "";
    if (!inputs.name) {
      field = "name";
    }
    return [{ field, message: "Please complete all fields" }];
  }
  return null;
};
