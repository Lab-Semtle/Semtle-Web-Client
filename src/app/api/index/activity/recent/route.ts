import { NextRequest, NextResponse } from 'next/server';

const recentPosts = [
  {
    board_id: 1,
    title: '멀티모달 논문 세미나 개최',
    content:
      '이번 세미나에서는 최근 AI 연구에서 주목받고 있는 멀티모달 학습을 주제로 진행되었습니다. 자연어, 영상, 오디오 데이터를 통합적으로 활용하는 최신 논문을 분석하고 실습을 통해 적용 가능성을 탐색하는 시간을 가졌습니다.',
    writer: 'AI 연구팀',
    createdAt: '2025-02-15',
    images: ['/temp-server/seminar-1.png'],
    type: '세미나',
  },
  {
    board_id: 2,
    title: '2024년 아치셈틀 MT 대작전',
    content:
      '이번 동계 MT에서는 팀워크 강화 활동과 다양한 레크리에이션 프로그램을 통해 학회원들 간의 유대감을 형성할 수 있었습니다. 또한, 학술 토론 세션도 함께 진행되어 의미 있는 시간을 가졌습니다.',
    writer: '운영팀',
    createdAt: '2025-02-10',
    images: ['/images/semtle2022/MT-2022-31.jpeg'],
    type: '행사',
  },
  {
    board_id: 3,
    title: '스승의 날 행사 개최',
    content:
      '스승의 날을 맞아 교수님들과 함께하는 감사 행사를 진행했습니다. 학회원들은 직접 준비한 편지와 선물을 전달하며, 지도 교수님들께 감사의 마음을 전하는 뜻깊은 시간을 가졌습니다.',
    writer: '학회장',
    createdAt: '2025-02-05',
    images: ['/images/semtle2022/TeachersDay-2022-3.jpeg'],
    type: '기타',
  },
];

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    message: '최근 활동 게시물 목록 읽어오기 성공',
    data: {
      total_post: recentPosts.length,
      current_page: 1,
      total_pages: 1,
      posts: recentPosts,
    },
  });
}
