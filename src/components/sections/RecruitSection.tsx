/** 메인페이지 Recruit 섹션 */

import React from 'react';
import {
  ArrowRight,
  GraduationCapIcon,
  CodeXmlIcon,
  Layers3Icon,
  UsersRoundIcon,
} from 'lucide-react';
import { VariantShineButton } from '@/components/common/VariantShineButton';
import {
  RECRUIT_TITLE,
  RECRUIT_DETAILS,
  RECRUIT_BUTTON_URL,
} from '@/constants/home/recruit-items';
import Link from 'next/link';

const ICONS: Record<string, JSX.Element> = {
  passion: <GraduationCapIcon className="size-14 text-blue-700" />,
  participation: <CodeXmlIcon className="size-14 text-red-700" />,
  diversity: <Layers3Icon className="size-14 text-green-700" />,
  community: <UsersRoundIcon className="size-14 text-purple-700" />,
};

const RecruitSection = () => (
  <section className="mx-auto mt-20 max-w-[800px] px-4 py-20 text-center">
    {/* 섹션 제목 */}
    <h2 className="mb-24 text-pretty text-center text-3xl font-extrabold md:mb-20 md:text-4xl lg:mb-16 lg:max-w-3xl lg:text-5xl">
      {RECRUIT_TITLE}
    </h2>

    {/* 모집 상세 */}
    <div className="mb-20 grid gap-10 text-center md:grid-cols-2 md:gap-14 lg:gap-16">
      {RECRUIT_DETAILS.map(({ id, title, description }) => (
        <div
          key={id}
          className="flex flex-col items-center gap-5 md:flex-row md:items-start"
        >
          {ICONS[id]}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* 가입하기 버튼 */}
    <div className="mb-24 mt-12 flex justify-center">
      <VariantShineButton className="bg-blue-300 px-6 py-3 text-base text-blue-950 hover:bg-blue-700 hover:text-gray-200 dark:bg-blue-700 dark:text-gray-200 dark:hover:bg-blue-300 dark:hover:text-blue-950">
        <Link href={RECRUIT_BUTTON_URL} className="flex items-center gap-3">
          가입하기
          <ArrowRight className="size-5" />
        </Link>
      </VariantShineButton>
    </div>
  </section>
);

export default RecruitSection;
