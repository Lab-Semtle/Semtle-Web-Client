'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { CustomArrowProps } from 'react-slick';
import { Label } from '@/components/ui/label';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

import CardImageLabelList from '@/components/CardImageLabelList';
import NewsDirector from '@/components/NewsDirector';
import ButtonLink from '@/components/ButtonLink';
import { fetchLatestNews } from '@/app/api/activity/latest/utils';
import { introCardData } from '@/constants/intro-card';

import FAQ from '@/components/FAQ';
import JoinPost from '@/components/JoinPost';

const sectionClass = 'max-w-[1200px] mx-auto px-4';

// //NOTE - Carousel 이미지 Data Fetching
// async function fetchCarouselImages() {
//   const res = await fetch('example/api/carouselimage');
//   if (!res.ok) {
//     throw new Error('Failed to load data...');
//   }
//   const carouselImages: CarouselImageData[] = await res.json();
//   return carouselImages;
// }
// //NOTE - 학회소개 Card 이미지 Data Fetching
// async function fetchCardImages() {
//   const res = await fetch('example/api/cardimage', { cache: 'force-cache' });
//   if (!res.ok) {
//     throw new Error('Failed to load data...');
//   }
//   const CardImages: CardImageData[] = await res.json();
//   return CardImages;
// }
// //NOTE - FAQ 질문&답변 Data Fetching
// async function fetchFaqList() {
//   const res = await fetch('example/api/faqdata', { cache: 'force-cache' });
//   if (!res.ok) {
//     throw new Error('Failed to load data...');
//   }
//   const FaqList: FaqData[] = await res.json();
//   return FaqList;
// }

type NewsData = {
  id?: number;
  imageSrc: string;
  newsTitle: string;
  newsContent: string;
  created_at?: string;
  link_url?: string;
  index: number;
};

/////////////////////////// 캐러셀 섹션 ////////////////////////////
const CarouselData = [
  {
    id: 1,
    image_url: '/example1.jpg',
    title: '학회 소개 행사',
    link_url: '/event/1',
  },
  {
    id: 2,
    image_url: '/example2.jpg',
    title: '연구 발표',
    link_url: '/event/2',
  },
  {
    id: 3,
    image_url: '/example3.jpg',
    title: '연구 발표',
    link_url: '/event/2',
  },
];

const PreviousArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
      onClick={onClick}
    >
      <ChevronLeft size={30} color="white" />
    </div>
  );
};

const NextArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
      onClick={onClick}
    >
      <ChevronRight size={30} color="white" />
    </div>
  );
};

const CarouselImage = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <section className={`${sectionClass} pt-[90px] sm:pt-[70px] md:pt-[90px]`}>
      <Slider {...settings}>
        {/* CarouselImages 배열을 사용하여 이미지 렌더링 */}
        {CarouselData.map((carousel) => (
          <div key={carousel.id}>
            <div className="relative h-[500px] w-full sm:h-[300px] md:h-[400px] lg:h-[500px]">
              <Link href={carousel.link_url}>
                <Image
                  src={carousel.image_url}
                  alt={carousel.title}
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

/////////////////////////// 인트로 섹션 ////////////////////////////
// ${sectionClass}
const Introduction = () => (
  <section
    className={`mt-16 flex flex-col items-center text-center ${sectionClass}`}
  >
    {/* 인삿말 */}
    <Label className="text-3xl font-bold">Archi Semtle</Label>
    <Label className="mt-6 text-lg font-medium text-muted-foreground">
      아치 셈틀은 다양한 기술과 아이디어를 탐구하며, 함께 성장하는 것을 목표로
      하는 학회입니다.
    </Label>
    <br />
    <Label className="mt-6 text-lg font-medium text-muted-foreground">
      팀 프로젝트와 세미나를 통해 지식을 나누고, 새로운 가능성을 발견하는 기회를
      제공합니다.
    </Label>

    {/* 카드 이미지 리스트 */}
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      <CardImageLabelList cards={introCardData} />
    </div>
  </section>
);

/////////////////////////// 최근 활동 게시물 섹션 ////////////////////////////
const ActivityPosts = () => {
  const [news, setNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchLatestNews();
        setNews(data);
      } catch {
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const sortedNews = [...news].sort(
    (a, b) =>
      new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime(),
  );

  return (
    <section className={`mt-16 ${sectionClass}`}>
      <Label className="text-2xl font-bold">학회 소식 바로보기</Label>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="mt-8 space-y-6">
          {news.map((item, index) => (
            <NewsDirector key={index} {...item} />
          ))}
        </div>
      )}
      {/* {sortedNews.map((news, index) => (
        <NewsDirector
          key={news.id}
          id={news.id}
          {...news}
          imageSrc={news.imageSrc}
          newsTitle={news.newsTitle}
          newsContent={news.newsContent}
          index={index}
        />
      ))} */}
      <div className="mt-6 text-center">
        <ButtonLink link="/activity" buttonName="더보기" />
      </div>
    </section>
  );
};

/////////////////////////// 메인 페이지 컴포넌트 ////////////////////////////
export default function Page() {
  const [news, setNews] = useState<NewsData[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sortedNews = [...news].sort(
    (a, b) =>
      new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime(),
  );

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchLatestNews();
        setNews(data);
      } catch {
        setError('Failed to load news');
      } finally {
        setLoadingNews(false);
      }
    }

    loadData();
  }, []);

  if (loadingNews) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const midImageStyle = {
    //NOTE - 중간 이미지
    width: '100%' as const,
    height: '200px' as const,
    objectFit: 'cover' as const,
  };

  return (
    <div>
      {/* 본문 */}
      <main className="space-y-16">
        <CarouselImage />
        <Introduction />
        <ActivityPosts />
        <section>
          <Image
            src="/midImage.jpeg"
            alt="Web middle Image"
            width={500}
            height={500}
            style={midImageStyle}
          />
        </section>
        <FAQ />
        <JoinPost />
      </main>
    </div>
  );
}
