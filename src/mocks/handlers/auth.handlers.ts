// import { HttpResponse, http } from 'msw';
// // import { API_ROUTES } from '@/constants/api';

// // 로그인 요청 타입 정의
// interface SigninRequest {
//   email: string;
//   password: string;
// }

// // 로그인 응답 타입 정의
// interface SigninResponse {
//   accessToken: string;
//   refreshToken: string;
//   id: string; // uuid
//   username: string;
//   roles: string;
//   manageApprovalStatus: boolean;
//   profileImageUrl?: string;
// }

// export const authHandlers = [
//   // 로그인 API Mock
//   http.post('/api/signin', async ({ request }) => {
//     console.log('[MSW] /auth/signin 요청 가로챔');

//     const { email, password } = (await request.json()) as SigninRequest;

//     // 테스트 계정 (실제 API와 일치하도록 가정)
//     const VALID_USER: SigninResponse & SigninRequest = {
//       email: 'user@example.com',
//       password: 'password123!',
//       accessToken: 'mock_access_token_123',
//       refreshToken: 'mock_refresh_token_456',
//       id: 'eb2d22e0-fa90-4360-b47a-ce4f881d9c04', // UUID
//       username: '국태근',
//       roles: 'USER',
//       manageApprovalStatus: false,
//       profileImageUrl: '',
//     };

//     // 유효한 로그인 요청인지 확인
//     if (email === VALID_USER.email && password === VALID_USER.password) {
//       console.log('[MSW] 유효한 사용자 로그인 성공');
//       return HttpResponse.json(
//         {
//           accessToken: VALID_USER.accessToken,
//           refreshToken: VALID_USER.refreshToken,
//           id: VALID_USER.id,
//           username: VALID_USER.username,
//           roles: VALID_USER.roles,
//           manageApprovalStatus: VALID_USER.manageApprovalStatus,
//           profileImageUrl: VALID_USER.profileImageUrl,
//         },
//         { status: 200 }, // HTTP 200 OK
//       );
//     }

//     console.log('[MSW] 로그인 실패');
//     return HttpResponse.json(
//       { message: 'Invalid credentials' },
//       { status: 401 },
//     );
//   }),
// ];
