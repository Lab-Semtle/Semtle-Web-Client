/** API 엔드포인트 경로 모음 */

export const API_ROUTES = {
  TEST: '/api/test',
  SIGN_IN: '/api/auth/signin',
  GET_RECENT_ACTIVITY_BASE: '/index/activity/recent',
} as const;

// 동적 경로 처리
export const GET_RECENT_ACTIVITY = (limit: number) =>
  `${API_ROUTES.GET_RECENT_ACTIVITY_BASE}?limit=${limit}`;
