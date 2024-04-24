import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

interface Exception {
  statusCode: number;
  message: string;
  data?: any;
}

export const Exception = function (
  this: Exception,
  statusCode: number,
  message: string,
  data?: any,
) {
  this.statusCode = statusCode;
  this.message = message;
  this.data = data;
} as unknown as {
  new (statusCode: number, message: string, data?: any): Exception;
};

export const ErrorMiddleware = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  res.status(error.statusCode || 503);
  return res.send({
    status: 'ERROR',
    statusCode: error.statusCode,
    message: error.message,
    data: error.data,
  });
};

export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
