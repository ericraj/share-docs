import { UserInput } from "../resolvers/users/inputs";

const validateRegister = (inputs: UserInput) => {
  if (!inputs.email.includes("@")) {
    return [{ field: "email", message: "invalid email" }];
  }

  if (inputs.username.length <= 2) {
    return [{ field: "username", message: "length must be greater than 2" }];
  }

  if (inputs.username.includes("@")) {
    return [{ field: "username", message: "cannot include an @" }];
  }

  if (inputs.password.length < 4) {
    return [{ field: "password", message: "length must be greater than 4" }];
  }

  return null;
};

export default validateRegister;
