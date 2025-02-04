/** 목업 API */
import { HttpResponse, http } from 'msw';
import { ApiResponse, ApiResponseError } from '@/types/api'; // 응답 타입 사용

export const authHandlers = [
  // 로그인 목업 API
  http.post<never, { email: string; password: string }, ApiResponse>(
    '/auth/signin',
    async ({ request }) => {
      const bodyArray = await request.json();
      const body = bodyArray[0]; // 첫 번째 객체로 접근, 수정예정(프론트에서 반환값이 이상함)
      console.log('[Mock API] 받은 요청 데이터:', body);

      // 2. 유저 존재 여부 확인
      console.log('[Mock API] 요청에서 받은 이메일:', body.email);
      const user = users.find((u) => {
        console.log('[Mock API] 현재 유저 이메일:', u.email);
        return u.email === body.email;
      });
      console.log('[msw handlers] 매칭된 유저:', user);

      if (!user) {
        console.error('[Mock API] 등록되지 않은 이메일');
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
      if (user.password !== body.password) {
        console.error('[Mock API] 비밀번호 불일치');
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
      console.log('[Mock API] 로그인 성공 - 유저 정보 반환');
      return HttpResponse.json<ApiResponse>({
        status: 200,
        code: 'SUCCESS',
      });
    },
  ),
];

/** 목업 데이터 */
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
