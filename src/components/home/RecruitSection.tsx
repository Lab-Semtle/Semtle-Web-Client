import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Lightbulb, Target, Layers } from 'lucide-react';
import {
  RECRUIT_TITLE,
  RECRUIT_DETAILS,
  RECRUIT_BUTTON_URL,
} from '@/constants/recruit';

const ICONS = {
  teamwork: <Users className="size-9 text-blue-500" />,
  expertise: <Lightbulb className="size-9 text-yellow-500" />,
  opportunity: <Target className="size-9 text-green-500" />,
  network: <Layers className="size-9 text-purple-500" />,
};

const RecruitSection = () => (
  <section className="mx-auto mt-20 max-w-[800px] px-4 text-center">
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
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* 가입하기 버튼 */}
    <div className="mb-24 mt-12 flex justify-center">
      <Button
        className="w-full bg-blue-200 text-blue-900 transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-700 dark:text-white dark:hover:bg-blue-500 sm:w-auto"
        asChild
      >
        <a href={RECRUIT_BUTTON_URL}>
          가입하기
          <ArrowRight className="ml-2 size-4" />
        </a>
      </Button>
    </div>
  </section>
);

export default RecruitSection;
