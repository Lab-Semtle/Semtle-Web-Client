/** API 기본 응답 타입 */
// 공통 응답 타입
export interface ApiResponse {
  status: number; // HTTP 상태 코드
  message?: string; // 성공/오류 메시지 (선택)
}

// 데이터 포함 응답
export type ApiResponseWithData<T> = ApiResponse & {
  data: T;
};

// 메시지 포함 응답
export type ApiResponseWithMessage<T = undefined> = ApiResponse & {
  message: string; // 성공 메시지
  data?: T; // 데이터 (선택)
};

// 공통 실패 응답
export type ApiResponseError = ApiResponse & {
  error?: string; // 에러 메시지 (선택)
};

// 타입 가드 함수 : 실패 응답인지 판별
export const isApiResponseError = (
  error: unknown,
): error is ApiResponseError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    !('data' in error) // GET 성공 응답 제외 (data가 있는 경우 성공)
  );
};

// 인증 토큰 타입
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
