import { HttpResponse, http } from 'msw';

interface User {
  id: string;
  username: string;
  password: string;
  fullname?: string;
  image?: {
    id: number;
    image: string;
    created_at: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

const users: User[] = [];

export const authHandlers = [
  http.post('/api/login', async ({ request }) => {
    // 타입 단언을 사용하여 타입 오류 해결
    const { email, password } = (await request.json()) as LoginRequest;

    const user = users.find(
      (u) => u.username === email && u.password === password,
    );

    if (!user) {
      return HttpResponse.json(
        {
          message_code: 401,
          message: '이메일 또는 비밀번호가 일치하지 않습니다.',
          data: null,
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        message_code: 200,
        message: '성공적으로 로그인되었습니다.',
        data: user,
      },
      { status: 200 },
    );
  }),
];
