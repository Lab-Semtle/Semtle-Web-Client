/** 메인페이지 Introduction 섹션 */

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FadeUp } from '@/components/animation/FadeUp';
import { ArrowRight } from 'lucide-react';
import { VariantShineButton } from '@/components/common/VariantShineButton';
import {
  INTRO_HEADING,
  INTRO_DESCRIPTION,
  INTRO_BUTTON_URL,
  INTRO_CARDS,
} from '@/constants/home/intro-items';

const IntroSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col items-center gap-5 lg:px-16">
        {/* 헤더 */}
        <FadeUp
          direction="up"
          className="flex flex-col items-center space-y-0 pb-5 pt-0 text-center"
        >
          <h2 className="mb-4 text-pretty font-pretendard text-3xl font-black md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {INTRO_HEADING}
          </h2>
          <p className="mb-6 text-black dark:text-white md:text-base lg:max-w-2xl lg:text-lg">
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
                <p className="text-muted-foreground">
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
};

export default IntroSection;
