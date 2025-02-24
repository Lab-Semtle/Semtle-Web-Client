/** API 엔드포인트 경로 모음 */
// 목업 : /api/~
// 벡엔드 : /~

export const API_ROUTES = {
  TEST: '/api/test',
  AUTH_SIGNIN: '/api/auth/signin', // 로그인
  GET_RECENT_ACTIVITY_BASE: '/api/index/activity/recent', // 최근 활동게시물 조회
} as const;

// 동적 경로 처리
export const GET_RECENT_ACTIVITY = (limit: number) =>
  `${API_ROUTES.GET_RECENT_ACTIVITY_BASE}?limit=${limit}`;
