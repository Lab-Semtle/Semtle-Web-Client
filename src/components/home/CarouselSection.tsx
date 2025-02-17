/** 메인페이지 캐러쉘 섹션 */

'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Slider from 'react-slick';
import PreviousArrowIcon from '@/components/icon/PreviousArrowIcon';
import NextArrowIcon from '@/components/icon/NextArrowIcon';
import { ArrowRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  CAROUSEL_ITEM,
  CAROUSEL_BUTTON_TEXT,
  CAROUSEL_BUTTON_URL,
} from '@/constants/carouselItems';

const CarouselSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    prevArrow: <PreviousArrowIcon />,
    nextArrow: <NextArrowIcon />,
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-4 flex w-full justify-center">
        <ul className="space-x-2">{dots}</ul>
      </div>
    ), // !네비게이션 다크모드 점 색상 추가 (근데 적용이 안됨)
  };

  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-3 sm:pt-[90px] md:pt-[90px]">
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
