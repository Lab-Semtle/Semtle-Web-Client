export type ShowcaseDetail = {
  id: number;
  image?: string;
  category: string;
  relatedFields?: string[];
  title: string;
  summary?: string;
  duration?: string;
  participants?: number;
  members: string[]; // 참여 인원 리스트
  result_url?: string; // 결과물 링크
  contents: string; // 프로젝트 설명
};

export const SHOWCASE_DATA: ShowcaseDetail[] = [
  {
    id: 1,
    image: '',
    category: '해커톤',
    relatedFields: ['Web', 'DATA'],
    title: '오데고: 부산 관광 홍보 AI 챗봇 서비스',
    summary:
      '전이학습된 LLM과 Langchain을 활용한 부산 관광정보 제공 AI 챗봇 서비스',
    duration: '2024/02/01 ~ 2024/06/01',
    participants: 5,
    members: ['김철수', '이민호', '박지수', '정윤아', '최동혁'], // 참여 인원 추가
    result_url: 'https://github.com/example/project1',
    contents: '이 프로젝트는 AI 기반 관광 챗봇을 개발하는 것입니다...',
  },
  {
    id: 2,
    image: '',
    category: '경진대회',
    relatedFields: ['Mobile', 'IOS'],
    title: '해수꾼: 해상 유류 유출 실시간 모니터링 애플리케이션',
    summary:
      '무인 보트와 탁도 센서를 활용해 실시간 해상 오염을 모니터링하는 모바일 애플리케이션',
    duration: '2024/09/01 ~ 2024/12/28',
    participants: 7,
    members: [
      '이영희',
      '김진수',
      '송민정',
      '박현우',
      '정유진',
      '최성민',
      '강다현',
    ],
    result_url: 'https://github.com/example/project2',
    contents: '이 프로젝트는 무인 보트를 활용한 해양 오염 모니터링입니다...',
  },
  {
    id: 3,
    image: '',
    category: '사이드프로젝트',
    relatedFields: ['Web'],
    title: '아치셈틀 웹페이지 Ver 1.0 구축',
    summary: '2025년 개발된 아치셈틀 신규 웹페이지 Ver 1.0',
    duration: '2024/09/20 ~ 2025/03/07',
    participants: 3,
    members: ['박민수', '김나영', '정석훈'], // 기존 author 값을 members 배열로 변경
    result_url: 'https://github.com/example/project3',
    contents: '아치셈틀 웹페이지를 구축하여 학회 운영을 도울 것입니다...',
  },
];
