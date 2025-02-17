import { ROUTES } from '@/constants/routes';

export const ABOUT_MENU = [
  {
    label: '학회 소개',
    href: ROUTES.ABOUT,
    desc: '테스트',
  },
  {
    label: '조직도',
    href: ROUTES.TEAM,
    desc: '테스트',
  },
  {
    label: '학회 연혁',
    href: ROUTES.HISTORY,
    desc: '테스트',
  },
];

export const ACTIVITY_MENU = [
  {
    label: '학회 활동',
    href: ROUTES.ACTIVITY_BOARD,
    desc: '테스트',
  },
  {
    label: '프로젝트',
    href: ROUTES.PROJECT_BOARD,
    desc: '테스트',
  },
  {
    label: '학회 일정',
    href: ROUTES.SCHEDULE,
    desc: '테스트',
  },
];

export const RESOURCE_MENU = [
  {
    label: '학회 회칙',
    href: ROUTES.RULES,
    desc: '테스트',
  },
  {
    label: '족보',
    href: ROUTES.SECRET_BOARD,
    desc: '테스트',
  },
];

export const USER_MENU = [
  {
    label: '개인정보수정',
    href: ROUTES.PROFILE_SETUP,
    desc: '테스트',
  },
  {
    label: '마이페이지',
    href: ROUTES.PROFILE_MYPAGE,
    desc: '테스트',
  },
  {
    label: '공홈관리시스템',
    href: ROUTES.EXECUTIVE,
    desc: '테스트',
  },
];

export const NAVIGATION_MENU = [
  {
    label: '학회 소개',
    items: ABOUT_MENU,
  },
  {
    label: '학회 활동',
    items: ACTIVITY_MENU,
  },
  {
    label: '학회 자료실',
    items: RESOURCE_MENU,
  },
  {
    label: '사용자 메뉴',
    items: USER_MENU,
  },
];
