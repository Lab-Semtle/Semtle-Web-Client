/** 활동게시판 최근 게시물 N개 조회 섹션 */

'use client';
import { useFetchActivitiesRecent } from '@/hooks/api/useFetchActivitiesRecent';
import ActivityCard2List from '@/components/card/ActivityCard2List';
import { FadeUp } from '@/components/animation/FadeUp';

interface RecentActivityPostsProps {
  limit?: number;
}

const RecentActivityPosts = ({ limit = 3 }: RecentActivityPostsProps) => {
  const { posts, loading, error } = useFetchActivitiesRecent(limit);

  return (
    <section className="w-full py-20">
      <div className="container mx-auto flex flex-col items-center gap-10 lg:px-16">
        <FadeUp
          direction="up"
          className="flex flex-col items-center space-y-0 pb-3 pt-0 text-center"
        >
          <h2 className="mb-4 text-pretty text-3xl font-extrabold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Semtle News.
          </h2>
        </FadeUp>

        {/* 최근 활동 게시물 리스트 */}
        <div className="w-full">
          <ActivityCard2List posts={posts} loading={loading} error={!!error} />
        </div>
      </div>
    </section>
  );
};

export default RecentActivityPosts;
