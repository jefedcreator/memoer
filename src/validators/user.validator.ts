import Joi from "joi";
import { IUser, ISignIn, IChangePassword } from "../types";

export const UserRegistrationValidator = (user: IUser) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().lowercase().required().label("Email"),
    name: Joi.string().trim().required().label("Name"),
    password: Joi.string().trim().required().label("Password"),
    phone: Joi.string().trim().required().label("Phone"),
  });
  const options = {
    errors: {
      wrap: {
        label: "",
        array: "",
      },
    },
  };
  return schema.validate(user, options);
};

export const LoginValidator = (user: ISignIn) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().lowercase().required().label("Email"),
    password: Joi.string().trim().required().label("Password"),
  });
  const options = {
    errors: {
      wrap: {
        label: "",
        array: "",
      },
    },
  };
  return schema.validate(user, options);
};

export const ResetPasswordValidator = (user: IChangePassword) => {
  const schema = Joi.object({
    password: Joi.string().trim().required().label("Password"),
    confirmPassword: Joi.string().trim().required().label("Confirm Password"),
    email: Joi.string().email().trim().optional().label("Email"),
  });
  const options = {
    errors: {
      wrap: {
        label: "",
      },
    },
  };
  return schema.validate(user, options);
};
