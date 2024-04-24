import { prisma } from "@repository/prisma";
import { jwt } from "@utils";
import { NextFunction, Request, Response } from "express";
import { Exception } from "./error.middleware";

export const UserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers["x-auth-token"] || "";
    if (token) {
      let decoded: any = jwt.verify(token);
      let user = await prisma.user.findFirst({
        where: {
          email: decoded.email,
        },
      });
      if (user?.id == decoded.id) {
        next();
      } else {
        throw new Exception(401, "Authentication Failed/Invalid Token");
      }
    } else {
      throw new Exception(401, "Authentication Failed/Invalid Token");
    }
  } catch (e: any) {
    return res.status(401).json({
      statusCode: 401,
      message: "Authentication Failed",
    });
  }
};

// export const PaymentAuth = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const providerSignature = req.headers['x-paystack-signature'] || '';
//     const signature = crypto
//       .createHmac('sha512', config.payment.secretKey)
//       .update(JSON.stringify(req.body))
//       .digest('hex');
//     if (providerSignature != signature)
//       throw new Exception(401, 'Authentication failed');
//     next();
//   } catch (e: any) {
//     return res.status(401).json({
//       statusCode: 401,
//       message: e.message,
//     });
//   }
// };
