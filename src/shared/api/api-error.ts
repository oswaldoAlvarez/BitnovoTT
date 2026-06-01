type ApiErrorParams = {
  message: string;
  payload?: unknown;
  status?: number;
};

export class ApiError extends Error {
  payload: unknown;
  status: number | undefined;

  constructor({ message, payload, status }: ApiErrorParams) {
    super(message);
    this.name = 'ApiError';
    this.payload = payload;
    this.status = status;
  }
}
