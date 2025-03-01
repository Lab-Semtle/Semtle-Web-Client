/** API 엔드포인트 경로 관리 */

const apiMode = process.env.NEXT_PUBLIC_API_BASE_URL_USE;
const baseUrl = (() => {
  switch (apiMode) {
    case 'next':
      return process.env.NEXT_PUBLIC_API_BASE_URL_NEXT;
    case 'prod':
      return process.env.NEXT_PUBLIC_API_BASE_URL_PROD;
    default:
      return process.env.NEXT_PUBLIC_API_BASE_URL_NEXT;
  }
})();

export const API_ROUTES = {
  HEALTH: `${baseUrl}/health`, // 서버 상태 테스트

  /** 계정 */
  AUTH_USER_SIGNIN: `${baseUrl}/api/v1/auth/signin`, // 로그인
  AUTH_MANAGER_SIGNIN: `${baseUrl}/api/v1/auth/password/manager`, // 관리자 로그인(관리자 인증)
  AUTH_USER_PASSWORD_RESET: `${baseUrl}/api/v1/auth/password/reset`, // 비밀번호 수정
  AUTH_USER_PASSWORD_EMAIL: `${baseUrl}/api/v1/auth/password/reset/email`, // 비밀번호 재설정 이메일 발송

  /** 배너 */
  CREATE_BANNERS: `${baseUrl}/api/v1/index/banners`, // 배너 추가
  DELETE_BANNERS: (id: number) => `${baseUrl}/api/v1/index/banners/${id}`, // 배너 삭제 (동적 경로)
  GET_BANNERS: `${baseUrl}/api/v1/index/banners`, // 배너 조회

  /** 아카이브 */
  CREATE_ARCHIVE: `${baseUrl}/api/v1/archive`, // 새로운 아카이브 생성
  UPDATE_ARCHIVE: (id: number) => `${baseUrl}/api/v1/archive/${id}`, // 특정 아카이브 수정
  DELETE_ARCHIVE: (id: number) => `${baseUrl}/api/v1/archive/${id}`, // 특정 아카이브 삭제
  GET_ARCHIVE_DETAIL: (id: number) => `${baseUrl}/api/v1/archive/${id}`, // 특정 아카이브 조회
  GET_ARCHIVE_LIST: (page: number, size: number, search_keyword?: string) =>
    `${baseUrl}/api/v1/archive?page=${page}&size=${size}${
      search_keyword
        ? `&search_keyword=${encodeURIComponent(search_keyword)}`
        : ''
    }`, // 아카이브 목록 조회

  /** 활동 */
  CREATE_ACTIVITY: `${baseUrl}/api/v1/activity`, // 활동 게시물 추가
  UPDATE_ACTIVITY: (id: number) => `${baseUrl}/api/v1/activity/${id}`, // 활동 게시물 수정
  DELETE_ACTIVITY: (id: number) => `${baseUrl}/api/v1/activity/${id}`, // 활동 게시물 삭제
  GET_ACTIVITY_DETAIL: (id: number) => `${baseUrl}/api/v1/activity/${id}`, // 특정 활동 게시물 조회
  GET_ACTIVITY_LIST: (page: number, size: number, type?: string) =>
    `${baseUrl}/api/v1/activity?page=${page}&size=${size}${
      type && type !== 'all' ? `&type=${type}` : ''
    }`, // 활동 게시물 목록 조회
  GET_ACTIVITY_RECENT: (limit: number) =>
    `${baseUrl}/api/v1/activity/recent?limit=${limit}`, // 최근 활동 게시물 조회

  /** 프로젝트 성과 */
  CREATE_PROMOTIONS: `${baseUrl}/api/v1/promotions`, // 프로모션 추가
  UPDATE_PROMOTION: (promotionId: number) =>
    `${baseUrl}/api/v1/promotions/${promotionId}`, // 프로모션 수정
  DELETE_PROMOTION: (promotionId: number) =>
    `${baseUrl}/api/v1/promotions/${promotionId}`, // 프로모션 삭제
  GET_PROMOTION_DETAIL: (promotionId: number) =>
    `${baseUrl}/api/v1/promotions/${promotionId}`, // 특정 프로모션 조회
  GET_PROMOTION_LIST: (keyword?: string, page: number = 1, size: number = 10) =>
    `${baseUrl}/api/v1/promotions?page=${page}&size=${size}${
      keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''
    }`, // 프로모션 목록 조회

  /** 프로젝트 공고 */
  CREATE_PROJECT: `${baseUrl}/api/v1/projectboard/write`, // 프로젝트 공고 생성
  UPDATE_PROJECT: (projectBoardId: number) =>
    `${baseUrl}/api/v1/projectboard/update/${projectBoardId}`, // 프로젝트 공고 수정
  DELETE_PROJECT: (projectBoardId: number) =>
    `${baseUrl}/api/v1/projectboard/${projectBoardId}`, // 프로젝트 공고 삭제
  GET_PROJECT_DETAIL: (projectBoardId: number) =>
    `${baseUrl}/api/v1/projectboard/${projectBoardId}`, // 특정 프로젝트 공고 조회
  GET_PROJECT_LIST: (
    page: number,
    size: number,
    projectType?: string,
    relationType?: string,
  ) =>
    `${baseUrl}/api/v1/projectboard?page=${page}&size=${size}${
      projectType ? `&project_type=${encodeURIComponent(projectType)}` : ''
    }${relationType ? `&relation_type=${encodeURIComponent(relationType)}` : ''}`, // 프로젝트 목록 조회
  APPLY_PROJECT: (postId: number, id: number) =>
    `${baseUrl}/api/v1/projects/${postId}/apply/${id}`, // 프로젝트 지원

  /** 유저 */
  CREATE_MEMBER: `${baseUrl}/api/v1/members`, // 임시 멤버 추가
  SIGNUP_MEMBER: `${baseUrl}/api/v1/members/signup`, // 회원가입
  UPDATE_MEMBER: (uuid: string) => `${baseUrl}/api/v1/members/${uuid}`, // 멤버 정보 수정
  UPDATE_MEMBER_ACTIVE: (uuid: string) =>
    `${baseUrl}/api/v1/members/${uuid}/deactivate`, // 멤버 비활성화(정지)
  GET_MEMBER_DETAIL: (uuid: string) => `${baseUrl}/api/v1/members/${uuid}`, // 특정 멤버 조회
  GET_MEMBER_LIST: (page: number, size: number, search_name?: string) =>
    `${baseUrl}/api/v1/members?page=${page}&size=${size}${
      search_name ? `&search_name=${encodeURIComponent(search_name)}` : ''
    }`, // 유저 목록 조회

  /** 마이페이지 */
  GET_MY_PROJECT_APPLICANTS_LIST: (postId: number) =>
    `${baseUrl}/api/v1/own/projects/${postId}/applicants`, // (본인이 게시한) 프로젝트 공고 신청자 리스트 조회
  GET_MY_PROJECT_DETAIL: (postId: number, id: number) =>
    `${baseUrl}/api/v1/own/projects/${postId}/applicants/${id}`, // (본인이 게시한) 프로젝트 공고 신청자 정보 조회
  UPDATE_MY_PROJECT_DETAIL: (postId: number, id: number) =>
    `${baseUrl}/api/v1/own/projects/${postId}/applicants/${id}`, // (본인이 게시한) 프로젝트 공고 신청자 정보 수정
  GET_APPLICATION_PROJECT_LIST: `${baseUrl}/api/v1/own/projects/applications`, // (본인이 신청한) 프로젝트 공고 목록 조회
  GET_MY_ARCHIVES: (page: number, size: number, uuid: string) =>
    `${baseUrl}/api/v1/own/archives?page=${page}&size=${size}&uuid=${encodeURIComponent(uuid)}`, // 개인 아카이브 목록 조회
  GET_MY_PROMOTIONS: (page: number, size: number) =>
    `${baseUrl}/api/v1/own/promotions?page=${page}&size=${size}`, // 개인 프로모션 목록 조회
  // 개인 프로젝트 목록 X

  /** 프로젝트 타입 카테고리 */
  GET_PROJECT_TYPE_CATEGORY: `${baseUrl}/api/v1/projecttypecategory/categorylist`, // 프로젝트 타입 카테고리 조회

  /** NCP */
  // Cloudflare R2 파일 다운로드
  GET_NCP_SIGNED_URL: '/api/files-id', // NCP Presigned URL 요청 (POST)

  // Cloudflare R2 파일 업로드
  UPLOAD_CLOUDFLARE_FILE: `/api/file/upload`,
} as const;
