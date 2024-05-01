import Joi from "joi";
import { IChangePassword, ISignIn, IUpdateUser, IUser } from "../types";

export const UserRegistrationValidator = (
  user: IUser
): Joi.ValidationResult<IUser> => {
  const schema = Joi.object({
    email: Joi.string().email().trim().lowercase().required().label("Email"),
    name: Joi.string().trim().required().label("Name"),
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

export const UserUpdationValidator = (
  user: IUpdateUser
): Joi.ValidationResult<IUpdateUser> => {
  const schema = Joi.object({
    email: Joi.string().email().trim().lowercase().optional().label("Email"),
    name: Joi.string().trim().optional().label("Name"),
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

export const LoginValidator = (
  user: ISignIn
): Joi.ValidationResult<ISignIn> => {
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

export const ResetPasswordValidator = (
  user: IChangePassword
): Joi.ValidationResult<IChangePassword> => {
  const schema = Joi.object({
    email: Joi.string().email().trim().lowercase().required().label("Email"),
    password: Joi.string().trim().required().label("Password"),
    confirmPassword: Joi.string().trim().required().label("Confirm Password"),
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
