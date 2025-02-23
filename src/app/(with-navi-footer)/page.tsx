'use client';
import Image from 'next/image';
import CarouselSection from '@/components/home/CarouselSection';
import IntroSection from '@/components/home/IntroSection';
import RecentActivitySection from '@/components/home/RecentActivitySection';
import FaqSection from '@/components/home/FaqSection';
import RecruitSection from '@/components/home/RecruitSection';

export default function HomePage() {
  return (
    <div>
      <main className="space-y-24">
        <CarouselSection />
        <IntroSection />
        <RecentActivitySection />
        <section className="pt-10 md:pt-16">
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
        <FaqSection />
        <RecruitSection />
      </main>
    </div>
  );
}
