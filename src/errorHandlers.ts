import {ErrorData, ErrorType} from './types/error';

/**
 * Service error handler
 */
export class ServiceError extends Error {
  /** Override constructor */
  status: number;
  code: string;
  data: ErrorData;
  constructor(data: ErrorData, status: number) {
    super(data.message);
    this.name = 'ServiceError';
    this.status = status;
    this.code = data.code || data.message;
    this.data = data;
  }
}

/**
 * Handles a service error, should be attached in the catch clause
 *
 * If it is a known async client request, remaps the response code into
 * a standard Error
 * @param {*} error
 */
function errorHandler(error: ErrorType) {
  if (error?.response?.data) {
    throw new ServiceError(error.response.data, error.status);
  }
  return Promise.reject(error);
}

export {errorHandler};
