import webToken from "jsonwebtoken";
import { config } from "@config";

const sign = (id: string) => {
  return webToken.sign(
    {
      id,
    },
    config.jwt.user,
    { expiresIn: "5 Days" }
  );
};

const verify = (token: string) => {
  return webToken.verify(token, config.jwt.user);
};

export const jwt = { sign, verify };
