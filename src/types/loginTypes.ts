/** 로그인 요청 응답 타입 */
export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// export interface LoginResponse {
//   accessToken: string;
//   refreshToken: string;
//   user: {
//     id: string;
//     email: string;
//     role: 'admin' | 'user' | 'guest';
//     profileImageUrl?: string;
//   };
// }

// export interface RefreshTokenResponse {
//   accessToken: string;
//   refreshToken: string;
// }
