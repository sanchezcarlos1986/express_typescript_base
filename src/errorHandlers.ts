import {Response} from 'express';

function errorHandler(err: any, res: Response) {
  return res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'INTERNAL_SERVER_ERROR',
    time: new Date(),
  });
}

export {errorHandler};
