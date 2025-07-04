export type ApiResponse<T> = {
  data: T | null;
  error: string;
  ok: boolean;
};
