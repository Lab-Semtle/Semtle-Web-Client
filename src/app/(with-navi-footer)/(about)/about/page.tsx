import Image from 'next/image';
import { Label } from '@/components/ui/label';
import NewsDirector from '@/components/sections/NewsDirector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import KakaoMap from '@/components/common/KakaoMap';
import ButtonLink from '@/components/common/LinkButton';
import {
  eventData,
  projectImages,
  supportLogo,
  contactData,
} from '@/constants/AboutData';
import PageHeading from '@/components/common/PageHeading';
import TextGradientScroll from '@/components/animation/TextGradientScroll';
import { FadeUp } from '@/components/animation/FadeUp';

const tabTriggerClasses = `text-[19px] transition-colors duration-300 ease-in-out 
   text-gray-500 dark:text-gray-300 
   hover:text-semtle-lite dark:hover:text-semtle-dark 
   data-[state=active]:border-b-2 data-[state=active]:border-semtle-lite 
   data-[state=active]:bg-semtle-lite data-[state=active]:font-bold 
   data-[state=active]:text-white 
   dark:data-[state=active]:border-semtle-dark 
   dark:data-[state=active]:bg-semtle-dark dark:data-[state=active]:text-black`;

export default function AboutPage() {
  return (
    <>
      <main className="flex flex-col items-center px-6 pb-32 pt-24">
        <PageHeading
          title="About Us."
          description="아치셈틀과 함께 배우고 성장하세요. 
                  프로그래밍에 관심 있는 누구나 지원할 수 있습니다! 😺"
        />
        <TextGradientScroll
          className="max-w-[800px] whitespace-pre-wrap text-center text-xl leading-8"
          text={`아치셈틀은 인공지능과 컴퓨터 프로그래밍에 관심을 가진 학생들이 함께 모여 
 서로 소통하고, 지식을 나누며, 새로운 것에 도전하기 위해 만들어진 국립한국해양대학교 인공지능공학부 소속 학술연구회입니다.
 단순히 기술을 활용하는 것 이상의 가치를 탐구하며, 이론적 지식을 쌓는 것에 그치지 않고 함께 문제를 해결하는 과정에서 배움의 의미를 찾고자 노력하고 있습니다.
          
  2025년, 새롭게 리뉴얼된 아치셈틀은 세미나, 스터디, 프로젝트 등의 기회를 자유롭게 탐색하고 참여할 수 있는 플랫폼을 제공합니다. 
 또한, 기존에도 이어온 MT, 체육대회, 홈커밍데이와 같은 다양한 교류 활동을 통해 선후배간의 활발한 소통을 경험할 수 있습니다.
 
 초심자에게는 첫 걸음을 내딛을 수 있도록 길잡이가 되어주고, 경험자에게는 협업을 통한 실전 경험과 프로젝트 기회를 제공하여
 지속적으로 성장할 수 있는 환경을 제공합니다.`}
        />

        <Tabs defaultValue="event" className="mt-24 w-full">
          <TabsList className="mx-auto mb-10 mt-10 flex w-[85%] max-w-[370px] justify-center gap-1">
            <TabsTrigger value="event" className={tabTriggerClasses}>
              행사
            </TabsTrigger>
            <TabsTrigger value="project" className={tabTriggerClasses}>
              프로젝트
            </TabsTrigger>
            <TabsTrigger value="support" className={tabTriggerClasses}>
              교류|후원
            </TabsTrigger>
            <TabsTrigger value="contact" className={tabTriggerClasses}>
              문의|연락
            </TabsTrigger>
          </TabsList>
          {/* 행사 탭 */}
          <TabsContent
            value="event"
            className="mx-auto mb-28 w-full max-w-[950px]"
          >
            <div className="flex flex-col gap-12">
              {eventData.map((data, index) => (
                <FadeUp key={index} direction="up" className="w-full">
                  <NewsDirector
                    key={index}
                    imageSrc={data.imageSrc}
                    newsTitle={data.newsTitle}
                    newsContent={data.newsContent}
                    index={index}
                  />
                </FadeUp>
              ))}
            </div>
          </TabsContent>

          {/* 프로젝트 탭 */}
          <TabsContent
            value="project"
            className="mx-auto mt-6 w-full max-w-[900px]"
          >
            <ProjectTab projectImages={projectImages} />
          </TabsContent>
          {/* 교류 & 후원 탭 */}
          <TabsContent value="support" className="mx-auto w-full max-w-[850px]">
            <SupportTab supportLogo={supportLogo} />
          </TabsContent>
          {/* Contact 탭 */}
          <TabsContent value="contact" className="mx-auto w-full max-w-[850px]">
            <ContactTab contact={contactData} />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

/** 프로젝트탭 컴포넌트 */
interface ProjectTabProps {
  projectImages: string[];
}
const ProjectTab: React.FC<ProjectTabProps> = ({ projectImages }) => {
  return (
    <div>
      <Carousel className="mb-12 mt-6 w-full">
        <CarouselContent className="-ml-1">
          {projectImages.map((imageSrc, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                <Image
                  src={imageSrc}
                  alt={`Project image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-[-3rem] top-1/2 -translate-y-1/2 transform bg-blue-300 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-400" />
        <CarouselNext className="absolute right-[-3rem] top-1/2 -translate-y-1/2 transform bg-blue-300 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-400" />
      </Carousel>
      <div className="mb-20 text-lg leading-8 text-gray-900 dark:text-gray-100 md:text-xl">
        아치셈틀에서는 해커톤, 경진대회, 사이드 프로젝트 등 다양한 활동을
        학회원들이 자율적으로 팀을 꾸려 참여할 수 있도록 지원합니다. 아치셈틀은
        AI와 컴퓨터 프로그래밍 관련 행사를 주기적으로 찾아 소개하며, 해당
        사이트를 통해 학회원들이 보다 쉽게 팀을 구할 수 있도록 돕고 있습니다.
        또한, 아치셈틀의 이름으로 프로젝트를 진행하면 학과 사무실을 통해 지원금
        혜택도 제공받을 수 있습니다.
      </div>
    </div>
  );
};

/** 교류 & 후원탭 */
interface SupportLogo {
  logo: string;
  type: string;
}

interface SupportTabProps {
  supportLogo: SupportLogo[];
}

const SupportTab: React.FC<SupportTabProps> = ({ supportLogo }) => {
  return (
    <div className="text-center">
      {/* 교류 섹션 */}
      <div className="mt-12 flex justify-center">
        <Label className="text-2xl font-bold md:text-3xl">교류</Label>
      </div>
      <p className="mt-10 text-left text-xl leading-8">
        현재 같은 인공지능공학부 소속 <b>코인즈</b>와 네트워킹을 진행 중이며,
        추후 해양대학교 내 <b>다른 학부 학회 및 동아리</b>와의 교류를 계획하고
        있습니다. 나아가 타 대학 동아리와의 협업도 준비 중입니다.
      </p>

      {/* 교류 로고 섹션 */}
      <div className="mb-20 mt-14 flex flex-wrap items-center justify-center gap-8">
        {supportLogo.map((partner, index) => (
          <Image
            key={index}
            src={partner.logo}
            alt={partner.type}
            width={150}
            height={80}
            className="h-[80px] w-auto opacity-80 transition-opacity duration-300 hover:opacity-100"
          />
        ))}
      </div>

      {/* 후원 섹션 */}
      <div className="flex justify-center">
        <Label className="text-2xl font-bold md:text-3xl">후원</Label>
      </div>
      <p className="mt-10 text-left text-xl leading-8">
        현재 아치셈틀은 <b>인공지능공학부</b>의 공식 지원을 받고 있으며,
        <b>Naver Cloud</b> 후원도 준비 중에 있습니다. 앞으로 더 다양한 기업 및
        단체의 후원을 통해 학회원들에게 더욱 많은 기회와 지원을 제공할 수 있도록
        노력하겠습니다.
      </p>

      {/* 후원 로고 섹션 */}
      <div className="mb-28 mt-14 flex flex-wrap items-center justify-center gap-8">
        {supportLogo.map((partner, index) => (
          <Image
            key={index}
            src={partner.logo}
            alt={partner.type}
            width={150}
            height={80}
            className="h-[80px] w-auto opacity-80 transition-opacity duration-300 hover:opacity-100"
          />
        ))}
      </div>
    </div>
  );
};

/** Contact탭 */
interface ContactInfo {
  address: string;
  mapLocation: { latitude: number; longitude: number };
  generalContact: { Email: string; Kakao: string; Instagram: string };
  devContact: { Github: string; Discord: string; Kakao: string };
}
interface ContactTabProps {
  contact: ContactInfo;
}
const ContactTab: React.FC<ContactTabProps> = ({ contact }) => {
  const generalContacts = Object.entries(contact.generalContact).map(
    ([key, value]) => ({
      buttonName: key,
      link: key === 'Email' ? `mailto:${value}` : value,
    }),
  );
  const devContacts = Object.entries(contact.devContact).map(
    ([key, value]) => ({
      buttonName: key,
      link: value,
    }),
  );
  return (
    <div className="text-center">
      <Badge className="bg-semtle-lite text-lg text-white hover:bg-semtle-dark dark:bg-semtle-dark dark:text-black dark:hover:bg-semtle-lite">
        {contact.address}
      </Badge>

      <div className="mb-20 mt-4 flex flex-wrap justify-center gap-2 rounded-lg shadow-lg">
        <KakaoMap />
      </div>
      <div className="mb-2 flex justify-center">
        <Label className="text-3xl font-bold">문의하기</Label>
      </div>
      <p className="mb-10 mt-2 text-[17px]">
        더 궁금한 사항이 있거나 후원을 원하신다면 언제든 연락해 주세요!
      </p>
      <div className="mb-24 flex flex-wrap justify-center gap-4">
        {generalContacts.map((button, index) => (
          <ButtonLink
            key={index}
            buttonName={button.buttonName}
            link={button.link}
          />
        ))}
      </div>
      <div className="mb-2 flex justify-center">
        <Label className="text-3xl font-bold">개발팀 문의하기</Label>
      </div>
      <p className="mb-10 mt-2 text-[17px]">
        개발팀 관련 문의는 아래 링크를 통해 연락해 주세요.
      </p>
      <div className="mb-20 flex flex-wrap justify-center gap-4">
        {devContacts.map((button, index) => (
          <ButtonLink
            key={index}
            buttonName={button.buttonName}
            link={button.link}
          />
        ))}
      </div>
    </div>
  );
};
