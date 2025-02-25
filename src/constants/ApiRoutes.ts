/** API 엔드포인트 경로 관리 */

const apiMode = process.env.NEXT_PUBLIC_API_BASE_URL_USE;
const baseUrl = (() => {
  switch (apiMode) {
    case 'next':
      return process.env.NEXT_PUBLIC_API_BASE_URL_NEXT;
    case 'spring':
      return process.env.NEXT_PUBLIC_API_BASE_URL_SPRING;
    case 'prod':
      return process.env.NEXT_PUBLIC_API_BASE_URL_PROD;
    default:
      return process.env.NEXT_PUBLIC_API_BASE_URL_NEXT;
  }
})();

export const API_ROUTES = {
  AUTH_SIGNIN: `${baseUrl}/auth/signin`, // 로그인
  GET_BANNERS: `${baseUrl}/index/banners`, // 메인 배너 조회
  GET_RECENT_ACTIVITY_BASE: `${baseUrl}/index/activity/recent`, // 최근 활동 게시물 조회
} as const;

// 동적 경로 처리
export const GET_RECENT_ACTIVITY = (limit: number) =>
  `${API_ROUTES.GET_RECENT_ACTIVITY_BASE}?limit=${limit}`;
