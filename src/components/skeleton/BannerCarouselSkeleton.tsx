/** 메인페이지(인덱스) 배너 캐러쉘 섹션 스켈레톤 */

'use client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function BannerCarouselSkeleton() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-3 sm:pt-[90px] md:pt-[90px]">
      <div className="relative rounded-2xl">
        <Skeleton
          height={570}
          className="rounded-2xl sm:h-[370px] md:h-[470px] lg:h-[570px]"
        />
      </div>
    </section>
  );
}
