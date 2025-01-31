/* 인증 관련 API 요청 */
import apiClient from '@/lib/fetch-client-url';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

// 로그인 API 호출 함수
export const loginApi = async (email: string, password: string) => {
  const response = await apiClient.post<LoginResponse, LoginRequest>(
    '/api/members/login',
    {
      body: { email, password },
      withAuth: false, // 로그인 시 인증 헤더 불필요
    },
  );

  if (response?.data?.success) {
    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('accessToken', response.data.accessToken || '');
    localStorage.setItem('refreshToken', response.data.refreshToken || '');
  }

  return response;
};

// 비밀번호 재설정 API 호출 함수
export const resetPasswordApi = async (email: string) => {
  const response = await apiClient.post<
    { success: boolean; message?: string },
    { email: string }
  >('/members/repassword', {
    body: { email },
    withAuth: false, // 비밀번호 재설정 시 인증 불필요
  });

  return response;
};
