'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function RecentActivitySkeleton() {
  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col items-center gap-10 lg:px-16">
        {/* 제목 스켈레톤 */}
        <div className="mb-4 text-center">
          <Skeleton width={200} height={36} />
        </div>

        {/* 게시물 스켈레톤 리스트 */}
        <div className="flex w-full max-w-[1200px] flex-col gap-2">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-xl p-6 transition-shadow hover:shadow-md lg:grid lg:grid-cols-6 lg:items-center lg:gap-8"
            >
              {/* 이미지 스켈레톤 */}
              <div className="hidden lg:col-span-2 lg:block">
                <Skeleton height={192} className="rounded-xl" />
              </div>

              {/* 내용 스켈레톤 */}
              <div className="lg:col-span-4">
                {/* 게시물 유형 (작은 태그 스타일) */}
                <Skeleton
                  width={80}
                  height={24}
                  className="mb-2 rounded-full"
                />

                {/* 게시물 제목 */}
                <Skeleton width="80%" height={24} className="mb-2" />

                {/* 게시물 내용 */}
                <Skeleton count={2} width="100%" height={18} />

                {/* 작성자 정보 */}
                <div className="mt-6 flex items-center">
                  <Skeleton circle width={48} height={48} />
                  <div className="ms-4">
                    <Skeleton width={120} height={18} />
                    <Skeleton width={80} height={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
