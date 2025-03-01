'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import GoUp from '@/components/common/GoUp';
import PageHeading from '@/components/common/PageHeading';
import ActivityCard2List from '@/components/card/ActivityCard2List';
import { useRouter } from 'next/navigation';
import { useFetchActivities } from '@/hooks/api/useFetchActivities';

/** 활동 게시판 페이지 */
export default function ActivityBoardPage() {
  const router = useRouter();
  const [category, setCategory] = useState('공지');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // React Query 기반 API 호출
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, error } =
    useFetchActivities(category);

  // 무한 스크롤 감지
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasNextPage) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) fetchNextPage();
        },
        { threshold: 1.0 },
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [hasNextPage, fetchNextPage],
  );

  // 스크롤 위치 감지하여 '맨 위로 가기' 버튼 표시
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activities = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <main className="flex flex-col items-center px-6 pb-32 pt-24">
      <PageHeading
        title="학회 활동"
        description="📅 우리 학회의 다양한 활동과 이벤트를 확인하세요!"
      />

      <div className="container mx-auto max-w-6xl px-2 pb-20">
        {/* 카테고리 선택 필터 */}
        <div className="mb-6 mt-4 flex justify-start px-24">
          <div className="rounded-lg shadow-lg">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="공지">공지</SelectItem>
                <SelectItem value="세미나">세미나</SelectItem>
                <SelectItem value="행사">행사</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 활동 리스트 렌더링 */}
        <ActivityCard2List
          posts={activities}
          loading={isLoading}
          error={!!error}
        />

        {/* 무한 스크롤 트리거 요소 */}
        <div ref={lastElementRef} className="h-10"></div>

        {/* 맨 위로 가기 버튼 */}
        <GoUp
          onClick={scrollToTop}
          className={`group fixed bottom-8 right-8 rounded-full bg-semtle-lite p-3 text-primary-foreground shadow-lg transition-all duration-300 hover:bg-semtle-dark dark:bg-semtle-dark dark:hover:bg-semtle-lite ${
            showScrollTop
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-10 opacity-0'
          }`}
        />
      </div>
    </main>
  );
}
