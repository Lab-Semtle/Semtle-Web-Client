import { NextResponse } from 'next/server';

// 더미 데이터 (목업 데이터)
const mockPosts = [
  {
    id: '1',
    projectTitle: 'AI 기반 추천 시스템 개발',
    startDate: '2025-03-01',
    endDate: '2025-06-30',
    contact: 'https://contact.example.com',
    categories: ['AI', 'Machine Learning', 'Web'],
    content:
      '이 프로젝트는 사용자 데이터를 분석하여 개인 맞춤형 추천 시스템을 구축하는 것을 목표로 합니다.',
    images: [
      'https://source.unsplash.com/random/400x400?technology',
      'https://source.unsplash.com/random/400x400?ai',
    ],
  },
  {
    id: '2',
    projectTitle: '메타버스 기반 협업 플랫폼',
    startDate: '2025-04-15',
    endDate: '2025-08-31',
    contact: 'https://collab.metaverse.com',
    categories: ['Metaverse', 'VR', 'Collaboration'],
    content:
      '메타버스를 활용한 협업 플랫폼을 개발하여 원격 근무 환경을 혁신하고자 합니다.',
    images: [
      'https://source.unsplash.com/random/400x400?vr',
      'https://source.unsplash.com/random/400x400?metaverse',
    ],
  },
];

// GET 요청 처리 (id 값에 따라 해당 게시물 반환)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, message: 'ID가 제공되지 않았습니다.' },
      { status: 400 },
    );
  }

  const post = mockPosts.find((p) => p.id === id);

  if (!post) {
    return NextResponse.json(
      { success: false, message: '게시물을 찾을 수 없습니다.' },
      { status: 404 },
    );
  }

  return NextResponse.json(post);
}
