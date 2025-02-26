/** 학회 일정 데이터 */

export interface ScheduleEventType {
  date: string;
  title: string;
  start: string;
  end: string; // end는 선택적 속성
  location: string;
  description: string;
}

export const ScheduleEvent: ScheduleEventType[] = [
  {
    date: '2025-02-10',
    title: '정기회의',
    start: '2025-02-10T12:30:00',
    end: '2025-02-12T13:30:00',
    location: '강의실 101호',
    description: '1월 정기회의 진행',
  },
  {
    date: '2025-02-15',
    title: '학회 프로젝트 발표',
    start: '2025-02-15T14:00:00',
    end: '2025-02-15T16:00:00',
    location: '컨퍼런스룸 A',
    description: '학회에서 진행한 프로젝트 결과 발표',
  },
];
