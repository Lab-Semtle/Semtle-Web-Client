/** 활동게시판 최근 게시물 N개 조회 섹션 */

'use client';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeUp } from '@/components/animation/FadeUp';
import { useRecentActivityPosts } from '@/hooks/api/useFetchActivity';
import { useRouter } from 'next/navigation';
import RecentActivitySkeleton from '@/components/skeleton/RecentActivitySkeleton';

const RecentActivityPosts = () => {
  const { posts, loading, error } = useRecentActivityPosts(3);
  const router = useRouter();

  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col items-center gap-10 lg:px-16">
        <FadeUp
          direction="up"
          className="flex flex-col items-center space-y-0 pb-3 pt-0 text-center"
        >
          <h2 className="mb-4 text-pretty text-3xl font-extrabold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Semtle News.
          </h2>
        </FadeUp>

        {/* 게시물 리스트 */}
        {loading ? (
          <RecentActivitySkeleton />
        ) : error ? (
          <div className="relative w-full max-w-[1200px]">
            <RecentActivitySkeleton />
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/50 text-white">
              <p className="text-lg font-semibold">
                ❌ 최근 활동 게시물을 불러올 수 없습니다.
              </p>
              <button
                className="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600"
                onClick={() => window.location.reload()}
              >
                다시 시도
              </button>
            </div>
          </div>
        ) : (
          <FadeUp
            direction="up"
            className="flex w-full max-w-[1200px] flex-col gap-2"
            staggerChildren={0.2}
          >
            {posts.map((post) => (
              <FadeUp key={post.board_id} direction="up">
                <div
                  className="relative cursor-pointer overflow-hidden rounded-xl p-6 transition-shadow hover:shadow-md lg:grid lg:grid-cols-6 lg:items-center lg:gap-8"
                  onClick={() => router.push(`/activities/${post.board_id}`)} // 여기에 게시물 상세 페이지 URL 설정
                >
                  {/* 이미지 컨테이너 */}
                  <div className="hidden lg:col-span-2 lg:block">
                    <div className="h-48 w-full overflow-hidden rounded-xl">
                      <Image
                        className="aspect-[16/9] h-full w-full object-cover"
                        src={
                          post.images.length > 0
                            ? post.images[0]
                            : '/default-image.jpg'
                        }
                        alt={post.title}
                        width={500}
                        height={300}
                      />
                    </div>
                  </div>

                  {/* 콘텐츠 컨테이너 */}
                  <div className="lg:col-span-4">
                    <blockquote>
                      <p className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {post.type}
                      </p>

                      <p className="text-base font-medium lg:text-lg lg:leading-normal">
                        {post.content}
                      </p>

                      <footer className="mt-6 flex items-center">
                        <Avatar className="size-12">
                          <AvatarImage
                            src={post.images[0] || '/default-avatar.png'}
                            alt="Avatar"
                          />
                          <AvatarFallback>{post.writer[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ms-4">
                          <p className="font-medium">{post.writer}</p>
                          <p className="text-sm text-muted-foreground">
                            {post.createdAt}
                          </p>
                        </div>
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

export default RecentActivityPosts;
