export interface SuccessResponse<T> {
  status: 'success';
  data: T;
}

export interface ErrorResponse {
  status: 'fail' | 'error';
  message: string;
  error: {
    statusCode: number;
  }
}