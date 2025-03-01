'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Slider from 'react-slick';
import PreviousArrowIcon from '@/components/icons/PreviousArrowIcon';
import NextArrowIcon from '@/components/icons/NextArrowIcon';
import { ArrowRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BannerItem {
  bannerId: number;
  imageUrl: string;
  targetPath: string;
  altText?: string;
}

interface CarouselSectionProps {
  items: BannerItem[];
  maxItems?: number;
}

const BannerCarousel = ({ items, maxItems }: CarouselSectionProps) => {
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
    ),
  };

  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-3 sm:pt-[90px] md:pt-[90px]">
      <div className="relative rounded-2xl">
        <Slider {...settings} className="mb-0">
          {items.slice(0, maxItems).map((banner) => (
            <div key={banner.bannerId} className="relative">
              <div className="relative h-[570px] w-full overflow-hidden rounded-2xl sm:h-[370px] md:h-[470px] lg:h-[570px]">
                <Link href={banner.targetPath}>
                  <Image
                    src={banner.imageUrl} // 🔹 Presigned URL 사용
                    alt={banner.altText || '배너 이미지'}
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
                    <a href={banner.targetPath}>
                      자세히 보기
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

export default BannerCarousel;
