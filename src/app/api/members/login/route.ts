import { NextResponse } from 'next/server';
import mockUsers from '../../mockDatabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 유저 이메일 확인
    const user = mockUsers.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: '일치하는 이메일을 찾을 수 없습니다.',
        },
        { status: 404 }, // 이메일이 없는 경우 404
      );
    }

    // 비밀번호 확인
    if (user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          message: '비밀번호가 틀렸습니다.',
        },
        { status: 401 }, // 비밀번호가 틀린 경우 401
      );
    }

    // 로그인 성공
    return NextResponse.json(
      {
        success: true,
        message: '로그인 성공',
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '서버와 통신할 수 없습니다. 다시 시도해 주세요.',
      },
      { status: 500 },
    );
  }
}
