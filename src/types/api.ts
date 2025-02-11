/** API 응답 타입 정의 : API 호출 시 응답 및 에러 타입 처리 */

// 기본 응답 타입 정의
export interface ApiResponse {
  status: number;
  code: string;
}

// 에러 응답 타입 정의
export type ApiResponseError = ApiResponse & {
  message: string;
};

// 성공 응답 타입 정의 (제네릭 사용)
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

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
    profileImageUrl?: string;
  };
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SecretPost {
  post_id: number;
  title: string;
  writer: string;
  image_url?: string[];
  attachments?: {
    file_id: number;
    file_url: string;
    file_name: string;
    file_type: string;
    file_size: string;
  }[];
  created_at: string;
};