'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { VariantShineButton } from '@/components/common/VariantShineButton';
import { FadeUp } from '@/components/animation/FadeUp';
import CardList1 from '@/components/card/CardList1';
import BannerCarousel from '@/components/sections/BannerCarousel';
import { AuroraText } from '@/components/animation/AuroraText';
import BannerCarouselSkeleton from '@/components/skeleton/BannerCarouselSkeleton';
import { useFetchBanners } from '@/hooks/api/banner/useFetchBanners';
import { useFetchRecentActivities } from '@/hooks/api/activity/useFetchRecentActivities';
import {
  ArrowRight,
  GraduationCapIcon,
  CodeXmlIcon,
  Layers3Icon,
  UsersRoundIcon,
} from 'lucide-react';
import {
  INTRO_HEADING,
  INTRO_DESCRIPTION,
  INTRO_BUTTON_URL,
  INTRO_CARDS,
} from '@/constants/IntroductionData';
import { faqData } from '@/constants/RecruitData';
import { RECRUIT_OVERVIEW } from '@/constants/RecruitData';
import { ROUTES } from '@/constants/Routes';

function HeroSection() {
  const { banners, loading, error } = useFetchBanners();

  return (
    <div className="relative mt-10 overflow-hidden py-24 lg:mt-16 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
            KMOU AI {'\u00A0'}
            <AuroraText>ARCHI SEMTLE</AuroraText>
          </h1>

          <p className="mt-6 whitespace-pre-line text-base font-medium text-muted-foreground lg:text-lg lg:leading-normal">
            아치셈틀 홈페이지에 오신 것을 환영합니다! {'\n'}
            <span className="text-semtle-lite dark:text-semtle-dark">기술</span>
            의 본질을 탐구하며,{' '}
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
                  배너를 불러오지 못했습니다.
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
            <BannerCarousel
              items={banners.map((b) => ({
                bannerId: b.bannerId,
                imageUrl: b.imageUrl ?? '/images/kmou_2022.jpg',
                targetPath: b.targetPath,
                altText: b.altText || '배너 이미지',
              }))}
              maxItems={5}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/** 인트로 섹션 (소개글 + 카드뉴스) */
function IntroSection() {
  return (
    <section>
      <div className="container mx-auto flex flex-col items-center gap-5 lg:px-16">
        {/* 헤더 */}
        <FadeUp
          direction="up"
          className="flex flex-col items-center space-y-0 pb-5 pt-0 text-center"
        >
          <h2 className="mb-4 text-pretty font-pretendard text-3xl font-black md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {INTRO_HEADING}
          </h2>
          <p className="mb-6 text-base font-medium text-black dark:text-white lg:max-w-2xl lg:text-lg lg:leading-normal">
            {INTRO_DESCRIPTION.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <VariantShineButton className="bg-blue-300 text-blue-950 hover:bg-blue-700 hover:text-gray-200 dark:bg-blue-700 dark:text-gray-200 dark:hover:bg-blue-300 dark:hover:text-blue-950">
            <Link href={INTRO_BUTTON_URL} className="flex items-center gap-2">
              아치셈틀 더 알아보기
              <ArrowRight className="size-5" />
            </Link>
          </VariantShineButton>
        </FadeUp>

        {/* 카드 리스트 */}
        <FadeUp
          direction="up"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          staggerChildren={0.2} // 카드들이 순차적으로 FadeUp 되도록 설정
        >
          {INTRO_CARDS.map((card) => (
            <Card
              key={card.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden rounded-lg"
            >
              <div className="aspect-[16/9] w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={700}
                  height={400}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                  {card.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-base font-medium text-muted-foreground lg:text-lg lg:leading-normal">
                  {card.description.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </CardContent>
            </Card>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}

/** 최근 활동 게시물 섹션 */
interface RecentActivitySectionProps {
  limit?: number;
}

function RecentActivitySection({ limit = 3 }: RecentActivitySectionProps) {
  const { posts, loading, error } = useFetchRecentActivities(limit);

  const cardItems = posts.map((post) => ({
    id: post.board_id,
    title: post.title,
    description: post.content,
    author: post.writer,
    date: post.createdAt,
    category: post.type,
    imageUrl: post.images?.[0] ?? undefined,
    link: `/activities/${post.board_id}`,
  }));

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
          <CardList1 items={cardItems} loading={loading} error={!!error} />
        </div>
      </div>
    </section>
  );
}

/** FAQ 섹션 */
function FaqSection() {
  return (
    <section className="mx-auto mt-28 max-w-[800px] px-4">
      <h2 className="mb-4 text-pretty text-center text-3xl font-extrabold md:mb-5 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
        자주 묻는 질문
      </h2>

      <Accordion type="single" collapsible className="mt-12">
        {faqData.map(({ id, faqQuestion, faqAnswer }) => (
          <AccordionItem key={id} value={`item-${id}`}>
            <AccordionTrigger className="text-lg font-medium hover:no-underline">
              {faqQuestion}
            </AccordionTrigger>
            <AccordionContent className="mt-2 text-base">
              {faqAnswer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/** Recruit 섹션 */
const ICONS: Record<string, React.ReactNode> = {
  passion: <GraduationCapIcon className="size-14 text-blue-700" />,
  participation: <CodeXmlIcon className="size-14 text-red-700" />,
  diversity: <Layers3Icon className="size-14 text-green-700" />,
  community: <UsersRoundIcon className="size-14 text-purple-700" />,
};

function RecruitSection() {
  return (
    <section className="mx-auto mt-20 max-w-[800px] px-4 py-14 text-center">
      <h2 className="mb-24 text-pretty text-center text-3xl font-extrabold md:mb-20 md:text-4xl lg:mb-16 lg:max-w-3xl lg:text-5xl">
        아치셈틀 리크루팅
      </h2>

      <div className="mb-20 grid gap-10 text-center md:grid-cols-2 md:gap-14 lg:gap-16">
        {RECRUIT_OVERVIEW.map(({ id, title, description }) => (
          <div
            key={id}
            className="flex flex-col items-center gap-5 md:flex-row md:items-start"
          >
            {ICONS[id]}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="font-medium, text-base text-gray-600 dark:text-gray-400 lg:text-lg lg:leading-normal">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 가입하기 버튼 */}
      <div className="mb-24 mt-12 flex justify-center">
        <VariantShineButton className="bg-blue-300 px-6 py-3 text-base text-blue-950 hover:bg-blue-700 hover:text-gray-200 dark:bg-blue-700 dark:text-gray-200 dark:hover:bg-blue-300 dark:hover:text-blue-950">
          <Link href={ROUTES.RECRUIT} className="flex items-center gap-3">
            가입하기
            <ArrowRight className="size-5" />
          </Link>
        </VariantShineButton>
      </div>
    </section>
  );
}

/** Home(Index) 페이지 */
export default function HomePage() {
  return (
    <>
      {/* Hero + Intro + 최근 활동 게시물 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <main className="space-y-24">
          <HeroSection />
          <section className="mx-auto max-w-5xl">
            <IntroSection />
          </section>
          <section className="mx-auto max-w-6xl">
            <RecentActivitySection limit={3} />
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
            <FaqSection />
          </section>

          <section className="mx-auto max-w-5xl">
            <RecruitSection />
          </section>
        </main>
      </div>
    </>
  );
}
