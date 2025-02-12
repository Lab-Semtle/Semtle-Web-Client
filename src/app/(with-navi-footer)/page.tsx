'use client';
import Image from 'next/image';
import CarouselSection from '@/components/home/CarouselSection';
import IntroSection from '@/components/home/IntroSection';
import RecentActivitySection from '@/components/home/RecentActivitySection';
import FaqSection from '@/components/home/FaqSection';
import RecruitSection from '@/components/home/RecruitSection';

export default function HomePage() {
  const midImageStyle = {
    width: '100%' as const,
    height: '200px' as const,
    objectFit: 'cover' as const,
  };
  return (
    <div>
      <main className="space-y-24">
        <CarouselSection />
        <IntroSection />
        <RecentActivitySection />
        <section className="pt-10 md:pt-16">
          <Image
            src="/midImage.jpeg"
            alt="Web middle Image"
            width={500}
            height={500}
            style={midImageStyle}
          />
        </section>
        <FaqSection />
        <RecruitSection />
      </main>
    </div>
  );
}
