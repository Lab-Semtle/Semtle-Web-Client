/** 메인페이지 최근 활동 게시판 게시물 3개 조회 섹션  */

'use client';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { FadeUp } from '@/components/animation/FadeUp';

import { useEffect, useState } from 'react';
import { initMSW } from '@/mocks/msw-init'; // MSW 초기화 함수 추가
import apiClient from '@/lib/api/apiClient'; // Fetch API Client 추가
import { ApiResponseWithData, isApiResponseError } from '@/types/apiTypes'; // API 반환 타입

interface ActivityPost {
  id: number;
  title: string;
  summary: string;
  createdAt: string;
}

const RecentActivitySection = () => {
  const [posts, setPosts] = useState<ActivityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        await initMSW();
        console.log('[useEffect] MSW 초기화 완료, API 요청 시작');
      }

      try {
        const response = await apiClient.get<
          ApiResponseWithData<{ posts: ActivityPost[] }>
        >('/index/activity/recent?limit=3');

        if (isMounted && response?.data && 'posts' in response.data) {
          const { posts } = response.data;

          if (Array.isArray(posts)) {
            setPosts(posts);
          } else {
            throw new Error(
              'Invalid response structure: posts is not an array',
            );
          }
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching recent activity posts:', error);
        setError('Failed to load news');
        throw error;
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="py-10 text-center">Loading...</div>;
  if (error)
    return <div className="py-10 text-center text-red-500">{error}</div>;

  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col items-center gap-12 lg:px-16">
        <FadeUp
          direction="up"
          className="flex flex-col items-center space-y-0 pb-5 pt-0 text-center"
        >
          <h2 className="mb-6 text-pretty text-3xl font-extrabold md:mb-6 md:text-4xl lg:mb-8 lg:max-w-3xl lg:text-5xl">
            Semtle News.
          </h2>
        </FadeUp>

        {/* 뉴스 카드 리스트 */}
        <FadeUp
          direction="up"
          className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-6"
          staggerChildren={0.2} // 카드들이 순차적으로 나타나도록 설정
        >
          {posts.map((post) => (
            <FadeUp key={post.id} direction="up">
              <Card className="relative mx-auto flex min-h-[220px] w-full max-w-[1000px] overflow-hidden border-none bg-transparent shadow-none md:flex-row">
                {/* 이미지 컨테이너 */}
                <div className="w-full flex-shrink-0 md:w-1/3">
                  <a
                    href="#"
                    className="block transition-opacity duration-200 hover:opacity-70"
                  >
                    <Image
                      src="/1.jpg"
                      alt={post.title}
                      width={500}
                      height={300}
                      className="block aspect-[16/9] h-full w-full object-cover md:rounded-xl"
                    />
                  </a>
                </div>

                {/* 카드 내용 컨테이너 */}
                <div className="relative flex w-full flex-col justify-between px-4 py-3 md:w-2/3">
                  <div className="flex flex-col">
                    <CardHeader className="pb-2 md:pb-3">
                      <h3 className="text-[1.4rem] font-semibold text-foreground md:text-[1.5rem]">
                        <a href="#" className="hover:underline">
                          {post.title}
                        </a>
                      </h3>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <p className="text-black dark:text-gray-200">
                        {post.summary}
                      </p>
                    </CardContent>
                  </div>

                  <CardFooter className="flex justify-end pb-1 md:pb-3">
                    <a
                      href="#"
                      className="flex items-center text-primary hover:underline"
                    >
                      더보기
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </CardFooter>
                </div>
              </Card>
            </FadeUp>
          ))}
        </FadeUp>
      </div>
    </section>
  );
};

export default RecentActivitySection;
