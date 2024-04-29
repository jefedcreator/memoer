import { Response } from "express";

export const CustomApiResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any,
) => {
  res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};
