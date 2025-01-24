import { NextResponse } from 'next/server';

type UserData = {
  name: string;
  email: string;
  studentId: string;
  birthdate: string;
  phone: string;
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  // 비동기로 params.id 가져오기
  const id = await params.id;

  // 목업 데이터
  const mockData: Record<string, UserData> = {
    '1': {
      name: '홍길동',
      email: 'XXXX@g.kmou.ac.kr',
      studentId: '20XXXXXX',
      birthdate: '2000-01-01',
      phone: '010-0000-0000',
    },
    '2': {
      name: '김철수',
      email: 'kim@example.com',
      studentId: '20YYYYYY',
      birthdate: '1999-12-31',
      phone: '010-1234-5678',
    },
  };

  const userData = mockData[id];

  if (!userData) {
    return NextResponse.json(
      { success: false, message: 'User not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: userData });
}
