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
    image: '/images/semtle-web.png',
    category: '사이드프로젝트',
    relatedFields: ['Web'],
    title: '아치셈틀 웹페이지 Ver 1.0 구축',
    summary: '2025년 개발된 아치셈틀 신규 웹페이지 Ver 1.0',
    duration: '2024/09/20 ~ 2025/03/07',
    participants: 9,
    members: [
      '국태근(19)',
      '김아름(22)',
      '김민서(19)',
      '박상빈(20)',
      '박준영(24)',
      '신동혁(22)',
      '이서용(18)',
      '한태현(19)',
      '허태환(18)',
    ],
    result_url: 'https://github.com/Lab-Semtle',
    contents:
      '아치셈틀 학회 데이터 보존 및 운영자동화를 위해 만들어진 아치셈틀 공식 웹페이지 개발 프로젝트입니다!',
  },
];
