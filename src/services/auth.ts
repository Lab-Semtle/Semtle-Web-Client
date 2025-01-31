import apiClient from '@/lib/api-client-url';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
}

// // 로그인 API 호출 함수
// export const loginApi = async (email: string, password: string) => {
//   return apiClient.post<
//     { success: boolean; message?: string }, // 서버로부터의 응답 타입
//     { email: string; password: string } // 요청 바디 타입
//   >('/members/login', {
//     body: { email, password },
//   });
// };

export const loginApi = async (email: string, password: string) => {
  const response = await apiClient.post<LoginResponse, LoginRequest>(
    '/api/members/login',
    {
      body: { email, password },
      withAuth: false, // 로그인은 토큰이 필요하지 않음
    },
  );
  return response;
};

export const resetPasswordApi = async (email: string) => {
  const response = await apiClient.post<
    { success: boolean; message?: string },
    { email: string }
  >('/members/repassword', {
    body: { email },
    withAuth: false, // 토큰 필요 없음
  });

  return response;
};
