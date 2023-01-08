import {NextFunction, Request, Response} from 'express';
import httpStatus, {INTERNAL_SERVER_ERROR} from 'http-status';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const defaultStatus = INTERNAL_SERVER_ERROR;

  return res.status(err?.status ?? defaultStatus).send({
    name: 'ServiceErrorHandler',
    status: err?.status ?? defaultStatus,
    error: err?.code ?? httpStatus[500],
  });
};
