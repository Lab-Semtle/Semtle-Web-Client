export const aboutMenuItems = [
  {
    label: '학회 소개',
    href: '/about',
    desc: '테스트',
  },
  {
    label: '조직도',
    href: '/about/team',
    desc: '테스트',
  },
  {
    label: '학회 연혁',
    href: '/about/history',
    desc: '테스트',
  },
];

export const activityMenuItems = [
  {
    label: '학회 활동',
    href: '/activity',
    desc: '테스트',
  },
  {
    label: '프로젝트',
    href: '/activity/project',
    desc: '테스트',
  },
  {
    label: '학회 일정',
    href: '/activity/schedule',
    desc: '테스트',
  },
];

export const resourceMenuItems = [
  {
    label: '학회 회칙',
    href: '/resource/rules',
    desc: '테스트',
  },
  {
    label: '족보',
    href: '/resource/secret',
    desc: '테스트',
  },
];

export const userMenuItems = [
  {
    label: '개인정보수정',
    href: '/profile/setup',
    desc: '테스트',
  },
  {
    label: '마이페이지',
    href: '/profile/mypage',
    desc: '테스트',
  },
  {
    label: '공홈관리시스템',
    href: '/admin',
    desc: '테스트',
  },
];

export const navigationMenuItems = [
  {
    label: '아치 셈틀',
    items: aboutMenuItems,
  },
  {
    label: '학회 활동',
    items: activityMenuItems,
  },
  {
    label: '학회 자료실',
    items: resourceMenuItems,
  },
  {
    label: '사용자 메뉴',
    items: userMenuItems,
  },
];
