'use client';
import Image from 'next/image';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import CardImageLabelList from '@/components/CardImageLabelList';
import NewsDirector from '@/components/NewsDirector';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ButtonLink from '@/components/ButtonLink';
import SlideIndicator from '@/components/SlideIndicator';

type NewsData = {
  imageSrc: string;
  altText: string;
  newsTitle: string;
  newsContent: string;
  index: number;
  postId: number;
};
export default function Page() {
  const midImageStyle = {
    width: '100%' as const,
    height: '200px' as const,
    objectFit: 'cover' as const,
  };
  const imageSrcs = ['/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg'];
  const altTexts = ['Image 1', 'Image 2', 'Image 3', 'Image 4'];
  const contentTexts = [
    '매 학기 20여개에 이르는 다양한 분야의 세션과 스터디를 통해 서로 가르치고 배우며 여러 컴퓨터 분야에 대한 지식을 넓힐 수 있습니다.',
    '우리는 다양한 대회와 프로젝트에 참여하여 기술적 역량을 키우고, 실제 문제를 해결하는 경험을 쌓고 있습니다.',
    '컴퓨터라는 같은 관심사를 가진 사람들끼리 모여 소통하고, 친목조나 뒷풀이 등의 다양한 친목활동을 통해 화목한 동아리생활을 즐길',
    '해커톤, 게임잼 등의 다양한 행사가 열리고 있으며, 팀을 꾸려 대회에 나가거나 프로젝트를 통해 결과물을 만들어내는 활동',
  ];
  const isHidden = [
    '세미나 & 스터디',
    '대회 & 프로젝트',
    '커뮤니케이션',
    '기타 활동',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const CarouselImages = ['/example1.jpg', '/example2.jpg', '/example3.jpg'];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CarouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [newsData, setNewsData] = useState<NewsData[]>([]);

  useEffect(() => {
    const newsData = [
      {
        imageSrc: '/1.jpg',
        altText: 'News Image 1',
        newsTitle: '게시글 제목 1',
        newsContent:
          '게시글 1의 간략한 내용이 여기에 표시됩니다.게시글 1의 간략한 내용이 여기에 표시됩니다.게시글 1의 간략한 내용이 여기에 표시됩니다.',
        postId: 1,
      },
      {
        imageSrc: '/2.jpg',
        altText: 'News Image 2',
        newsTitle: '게시글 제목 2',
        newsContent:
          '게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩게시글 2의 간략한 내용이 여기에 표시됩니다.니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.',
        postId: 2,
      },
      {
        imageSrc: '/3.jpg',
        altText: 'News Image 3',
        newsTitle: '게시글 제목 3',
        newsContent:
          '게시글 3의 간략한 내용이 여기에 표시됩니다.게시글 3의 간략한 내용이 여기에 표시됩니다.게시글 3의 간략한 내용이 여기에 표시됩니다.',
        postId: 3,
      },
    ];
    const formattedData = newsData.map((news, index) => ({
      ...news,
      index,
    }));

    setNewsData(formattedData);
  }, [setNewsData]);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  );
  return (
    <div>
      {/* <Navigation /> */}
      {/* 본문 */}
      <div className="flex h-screen items-center justify-center">
        <Carousel
          plugins={[plugin.current]}
          ref={carouselRef}
          className="h-full w-full"
        >
          <CarouselContent>
            {CarouselImages.map((src, index) => (
              <CarouselItem key={index} className="relative h-full w-full">
                <div className="relative h-[100vh] w-full">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* 슬라이드 인디케이터 */}
        <SlideIndicator
          totalSlides={CarouselImages.length}
          currentIndex={currentIndex}
          onClick={goToSlide}
        />
      </div>

      <div className="mt-20 flex flex-col items-center justify-center">
        <Label className="text-[26px] font-bold">Arch Semtle</Label>
        <div className="text-l mt-8 space-y-4 text-center font-bold">
          <Label className="text-lg font-bold">
            아치 셈틀은 다양한 기술과 아이디어를 탐구하며, 함께 성장하는 것을
            목표로 하는 학회입니다.
          </Label>
          <br />
          <Label className="text-lg font-bold">
            팀 프로젝트와 세미나를 통해 지식을 나누고, 새로운 가능성을 발견하는
            기회를 제공합니다.
          </Label>
        </div>
      </div>

      <CardImageLabelList
        cardCount={4}
        imageSrcs={imageSrcs}
        altTexts={altTexts}
        contentTexts={contentTexts}
        isHiddens={isHidden}
      />

      <div className="mx-auto mb-24 mt-20 flex max-w-[900px] flex-col items-center justify-center">
        <Label className="mb-[50px] mt-[100px] text-[27px] font-bold">
          학회 소식 바로보기
        </Label>
        {newsData.map((news, index) => (
          <NewsDirector
            key={index}
            imageSrc={news.imageSrc}
            altText={news.altText}
            newsTitle={news.newsTitle}
            newsContent={news.newsContent}
            index={index}
            postId={news.postId}
          />
        ))}
        <div className="ml-[750px]">
          <ButtonLink link="/activities" buttonName="더보기" />
        </div>
      </div>

      <div>
        <Image
          src="/midImage.jpeg"
          alt="Web middle Image"
          width={500}
          height={500}
          style={midImageStyle}
        />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center">
        <Label className="mt-[100px] text-[27px] font-bold">FAQ</Label>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Accordion type="single" collapsible className="w-[1000px]">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-bold hover:no-underline">
              신입 학회원 모집은 어떻게 진행되나요?
            </AccordionTrigger>
            <AccordionContent className="text-[17px] italic">
              신입 학회원 모집은 매년 초에 진행되며, 자세한 정보는 학회 공지를
              통해 안내됩니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-bold hover:no-underline">
              학회 세미나는 언제 시작되나요?
            </AccordionTrigger>
            <AccordionContent className="text-[17px] italic">
              학회 세미나는 매 학기 초에 시작되며, 세미나 일정은 학회
              웹사이트에서 확인할 수 있습니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-bold hover:no-underline">
              대회 수상 소식은 어디에서 확인할 수 있나요?
            </AccordionTrigger>
            <AccordionContent className="text-[17px] italic">
              대회 수상 소식은 학회의 공식 웹사이트와 소셜 미디어 채널에서 확인
              가능합니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mb-[150px] mt-20 flex flex-col items-center justify-center">
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
          <div className="absolute bottom-[-60px] right-[-16px] mb-4">
            <ButtonLink link="/recruiting" buttonName="Join" />
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
