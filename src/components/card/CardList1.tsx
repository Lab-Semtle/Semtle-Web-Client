'use client';

import Image from 'next/image';
import { FadeUp } from '@/components/animation/FadeUp';
import { useRouter } from 'next/navigation';
import RecentActivitySkeleton from '@/components/skeleton/RecentActivitySkeleton';

interface CardItem1 {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  category?: string;
  imageUrl?: string;
  link?: string;
}

interface CardList1Props {
  items: CardItem1[];
  loading: boolean;
  error: boolean;
  onItemClick?: (id: number) => void;
}

// 글자수를 일정 길이 이상이면 '...'으로 표시
const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const CardList1 = ({
  items = [],
  loading,
  error,
  onItemClick,
}: CardList1Props) => {
  const router = useRouter();
  const defaultImage = '/logo/semtle-logo-bg-square-v2022.png';

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
        ) : items.length === 0 ? (
          <p className="text-center text-lg font-semibold text-gray-500">
            게시물이 존재하지 않습니다.
          </p>
        ) : (
          <FadeUp
            direction="up"
            className="flex w-full flex-col gap-2"
            staggerChildren={0.2}
          >
            {items.map((item) => (
              <FadeUp key={item.id} direction="up">
                <div
                  className="relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xl p-3 transition-shadow hover:shadow-md lg:grid lg:grid-cols-5 lg:items-center lg:gap-8"
                  onClick={() =>
                    item.link ? router.push(item.link) : onItemClick?.(item.id)
                  }
                >
                  {/* 이미지 컨테이너 */}
                  <div className="w-full lg:col-span-2">
                    <div className="mb-4 h-48 w-full overflow-hidden rounded-xl lg:mb-0">
                      <Image
                        className="aspect-[16/9] h-full w-full object-cover"
                        src={item.imageUrl || defaultImage}
                        alt={item.title}
                        width={500}
                        height={300}
                      />
                    </div>
                  </div>

                  {/* 콘텐츠 컨테이너 */}
                  <div className="w-full lg:col-span-3">
                    <blockquote>
                      {item.category && (
                        <p className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {item.category}
                        </p>
                      )}
                      <h3 className="mb-1 text-lg font-bold lg:text-xl">
                        {item.title}
                      </h3>

                      <p className="text-base font-medium lg:text-lg lg:leading-normal">
                        {truncateText(item.description, 100)}
                      </p>

                      <footer className="mt-6 text-sm text-muted-foreground">
                        <p>
                          <span className="font-medium">{item.author}</span>
                          <span className="mx-2">•</span>
                          <span>{item.date}</span>
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

export default CardList1;
