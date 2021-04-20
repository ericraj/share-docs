import { CategoryInput } from "../resolvers/categoryInput";

export const validateCategory = (inputs: CategoryInput) => {
  if (!inputs.name || !inputs.creatorId) {
    let field: string = "";
    if (!inputs.name) {
      field = "name";
    }
    if (!inputs.creatorId) {
      field = "creatorId";
    }
    return [{ field, message: "Veuillez remplir tout les champ" }];
  }
  return null;
};
