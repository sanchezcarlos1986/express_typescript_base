export type ErrorData = {
  message: string;
  code: string;
};

export type ErrorResponse = {
  data: ErrorData;
};

export type ErrorType = {
  code: string;
  status?: number;
  response?: ErrorResponse;
};
