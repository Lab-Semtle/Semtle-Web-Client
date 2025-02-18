/** API 응답 타입 정의
 *
 * - post, patch, delete, put
 * 성공 : status, message, data(선택)
 * 실패 : status,
 *
 * - get
 * 성공 : data, status
 * 실패 : status
 */

// 공통 응답 타입
export interface ApiResponse {
  status: number; // HTTP 상태 코드
}

// POST, PATCH, DELETE, PUT 요청 성공 응답
export type ApiResponseWithMessage<T = undefined> = ApiResponse & {
  message: string; // 성공 메시지
  data?: T; // 데이터 (선택)
};

// GET 요청 성공 응답
export type ApiResponseWithData<T> = ApiResponse & {
  data: T;
};

// 공통 실패 응답
export type ApiResponseError = ApiResponse;

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
