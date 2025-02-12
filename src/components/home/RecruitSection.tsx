// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { ArrowRight } from 'lucide-react';

// const RecruitSection = () => (
//   <section className="mx-auto mt-16 max-w-[800px] px-4 text-center">
//     <h2 className="mb-3 text-pretty text-2xl font-semibold md:mb-4 md:text-3xl lg:mb-5 lg:text-4xl">
//       Recruiting
//     </h2>
//     <div className="relative">
//       <Image
//         src="/test1.jpg"
//         alt="Join Image"
//         width={1000}
//         height={150}
//         className="rounded-lg sm:mx-0"
//       />
//       <div className="mb-48 mt-6 flex justify-center">
//         <Button
//           className="w-full bg-blue-200 text-blue-900 transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-700 dark:text-white dark:hover:bg-blue-500 sm:w-auto"
//           asChild
//         >
//           <a href="/recruit">
//             가입하기
//             <ArrowRight className="ml-2 size-4" />
//           </a>
//         </Button>
//       </div>
//     </div>
//   </section>
// );

// export default RecruitSection;

import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Lightbulb, Target, Layers } from 'lucide-react';

const RecruitSection = () => (
  <section className="mx-auto mt-20 max-w-[800px] px-4 text-center">
    {/* 섹션 제목 */}
    <h2 className="mb-24 text-pretty text-center text-3xl font-extrabold md:mb-20 md:text-4xl lg:mb-16 lg:max-w-3xl lg:text-5xl">
      RECRUIT.
    </h2>

    {/* 모집 상세 */}
    <div className="mb-20 grid gap-10 text-center md:grid-cols-2 md:gap-14 lg:gap-16">
      <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
        <Users className="size-9 text-blue-500" />
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">팀워크 중심</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            협업을 중시하며, 서로의 강점을 살려 프로젝트를 진행합니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
        <Lightbulb className="size-9 text-yellow-500" />
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">전문성 강화</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            각 분야의 전문가들과 함께 성장하는 환경을 제공합니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
        <Target className="size-9 text-green-500" />
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">다양한 기회</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            대회 및 프로젝트 참여 기회를 통해 실력을 쌓을 수 있습니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
        <Layers className="size-9 text-purple-500" />
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">탄탄한 네트워크</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            졸업 후에도 지속되는 인맥과 업계 네트워크를 제공합니다.
          </p>
        </div>
      </div>
    </div>

    {/* 가입하기 버튼 */}
    <div className="mb-24 mt-12 flex justify-center">
      <Button
        className="w-full bg-blue-200 text-blue-900 transition-colors hover:bg-blue-600 hover:text-white dark:bg-blue-700 dark:text-white dark:hover:bg-blue-500 sm:w-auto"
        asChild
      >
        <a href="/recruit">
          가입하기
          <ArrowRight className="ml-2 size-4" />
        </a>
      </Button>
    </div>
  </section>
);

export default RecruitSection;
