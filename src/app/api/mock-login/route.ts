import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // 간단한 Mock 유효성 검사
  if (email === 'test@example.com' && password === 'test1234') {
    return NextResponse.json(
      {
        message: '로그인 성공',
        data: {
          userId: 1,
          token: 'mock-token-123',
        },
      },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      { message: '이메일 또는 비밀번호가 잘못되었습니다.' },
      { status: 401 },
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({ message: 'OK' }, { status: 200 });
}
