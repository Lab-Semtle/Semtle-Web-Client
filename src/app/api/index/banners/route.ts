/** Mock API - 배너 데이터 반환 */
import { NextResponse } from 'next/server';

// 배너 목록 조회
export async function GET() {
  try {
    // 목업 데이터
    const banners = [
      {
        bannerId: 1,
        imagePath: '/temp-server/event-1.jpg',
        targetPath: '/activities/1',
        altText: 'MT 포스터',
        postTitle: '2025 MT',
        createdAt: '2025-02-05T12:00:00Z',
      },
      {
        bannerId: 2,
        imagePath: '/temp-server/event-2.png',
        targetPath: '/activities/2',
        altText: '간식사업 포스터',
        postTitle: '학회 중간고사 간식사업',
        createdAt: '2025-02-04T10:30:00Z',
      },
      {
        bannerId: 3,
        imagePath: '/temp-server/event-3.png',
        targetPath: '/projects/hire/1',
        altText: '경진대회 포스터',
        postTitle: '학회 경진대회 참여자 모집',
        createdAt: '2025-02-04T10:30:00Z',
      },
      {
        bannerId: 4,
        imagePath: '/temp-server/event-4.png',
        targetPath: '/activities/3',
        altText: '체육대회 포스터',
        postTitle: '2025 체육대회 개최',
        createdAt: '2025-02-04T10:30:00Z',
      },
    ];

    return NextResponse.json({ banners }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
