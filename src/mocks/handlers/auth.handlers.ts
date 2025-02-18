/** 로그인 관련 Mock API 핸들러 */
import { http, HttpResponse } from 'msw';
import { ApiResponseWithData, ApiResponseError } from '@/types/apiTypes';

export const authHandlers = [
  // 로그인 목업 API
  http.post('/auth/signin', async ({ request }) => {
    const body = await request.json();
    console.log('[Mock API] 받은 요청 데이터:', body);

    // 요청에서 받은 이메일 확인
    const user = users.find((u) => u.email === body.email);

    if (!user) {
      console.error('[Mock API] 등록되지 않은 이메일');
      return Promise.resolve(
        HttpResponse.json<ApiResponseError>(
          {
            status: 401,
            code: 'NON_EXISTENT_ACCOUNT',
            message: '등록되지 않은 이메일입니다.',
          },
          { status: 401 },
        ),
      );
    }

    // 비밀번호 검증
    if (user.password !== body.password) {
      console.error('[Mock API] 비밀번호 불일치');
      return Promise.resolve(
        HttpResponse.json<ApiResponseError>(
          {
            status: 401,
            code: 'MISMATCHED_PASSWORD',
            message: '비밀번호가 일치하지 않습니다.',
          },
          { status: 401 },
        ),
      );
    }

    // Mock 토큰 생성 (실제 JWT 생성 로직은 없음)
    const accessToken = `mock_access_token_${user.id}`;
    const refreshToken = `mock_refresh_token_${user.id}`;

    console.log('[Mock API] 로그인 성공 - 유저 정보 반환');

    return Promise.resolve(
      HttpResponse.json<ApiResponseWithData<AuthMockResponse>>(
        {
          status: 200,
          code: 'SUCCESS',
          message: '로그인 성공', // <-- 추가 (MSW 타입 오류 해결)
          data: {
            uuid: user.id,
            accessToken,
            refreshToken,
            username: user.fullname,
            roles: [user.role],
            manageApprovalStatus: true,
            profileImageUrl: user.profileImageUrl,
          },
        },
        { status: 200 },
      ),
    );
  }),
];

/** 목업 유저 데이터 */
const users = [
  {
    id: '1',
    email: 'test1@semtle.com',
    fullname: '김민수',
    password: 'password123!',
    role: 'user',
    profileImageUrl: 'https://example.com/user1.png',
  },
  {
    id: '2',
    email: 'test2@semtle.com',
    fullname: '홍길동',
    password: 'password456!',
    role: 'admin',
    profileImageUrl: 'https://example.com/user2.png',
  },
];

/** API 응답 타입 */
interface AuthMockResponse {
  uuid: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  roles: string[];
  manageApprovalStatus: boolean;
  profileImageUrl?: string;
}
