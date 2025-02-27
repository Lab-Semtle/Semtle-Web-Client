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
  GET_ACTIVITIES_POSTS: `${baseUrl}/activities`, // 활동 게시판 목록 조회
  POST_ACTIVITIES_POSTS: `${baseUrl}/activities`,
} as const;

// 동적 경로 처리
export const GET_RECENT_ACTIVITY = (limit: number) =>
  `${API_ROUTES.GET_RECENT_ACTIVITY_BASE}?limit=${limit}`;

export const GET_ACTIVITIES = (page: number, size: number, type?: string) =>
  `${API_ROUTES.GET_ACTIVITIES_POSTS}?page=${page}&size=${size}${
    type && type !== 'all' ? `&type=${type}` : ''
  }`;

// export const API_ROUTES = {
//   /** 족보 */
//   GET_ARCHIVE_POST: (id: string) => `${baseUrl}/api/v1/archive/${id}`, // 족보 게시물 조회
//   PUT_ARCHIVE_POST: (id: string) => `${baseUrl}/api/v1/archive/${id}`, // 족보 게시물 수정
//   DELETE_ARCHIVE_POST: (id: string) => `${baseUrl}/api/v1/archive/${id}`, // 족보 게시물 삭제
//   GET_ARCHIVE_BOARD: `${baseUrl}/api/v1/archive`, // 족보 게시판 조회
//   POST_ARCHIVE_POST: `${baseUrl}/api/v1/archive`, // 족보 게시물 생성

//   /** 활동 게시판 */
//   GET_ACTIVITY_POST: (id: string) => `${baseUrl}/api/v1/activity/${id}`, // 활동 게시물 조회
//   PUT_ACTIVITY_POST: (id: string) => `${baseUrl}/api/v1/activity/${id}`, // 활동 게시물 수정
//   DELETE_ACTIVITY_POST: (id: string) => `${baseUrl}/api/v1/activity/${id}`, // 활동 게시물 삭제
//   GET_ACTIVITY_BOARD: `${baseUrl}/api/v1/activity`, // 활동 게시판 조회
//   POST_ACTIVITY_POST: `${baseUrl}/api/v1/activity`, // 활동 게시물 생성
//   GET_ACTIVITY_BOARD_RECENT: `${baseUrl}/api/v1/activity/recent`, // 최근 활동 게시판 조회

//   /** 프로모션 */
//   GET_PROMOTIONS_BOARD: `${baseUrl}/promotions`, // 프로젝트 홍보 게시판 조회
//   POST_PROMOTION_POST: `${baseUrl}/promotions`, // 프로젝트 홍보 게시물 생성
//   GET_PROMOTION_POST: (promotionId: string) =>
//     `${baseUrl}/promotions/${promotionId}`, // 프로젝트 홍보 게시물 조회
//   DELETE_PROMOTION_POST: (promotionId: string) =>
//     `${baseUrl}/promotions/${promotionId}`, // 프로젝트 홍보 게시물 삭제
//   PATCH_PROMOTION_POST: (promotionId: string) =>
//     `${baseUrl}/promotions/${promotionId}`, // 프로젝트 홍보 게시물 수정

//   /** 인증, 사용자 */
//   POST_SIGNIN: `${baseUrl}/auth/signin`, // 로그인
//   POST_MEMBERS: `${baseUrl}/api/v1/members`, // (관리자 전용) 일괄 회원가입
//   GET_MEMBER: (uuid: string) => `${baseUrl}/api/v1/members/${uuid}`, // 개인정보 조회
//   PATCH_MEMBER: (uuid: string) => `${baseUrl}/api/v1/members/${uuid}`, // 개인정보 수정

//   /** 프로젝트 지원 */
//   POST_APPLY_PROJECT: (postId: string, id: string) =>
//     `${baseUrl}/api/v1/projects/${postId}/apply/${id}`, // 프로젝트 공고 신청

//   /** 프로젝트 게시판 */
//   POST_PROJECT_POST: `${baseUrl}/api/v1/projectboard/write`, // 프로젝트 공고 게시물 생성
//   UPDATE_PROJECT_BOARD: (projectBoardId: string) =>
//     `${baseUrl}/api/v1/projectboard/update/${projectBoardId}`, // 프로젝트 공고 게시물 수정
//   GET_PROJECT_BOARD: `${baseUrl}/api/v1/projectboard`, // 프로젝트 공고 게시판 조회
//   GET_PROJECT_POST: (projectBoardId: string) =>
//     `${baseUrl}/api/v1/projectboard/${projectBoardId}`, // 프로젝트 공고 게시물 조회
//   DELETE_PROJECT_POST: (projectBoardId: string) =>
//     `${baseUrl}/api/v1/projectboard/${projectBoardId}`, // 프로젝트 공고 게시물 삭제
//   GET_PROJECT_BOARD_LIST: `${baseUrl}/api/v1/projectboard/projectboardlist`,
//   GET_PROJECT_BOARD_ITEM: (projectBoardId: string) =>
//     `${baseUrl}/api/v1/projectboard/projectboardlist/${projectBoardId}`,

//   /** 메인 배너 */
//   GET_BANNERS: `${baseUrl}/api/v1/index/banners`, // 배너 목록 조회
//   POST_BANNERS: `${baseUrl}/api/v1/index/banners`, // 배너 생성
//   DELETE_BANNER: (bannerId: string) =>
//     `${baseUrl}/api/v1/index/banners/${bannerId}`, // 배너 삭제

//   /** 프로젝트 지원 */
//   GET_MYPROJECT_USER_INFO: (postId: string, id: string) =>
//     `${baseUrl}/api/v1/own/projects/${postId}/applicants/${id}`, // 내 프로젝트 신청자 정보 조회
//   PATCH_MYPROJECT_USER_STATUS: (postId: string, id: string) =>
//     `${baseUrl}/api/v1/own/projects/${postId}/applicants/${id}`, // 본인이 게시한 프로젝트 신청자 상태 변경
//   GET_MYPROJECT_USER_LIST: (postId: string) =>
//     `${baseUrl}/api/v1/own/projects/${postId}/applicants`, // 내 프로젝트 신청자 목록 조회
//   GET_MYPROJECT_APPLICATION: (id: string) =>
//     `${baseUrl}/api/v1/own/projects/applications/${id}`, // 본인이 신청한 프로젝트 목록

//   /** 마이페이지 */
//   GET_MYPROMOTION_BOARD: `${baseUrl}/own/promotions`, // 본인이 게시한 홍보 게시판 조회
//   GET_MYSECRET_BOARD: `${baseUrl}/own/archives`, // 본인이 게시한 족보 게시판 조회
//   GET_HEALTH: `${baseUrl}/health`, // 테스트

//   /** 프로젝트 타입 카테고리 */
//   GET_PROJECT_TYPE_CATEGORIES: `${baseUrl}/api/v1/projecttypecategory/categorylist`,
// } as const;

// // 동적 경로 처리
// export const GET_RECENT_ACTIVITY = (limit: number) =>
//   `${API_ROUTES.GET_ACTIVITY_BOARD_RECENT}?limit=${limit}`;

// export const GET_ACTIVITIES = (page: number, size: number, type?: string) =>
//   `${API_ROUTES.GET_ACTIVITY_BOARD}?page=${page}&size=${size}${
//     type && type !== 'all' ? `&type=${type}` : ''
//   }`;
