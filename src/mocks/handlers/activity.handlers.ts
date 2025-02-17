import { HttpResponse, http } from 'msw';

interface ActivityPost {
  id: number;
  title: string;
  summary: string;
  createdAt: string;
}

// 목업 데이터
const recentPosts: ActivityPost[] = [
  {
    id: 1,
    title: '학회 워크샵 성황리 종료',
    summary: '이번 워크샵은 다양한 주제 발표와 네트워킹...',
    createdAt: '2025-02-05T12:00:00Z',
  },
  {
    id: 2,
    title: 'AI 연구 세미나 개최 안내',
    summary: '최신 AI 기술 동향을 다룰 이번 세미나는...',
    createdAt: '2025-02-03T10:30:00Z',
  },
  {
    id: 3,
    title: '봄 학기 신규 프로젝트 모집',
    summary: '이번 학기에는 총 5개의 프로젝트가 운영될 예정...',
    createdAt: '2025-02-01T09:00:00Z',
  },
];

// GET 요청을 처리하는 목업 핸들러
export const activityHandlers = [
  http.get('/index/activity/recent', ({ request }) => {
    const url = new URL(request.url);
    console.log('[MSW] 요청됨:', url.pathname); // 요청이 정상적으로 가로채졌는지 확인

    if (!url.pathname.endsWith('/index/activity/recent')) {
      console.warn('[MSW] 잘못된 요청:', url.pathname);
      return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
    }

    const limit = url.searchParams.get('limit');
    const posts = limit ? recentPosts.slice(0, Number(limit)) : recentPosts;

    console.log('[MSW] 반환된 데이터:', posts);

    return HttpResponse.json(
      {
        status: 200,
        code: 'SUCCESS',
        data: {
          posts,
        },
      },
      { status: 200 }, // HTTP 상태 코드 설정
    );
  }),
];
