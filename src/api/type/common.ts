export interface BaseApiResponse<T = undefined> {
  code: number;
  data?: T;
  body?: T;
  message?: string;
}
