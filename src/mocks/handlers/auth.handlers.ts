import { HttpResponse, http } from 'msw';
import { ApiResponse, ApiResponseError } from '@/types/api'; // 응답 타입 사용

// 테스트 유저 (간단한 메모리 기반 데이터)
const users = [
  {
    id: '1',
    username: 'test1@example.com',
    fullname: '김민수',
    password: 'password123!',
    role: 'user',
    profileImageUrl: 'https://example.com/user1.png',
  },
  {
    id: '2',
    username: 'test2@example.com',
    fullname: '홍길동',
    password: 'password456!',
    role: 'admin',
    profileImageUrl: 'https://example.com/user2.png',
  },
];

export const authHandlers = [
  // 로그인 목업 API
  http.post<never, { email: string; password: string }, ApiResponse>(
    '/auth/signin',
    async ({ request }) => {
      const { email, password } = await request.json();
      console.log('[msw handlers] 받은 요청 데이터:', { email, password });

      // 1. 입력 검증: 이메일 또는 비밀번호가 입력되지 않으면 에러 반환
      if (!email || !password) {
        console.log(
          '[msw handlers] 입력 검증 실패: 이메일과 비밀번호를 확인하세요.',
        );
        return HttpResponse.json<ApiResponseError>(
          {
            status: 400,
            code: 'BAD_REQUEST',
            message: '이메일과 비밀번호를 입력해주세요.',
          },
          { status: 400 },
        );
      }

      // 2. 유저 존재 여부 확인
      const user = users.find((u) => u.username === email);
      console.log('[msw handlers] 매칭된 유저:', user);

      if (!user) {
        console.log('[msw handlers] 등록되지 않은 이메일');
        return HttpResponse.json<ApiResponseError>(
          {
            status: 401,
            code: 'INVALID_EMAIL',
            message: '등록되지 않은 이메일입니다.',
          },
          { status: 401 },
        );
      }

      // 3. 비밀번호 검증
      console.log('[msw handlers] 비밀번호 불일치');
      if (user.password !== password) {
        return HttpResponse.json<ApiResponseError>(
          {
            status: 401,
            code: 'INVALID_PASSWORD',
            message: '비밀번호가 일치하지 않습니다.',
          },
          { status: 401 },
        );
      }

      // 4. 성공적으로 로그인되었을 경우
      console.log('[msw handlers] 로그인 성공: 유저 데이터 반환');
      return HttpResponse.json<ApiResponse>({
        status: 200,
        code: 'SUCCESS',
      });
    },
  ),
];
