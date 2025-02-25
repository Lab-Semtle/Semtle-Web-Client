/** Home(Index) 페이지 */

'use client';
import Image from 'next/image';
import BannerCarousel from '@/components/sections/BannerCarousel';
import BannerCarouselSkeleton from '@/components/skeleton/BannerCarouselSkeleton';
import Introduction from '@/components/sections/Introduction';
import RecentActivityPosts from '@/components/sections/RecentActivityPosts';
import FaqAccordion from '@/components/sections/FaqAccordion';
import RecruitCard from '@/components/sections/RecruitCard';
import { useFetchBanners } from '@/hooks/api/useFetchBanners';

export default function HomePage() {
  return (
    <>
      {/* Hero + Intro + 최근 활동 게시물 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <main className="space-y-24">
          <HeroSection />
          <section className="mx-auto max-w-5xl">
            <Introduction />
          </section>
          <section className="mx-auto max-w-5xl">
            <RecentActivityPosts />
          </section>
        </main>
      </div>

      {/* 중간 배경 이미지 */}
      <section className="w-full pb-24 pt-24">
        <Image
          src="/images/kmou_2022.jpg"
          alt="KMOU 2023 Spring"
          width={1920}
          height={1080}
          quality={100}
          className="h-[400px] w-full object-cover object-bottom brightness-100 dark:brightness-75"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0))',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(0,0,0,0))',
          }}
        />
      </section>

      {/* FAQ + Recruit */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <main className="space-y-24">
          <section className="mx-auto max-w-5xl">
            <FaqAccordion />
          </section>

          <section className="mx-auto max-w-5xl">
            <RecruitCard />
          </section>
        </main>
      </div>
    </>
  );
}

/** 메인페이지 최상단 Hero 섹션 컴포넌트 */
function HeroSection() {
  const { banners, loading, error } = useFetchBanners();

  console.log('📢 [HeroSection] 배너 상태 업데이트:', {
    banners,
    loading,
    error,
  });

  return (
    <div className="relative mt-10 overflow-hidden py-24 lg:mt-16 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-wide lg:text-5xl">
            <span className="text-semtle-lite dark:text-semtle-dark">Ar</span>
            canum{'\u00A0 '}
            <span className="text-semtle-lite dark:text-semtle-dark">Chi</span>
            ron{'\u00A0 '}
            <span className="text-semtle-lite dark:text-semtle-dark">Sem</span>
            inalis{'\u00A0 '}
            <span className="text-semtle-lite dark:text-semtle-dark">Tle</span>
            os
          </h1>

          <p className="mt-6 whitespace-pre-line text-base font-medium text-muted-foreground lg:text-lg lg:leading-normal">
            환영합니다! 우리는{' '}
            <span className="text-semtle-lite dark:text-semtle-dark">기술</span>
            의 본질을 탐구하며,{'\n'}
            <span className="text-semtle-lite dark:text-semtle-dark">협업</span>
            을 통해 실무 역량을 키우고,{'\n'}
            다양한{' '}
            <span className="text-semtle-lite dark:text-semtle-dark">
              프로젝트
            </span>
            를 통해{' '}
            <span className="text-semtle-lite dark:text-semtle-dark">혁신</span>
            을 만들어갑니다.{'\n'}
            함께{' '}
            <span className="text-semtle-lite dark:text-semtle-dark">
              배우고 성장
            </span>
            하며, 새로운{' '}
            <span className="text-semtle-lite dark:text-semtle-dark">
              지식의 파도
            </span>
            를 만들어가는 곳, 여기는
            <span className="font-bold text-semtle-lite dark:text-semtle-dark">
              {` "`}아치셈틀{`" `}
            </span>
            입니다.
          </p>
        </div>

        {/* 캐러셀 */}
        <div className="relative mx-auto mt-4 max-w-5xl">
          {loading ? (
            <BannerCarouselSkeleton />
          ) : error ? (
            <div className="mt-4 flex flex-col items-center">
              <BannerCarouselSkeleton />
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/50 text-white">
                <p className="text-lg font-semibold">
                  ❌ 배너를 불러오지 못했습니다.
                </p>
                <button
                  className="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600"
                  onClick={() => window.location.reload()} // 페이지 새로고침
                >
                  다시 시도
                </button>
              </div>
            </div>
          ) : (
            <BannerCarousel items={banners} maxItems={5} />
          )}
        </div>
      </div>
    </div>
  );
}
