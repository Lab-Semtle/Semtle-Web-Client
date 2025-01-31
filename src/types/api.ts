// 기본 응답 구조
export interface ApiResponse {
  status: number;
  code: string;
}

// 에러 타입
export type ApiResponseError = ApiResponse & {
  message: string;
};

// 성공 응답 타입 (제네릭 사용)
export type ApiResponseWithData<T> = ApiResponse & {
  data: T;
};

// 에러 타입 가드 함수 (오류 발생 시 타입 추론)
export const isApiResponseError = (
  error: unknown,
): error is ApiResponseError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'code' in error &&
    'message' in error
  );
};

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
