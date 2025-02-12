/** 메인페이지 캐러쉘 섹션 */

'use client';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { CustomArrowProps } from 'react-slick';
import {
  CAROUSEL_ITEM,
  CAROUSEL_BUTTON_TEXT,
  CAROUSEL_BUTTON_URL,
} from '@/constants/carouselItem';

const CarouselSection = () => {
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
    appendDots: (dots) => (
      <div className="absolute bottom-4 flex w-full justify-center">
        <ul className="space-x-2 dark:text-gray-400">{dots}</ul>
      </div>
    ), // 네비게이션 다크모드 점 색상 추가 (근데 적용이 안됨)
  };

  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-0 sm:pt-[80px] md:pt-[80px]">
      <div className="relative rounded-2xl">
        <Slider {...settings} className="mb-0">
          {CAROUSEL_ITEM.map((carousel) => (
            <div key={carousel.id} className="relative">
              <div className="relative h-[570px] w-full overflow-hidden rounded-2xl sm:h-[370px] md:h-[470px] lg:h-[570px]">
                <Link href={carousel.link_url}>
                  <Image
                    src={carousel.image_url}
                    alt={carousel.title}
                    fill
                    className="rounded-2xl object-cover"
                  />
                </Link>
                <div className="absolute bottom-4 right-4">
                  <Button
                    variant="ghost"
                    className="rounded-lg bg-white/50 p-2 text-black transition-all hover:bg-white/70 dark:bg-black/50 dark:text-white dark:hover:bg-black/70"
                    asChild
                  >
                    <a href={CAROUSEL_BUTTON_URL}>
                      {CAROUSEL_BUTTON_TEXT}
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CarouselSection;

const PreviousArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer dark:opacity-80 dark:hover:opacity-100"
    onClick={onClick}
  >
    <ChevronLeft size={30} className="text-white dark:text-gray-300" />
  </div>
);

const NextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer dark:opacity-80 dark:hover:opacity-100"
    onClick={onClick}
  >
    <ChevronRight size={30} className="text-white dark:text-gray-300" />
  </div>
);
