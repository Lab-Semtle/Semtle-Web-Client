import type { TimelineElement } from '@/types/timeline';

export const TimelineData: TimelineElement[] = [
  {
    id: 1,
    title: '2025 아치셈틀 OT',
    date: '2025-06-01',
    summary: '2025년도 아치셈틀 오리엔테이션',
    description: '',
    imageUrl: '/images/kmou_2023_spring.jpg',
  },
].map((item) => ({
  ...item,
  imageUrl: item.imageUrl || '/images/semtle_logo_sqare_while.jpg',
}));

export type TimelineData = TimelineElement;
