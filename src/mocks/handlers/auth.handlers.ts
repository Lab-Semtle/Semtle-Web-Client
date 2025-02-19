import { HttpResponse, http } from 'msw';
import { API_ROUTES } from '@/constants/api';

// 로그인 요청 타입 정의
interface SigninRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입 정의
interface SigninResponse {
  accessToken: string;
  refreshToken: string;
  id: string; // uuid
  username: string;
  roles: string;
  manageApprovalStatus: boolean;
  profileImageUrl?: string;
}

export const authHandlers = [
  // 로그인 API Mock
  http.post(API_ROUTES.SIGN_IN, async ({ request }) => {
    const { email, password } = (await request.json()) as SigninRequest;

    // 테스트 계정 (실제 API와 일치하도록 가정)
    const VALID_USER: SigninResponse & SigninRequest = {
      email: 'user@example.com',
      password: 'password123!',
      accessToken: 'mock_access_token_123',
      refreshToken: 'mock_refresh_token_456',
      id: 'eb2d22e0-fa90-4360-b47a-ce4f881d9c04', // UUID
      username: '국태근',
      roles: 'USER',
      manageApprovalStatus: false,
      profileImageUrl: '',
    };

    // 유효한 로그인 요청인지 확인
    if (email === VALID_USER.email && password === VALID_USER.password) {
      return HttpResponse.json(
        {
          accessToken: VALID_USER.accessToken,
          refreshToken: VALID_USER.refreshToken,
          id: VALID_USER.id,
          username: VALID_USER.username,
          roles: VALID_USER.roles,
          manageApprovalStatus: VALID_USER.manageApprovalStatus,
          profileImageUrl: VALID_USER.profileImageUrl,
        },
        { status: 200 }, // HTTP 200 OK
      );
    }

    // 400: 잘못된 요청 (예: 필수 값 누락)
    if (!email || !password) {
      return HttpResponse.json({ status: 400 });
    }

    // 401: 인증 실패 (잘못된 이메일 또는 비밀번호)
    if (email !== VALID_USER.email || password !== VALID_USER.password) {
      return HttpResponse.json({ status: 401 });
    }

    // 403: 접근 권한 없음 (승인되지 않은 사용자)
    if (!VALID_USER.manageApprovalStatus) {
      return HttpResponse.json({ status: 403 });
    }

    // 404: 사용자를 찾을 수 없음
    if (email !== VALID_USER.email) {
      return HttpResponse.json({ status: 404 });
    }

    // 500: 서버 오류 (예: 내부 서버 오류)
    return HttpResponse.json({ status: 500 });
  }),
];
