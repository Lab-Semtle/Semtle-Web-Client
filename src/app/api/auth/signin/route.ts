import { NextResponse } from 'next/server';

const MOCK_USER = {
  accessToken: 'mock_access_token_123',
  refreshToken: 'mock_refresh_token_456',
  email: 'test@semtle.com',
  password: 'password123!',
  uuid: 'mock_user_id',
  studentId: '20231234',
  username: '테스트 유저',
  role: 'USER',
  manageApprovalStatus: true,
  profileImageUrl: '/images/default-profile.png',
};

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
    return NextResponse.json(
      { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 },
    );
  }

  return NextResponse.json({
    accessToken: MOCK_USER.accessToken,
    refreshToken: MOCK_USER.refreshToken,
    uuid: MOCK_USER.uuid,
    username: MOCK_USER.username,
    role: MOCK_USER.role,
    manageApprovalStatus: MOCK_USER.manageApprovalStatus,
    profileImageUrl: MOCK_USER.profileImageUrl,
  });
}
