export interface SuccessResponse<T> {
  status: 'success';
  data: T;
}

type ErrorStatus = 'fail' | 'error';
export interface ErrorResponse {
  status: ErrorStatus;
  message: string;
}