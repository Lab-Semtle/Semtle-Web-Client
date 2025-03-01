'use client';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeUp } from '@/components/animation/FadeUp';
import { useRouter } from 'next/navigation';
import RecentActivitySkeleton from '@/components/skeleton/RecentActivitySkeleton';

interface ActivityPost {
  board_id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  type: string;
  imageUrl?: string; // Presigned URL 사용
}

interface ActivityListProps {
  posts: ActivityPost[];
  loading: boolean;
  error: boolean;
}

const ActivityCard2List = ({ posts, loading, error }: ActivityListProps) => {
  const router = useRouter();
  const defaultImage = '/temp-server/sample-7.jpg';

  return (
    <section>
      <div className="container mx-auto flex w-full flex-col items-center gap-10 lg:px-16">
        {/* 게시물 리스트 */}
        {loading ? (
          <RecentActivitySkeleton />
        ) : error ? (
          <div className="relative w-full">
            <RecentActivitySkeleton />
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/50 text-white">
              <p className="text-lg font-semibold">
                데이터를 불러오지 못했습니다.
              </p>
              <button
                className="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600"
                onClick={() => window.location.reload()}
              >
                다시 시도
              </button>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-lg font-semibold text-gray-500">
            게시물이 존재하지 않습니다.
          </p>
        ) : (
          <FadeUp
            direction="up"
            className="flex w-full flex-col gap-2"
            staggerChildren={0.2}
          >
            {posts.map((post) => (
              <FadeUp key={post.board_id} direction="up">
                <div
                  className="relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xl p-3 transition-shadow hover:shadow-md lg:grid lg:grid-cols-5 lg:items-center lg:gap-8"
                  onClick={() => router.push(`/activities/${post.board_id}`)}
                >
                  {/* 이미지 컨테이너 */}
                  <div className="w-full lg:col-span-2">
                    <div className="mb-4 h-48 w-full overflow-hidden rounded-xl lg:mb-0">
                      <Image
                        className="aspect-[16/9] h-full w-full object-cover"
                        src={post.imageUrl || defaultImage}
                        alt={post.title}
                        width={500}
                        height={300}
                      />
                    </div>
                  </div>

                  {/* 콘텐츠 컨테이너 */}
                  <div className="w-full lg:col-span-3">
                    <blockquote>
                      <p className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {post.type}
                      </p>

                      <h3 className="mb-1 text-lg font-bold lg:text-xl">
                        {post.title}
                      </h3>

                      <p className="text-base font-medium lg:text-lg lg:leading-normal">
                        {post.content}
                      </p>

                      <footer className="mt-6 text-sm text-muted-foreground">
                        <p>
                          <span className="font-medium">{post.writer}</span>
                          <span className="mx-2">•</span>
                          <span>{post.createdAt}</span>
                        </p>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </FadeUp>
            ))}
          </FadeUp>
        )}
      </div>
    </section>
  );
};

export default ActivityCard2List;
