import { NextResponse } from 'next/server';

const mockActivities = [
  {
    board_id: 1,
    title: '2025 신입생 환영 MT',
    content:
      '신입생들과 함께하는 친목 도모 MT! 다양한 활동과 게임이 준비되어 있습니다.',
    writer: '학회 운영진',
    createdAt: '2025-03-10',
    images: [
      '/temp-server/sample-1.jpg',
      '/temp-server/sample-2.jpg',
      '/temp-server/sample-3.jpg',
    ],
    type: '행사',
  },
  {
    board_id: 2,
    title: '봄 학기 개강 총회',
    content:
      '새 학기를 맞이하여 학회 운영 계획과 활동을 소개하는 시간을 가집니다.',
    writer: '학회 회장',
    createdAt: '2025-03-05',
    images: ['/temp-server/sample-2.jpg'],
    type: '공지',
  },
  {
    board_id: 3,
    title: '2025 체육대회 개최',
    content: '다양한 종목으로 함께 즐기며 친목을 다지는 학회 체육대회!',
    writer: '체육부',
    createdAt: '2025-03-01',
    images: ['/temp-server/sample-3.jpg'],
    type: '행사',
  },
  {
    board_id: 4,
    title: '홈커밍데이 - 선배들과의 만남',
    content: '졸업한 선배님들과의 네트워킹, 진로 상담의 기회를 놓치지 마세요!',
    writer: '졸업생 연합',
    createdAt: '2025-02-28',
    images: ['/temp-server/sample-4.jpg'],
    type: '행사',
  },
  {
    board_id: 5,
    title: '봄맞이 벚꽃 나들이',
    content: '따뜻한 봄날, 학회원들과 함께하는 벚꽃 나들이!',
    writer: '기획팀',
    createdAt: '2025-02-25',
    images: ['/temp-server/sample-5.jpg'],
    type: '행사',
  },
  {
    board_id: 6,
    title: 'AI & 데이터 사이언스 세미나',
    content: '데이터 사이언스와 AI 트렌드, 실제 프로젝트 사례를 소개합니다.',
    writer: 'AI 연구팀',
    createdAt: '2025-02-22',
    images: ['/temp-server/sample-6.jpg'],
    type: '세미나',
  },
  {
    board_id: 7,
    title: '웹 개발 워크숍 (React & Next.js)',
    content: '프론트엔드 개발을 배우고 실습할 수 있는 기회!',
    writer: '웹 개발팀',
    createdAt: '2025-02-20',
    images: ['/temp-server/sample-7.jpg'],
    type: '세미나',
  },
  {
    board_id: 8,
    title: '프로그래밍 대회 수상 후기',
    content:
      '우리 학회 팀이 전국 프로그래밍 대회에서 우승한 경험을 공유합니다!',
    writer: '대회 참가팀',
    createdAt: '2025-02-18',
    images: ['/temp-server/sample-1.jpg'],
    type: '기타',
  },
  {
    board_id: 9,
    title: '스승의 날 감사 이벤트',
    content: '학회원들이 함께 준비한 스승의 날 감사 행사!',
    writer: '운영진',
    createdAt: '2025-02-15',
    images: ['/temp-server/sample-1.jpg'],
    type: '행사',
  },
  {
    board_id: 10,
    title: '개발자 커뮤니티 네트워킹 파티',
    content: '다양한 개발자들과 네트워킹을 형성하는 자리!',
    writer: '커뮤니티 팀',
    createdAt: '2025-02-12',
    images: ['/temp-server/sample-1.jpg'],
    type: '행사',
  },
  {
    board_id: 11,
    title: '학회원 프로젝트 발표회',
    content: '학회원들이 진행한 프로젝트를 공유하고 피드백을 받는 자리입니다.',
    writer: '학회 기획팀',
    createdAt: '2025-02-10',
    images: ['/temp-server/sample-1.jpg'],
    type: '세미나',
  },
  {
    board_id: 12,
    title: '스타트업 창업 특강',
    content: '창업을 준비하는 학생들을 위한 실전 스타트업 강연!',
    writer: '창업팀',
    createdAt: '2025-02-08',
    images: ['/temp-server/sample-1.jpg'],
    type: '세미나',
  },
  {
    board_id: 13,
    title: '겨울방학 스터디 그룹 모집',
    content:
      '학회원들과 함께 겨울방학 동안 집중적으로 공부할 스터디 그룹을 모집합니다.',
    writer: '스터디 운영진',
    createdAt: '2025-02-05',
    images: ['/temp-server/sample-1.jpg'],
    type: '공지',
  },
  {
    board_id: 14,
    title: '모바일 앱 개발 캠프',
    content: 'React Native를 활용한 모바일 앱 개발 실습 캠프!',
    writer: '모바일 개발팀',
    createdAt: '2025-02-02',
    images: ['/temp-server/sample-1.jpg'],
    type: '세미나',
  },
  {
    board_id: 15,
    title: '알고리즘 스터디 모집',
    content: '매주 모여서 알고리즘 문제를 함께 풀고 토론하는 스터디입니다.',
    writer: '알고리즘 팀',
    createdAt: '2025-01-30',
    images: ['/temp-server/sample-1.jpg'],
    type: '기타',
  },
  {
    board_id: 16,
    title: 'IT 커리어 개발 특강',
    content: 'IT 업계 현직자가 들려주는 취업 및 커리어 개발 이야기!',
    writer: '커리어 팀',
    createdAt: '2025-01-27',
    images: [],
    type: '기타',
  },
];

// API 핸들러
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const size = parseInt(searchParams.get('size') || '5', 10);
    const type = searchParams.get('type') || '전체';

    console.log(`[API 요청] page: ${page}, size: ${size}, type: ${type}`);

    // 카테고리 필터링
    let filteredActivities =
      type === '전체'
        ? mockActivities
        : mockActivities.filter((activity) => activity.type === type);

    const totalPosts = filteredActivities.length;
    const totalPages = Math.ceil(totalPosts / size);

    // 페이지네이션 적용
    const startIndex = (page - 1) * size;
    const pagedActivities = filteredActivities.slice(
      startIndex,
      startIndex + size,
    );

    console.log(`[API 응답] 총 게시물 수: ${totalPosts}, 현재 페이지: ${page}`);

    return NextResponse.json({
      success: true,
      message: '활동 게시물 목록 읽어오기 성공',
      data: {
        total_post: totalPosts,
        current_page: page,
        total_pages: totalPages,
        posts: pagedActivities,
      },
      error: null,
    });
  } catch (error) {
    console.error('[API 오류]', error);
    return NextResponse.json(
      { success: false, message: '서버 내부 오류', data: null, error },
      { status: 500 },
    );
  }
}
