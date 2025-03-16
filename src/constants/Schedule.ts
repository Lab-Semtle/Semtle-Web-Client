export interface ScheduleEventType {
  date: string;
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
}

export const ScheduleEvent: ScheduleEventType[] = [
  {
    date: '2025-03-11',
    title: '개강총회',
    start: '2025-03-11T15:00:00',
    end: '2025-03-11T17:00:00',
    location: '공대1관 387호',
    description: '2025학년도 아치셈틀 개강총회 진행',
  },
  {
    date: '2025-04-10',
    title: '세미나',
    start: '2025-04-10T17:00:00',
    end: '2025-04-10T18:00:00',
    location: '공대1관 387호',
    description: '세미나 계획 중',
  },
  {
    date: '2025-04-22',
    title: '중간고사',
    start: '2025-04-22T09:00:00',
    end: '2025-04-26T18:00:00',
    location: '각 강의실',
    description: '중간고사 기간',
  },
  {
    date: '2025-05-03',
    title: 'MT',
    start: '2025-05-03T10:00:00',
    end: '2025-05-04T15:00:00',
    location: '지리산 청소년 수련원',
    description: '2025학년도 아치셈틀 MT',
  },
  {
    date: '2025-05-16',
    title: 'E-sports 대회',
    start: '2025-05-16T18:00:00',
    end: '2025-05-16T20:00:00',
    location: '하리',
    description: '학회원 대상 E-sports 대회 개최',
  },
  {
    date: '2025-06-05',
    title: '종강총회',
    start: '2025-06-05T15:00:00',
    end: '2025-06-05T17:00:00',
    location: '공대1관 387호',
    description: '학기 마무리 종강총회 진행',
  },
  {
    date: '2025-06-09',
    title: '세미나',
    start: '2025-06-09T18:00:00',
    end: '2025-06-09T20:00:00',
    location: '공대1관 387호',
    description: '학회원들을 위한 기술 세미나 진행',
  },
  {
    date: '2025-06-16',
    title: '기말고사 간식사업',
    start: '2025-06-16T12:00:00',
    end: '2025-06-16T14:00:00',
    location: '공대 1관 306호',
    description: '기말고사 기간 중 학회원 간식 지원',
  },
  {
    date: '2025-06-16',
    title: '기말고사 & 종강',
    start: '2025-06-16T09:00:00',
    end: '2025-06-20T18:00:00',
    location: '각 강의실',
    description: '기말고사 기간 및 종강',
  },
];
