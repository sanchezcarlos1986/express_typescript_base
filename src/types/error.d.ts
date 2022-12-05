export type ErrorData = {
  message: string;
  code: string;
};

export type ErrorResponse = {
  data: ErrorData;
};

export type ErrorType = {
  status: number;
  response: ErrorResponse;
};
