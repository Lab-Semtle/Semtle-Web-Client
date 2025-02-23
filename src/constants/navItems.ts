import { ROUTES } from '@/constants/routes';

export const ABOUT_MENU = [
  {
    label: '학회 소개',
    href: ROUTES.ABOUT,
    desc: '아치셈틀은 어떤 학회일까요? 학회의 목표와 활동을 소개합니다.',
  },
  {
    label: '조직도',
    href: ROUTES.TEAM,
    desc: '아치셈틀을 운영하는 집행부 및 학회 구성원을 소개합니다.',
  },
  {
    label: '학회 연혁',
    href: ROUTES.HISTORY,
    desc: '아치셈틀의 발자취를 한눈에! 학회의 주요 활동 기록을 확인하세요.',
  },
];

export const ACTIVITY_MENU = [
  {
    label: '학회 활동',
    href: ROUTES.ACTIVITY_BOARD,
    desc: '아치셈틀의 최신 행사와 활동 소식을 만나보세요.',
  },
  {
    label: '프로젝트',
    href: ROUTES.PROJECT_BOARD,
    desc: '현재 진행 중인 프로젝트에 참여하고, 이전 기수의 프로젝트 결과를 확인할 수 있습니다.',
  },
  {
    label: '학회 일정',
    href: ROUTES.SCHEDULE,
    desc: '학회의 주요 일정과 이벤트를 확인할 수 있는 캘린더입니다.',
  },
];

export const RESOURCE_MENU = [
  {
    label: '학회 회칙',
    href: ROUTES.RULES,
    desc: '아치셈틀의 운영 규칙과 회칙을 확인하세요.',
  },
  {
    label: '족보',
    href: ROUTES.SECRET_BOARD,
    desc: '시험지 및 학습 자료, 공부 팁을 공유하는 공간입니다.',
  },
];

export const USER_MENU = [
  {
    label: '개인정보수정',
    href: ROUTES.PROFILE_SETUP,
    desc: '내 개인정보 및 계정 설정을 변경할 수 있습니다.',
  },
  {
    label: '마이페이지',
    href: ROUTES.PROFILE_MYPAGE,
    desc: '내 활동 내역과 정보를 한눈에 확인하세요.',
  },
  {
    label: '공홈관리시스템',
    href: ROUTES.EXECUTIVE,
    desc: '아치셈틀 공식 홈페이지를 관리하는 시스템입니다.',
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
