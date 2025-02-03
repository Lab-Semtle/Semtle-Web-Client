'use client';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CardImageLabelList from '@/components/CardImageLabelList';
import NewsDirector from '@/components/NewsDirector';
import ButtonLink from '@/components/ButtonLink';
import { fetchLatestNews } from './api/activity/latest/utils';

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
export default function Page() {
  //NOTE - 학회소식바로보기 Data Fetching 사용예제
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

  const CarouselImages = [
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
  const cardImages = [
    {
      imageSrc: '/1.jpg',
      altText: 'Image 1',
      contentText:
        '매 학기 20여개에 이르는 다양한 분야의 세션과 스터디를 통해 서로 가르치고 배우며 여러 컴퓨터 분야에 대한 지식을 넓힐 수 있습니다.',
      isHidden: '세미나 & 스터디',
    },

    {
      imageSrc: '/2.jpg',
      altText: 'Image 2',
      contentText:
        '우리는 다양한 대회와 프로젝트에 참여하여 기술적 역량을 키우고, 실제 문제를 해결하는 경험을 쌓고 있습니다.',
      isHidden: '대회 & 프로젝트',
    },
    {
      imageSrc: '/3.jpg',
      altText: 'Image 3',
      contentText:
        '컴퓨터라는 같은 관심사를 가진 사람들끼리 모여 소통하고, 친목조나 뒷풀이 등의 다양한 친목활동을 통해 화목한 동아리생활을 즐길',
      isHidden: '커뮤니케이션',
    },
    {
      imageSrc: '/4.jpg',
      altText: 'Image 4',
      contentText:
        '해커톤, 게임잼 등의 다양한 행사가 열리고 있으며, 팀을 꾸려 대회에 나가거나 프로젝트를 통해 결과물을 만들어내는 활동',
      isHidden: '기타 활동',
    },
  ];

  const settings = {
    //NOTE - Carousel Setting
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  const midImageStyle = {
    //NOTE - 중간 이미지
    width: '100%' as const,
    height: '200px' as const,
    objectFit: 'cover' as const,
  };

  const faqData = [
    //NOTE - FAQ Dataset
    {
      faqQuestion: '신입 학회원 모집은 어떻게 진행되나요?',
      faqAnswer:
        '신입 학회원 모집은 매년 초에 진행되며, 자세한 정보는 학회 공지를 통해 안내됩니다.',
      id: 1,
    },
    {
      faqQuestion: '학회 세미나는 언제 시작되나요?',
      faqAnswer:
        '학회 세미나는 매 학기 초에 시작되며, 세미나 일정은 학회 웹사이트에서 확인할 수 있습니다.',
      id: 2,
    },
    {
      faqQuestion: '대회 수상 소식은 어디에서 확인할 수 있나요?',
      faqAnswer:
        '대회 수상 소식은 학회의 공식 웹사이트와 소셜 미디어 채널에서 확인 가능합니다.',
      id: 3,
    },
  ];
  return (
    <div>
      {/* 본문 */}
      <main>
        <section>
          <Slider {...settings}>
            {/* CarouselImages 배열을 사용하여 이미지 렌더링 */}
            {CarouselImages.map((carousel) => (
              <div key={carousel.id}>
                <div className="relative h-[100vh] w-full">
                  <Link href={carousel.link_url}>
                    <Image
                      src={carousel.image_url}
                      alt={carousel.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <section className="mt-20 flex flex-col items-center justify-center">
          <Label className="text-[26px] font-bold">Arch Semtle</Label>
          <div className="text-l mt-8 space-y-4 text-center font-bold">
            <Label className="text-lg font-bold">
              아치 셈틀은 다양한 기술과 아이디어를 탐구하며, 함께 성장하는 것을
              목표로 하는 학회입니다.
            </Label>
            <br />
            <Label className="text-lg font-bold">
              팀 프로젝트와 세미나를 통해 지식을 나누고, 새로운 가능성을
              발견하는 기회를 제공합니다.
            </Label>
          </div>
        </section>

        <section className="mt-10 flex justify-center gap-4">
          <CardImageLabelList cards={cardImages} />
        </section>

        <section className="mx-auto mb-24 mt-20 flex max-w-[900px] flex-col items-center justify-center">
          <Label className="mb-[50px] mt-[100px] text-[27px] font-bold">
            학회 소식 바로보기
          </Label>
          {sortedNews.map((news, index) => (
            <NewsDirector
              key={news.id}
              id={news.id}
              {...news}
              imageSrc={news.imageSrc}
              newsTitle={news.newsTitle}
              newsContent={news.newsContent}
              index={index}
            />
          ))}
          <div className="ml-[750px]">
            <ButtonLink link="/activities" buttonName="더보기" />
          </div>
        </section>

        <section>
          <Image
            src="/midImage.jpeg"
            alt="Web middle Image"
            width={500}
            height={500}
            style={midImageStyle}
          />
        </section>
        <div className="mt-10 flex flex-col items-center justify-center">
          <Label className="mt-[100px] text-[27px] font-bold">FAQ</Label>
        </div>

        <section className="mt-8 flex items-center justify-center">
          <Accordion type="single" collapsible className="w-[1000px]">
            {faqData.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="text-lg font-bold hover:no-underline">
                  {faq.faqQuestion}
                </AccordionTrigger>
                <AccordionContent className="text-[17px] italic">
                  {faq.faqAnswer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mb-[150px] mt-20 flex flex-col items-center justify-center">
          <Label className="mb-8 mt-[100px] text-xl font-bold">
            학회 가입 및 문의
          </Label>
          <div className="relative">
            <Image
              src="/test1.jpg"
              alt="Join Image"
              width={1000}
              height={150}
              style={{ width: '1000px', height: '550px' }}
            />
            <div className="absolute bottom-[-60px] right-[-1px] mb-4">
              <ButtonLink link="/recruiting" buttonName="Join" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
