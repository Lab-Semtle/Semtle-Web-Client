import Image from 'next/image';
import { Label } from '@/components/ui/label';
import NewsDirector from '@/components/sections/NewsDirector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import KakaoMap from '@/components/common/KakaoMap';
import ButtonLink from '@/components/common/LinkButton';

export default function AboutPage() {
  const eventData = [
    {
      imageSrc: '/example4.jpg',
      altText: 'Seminar Image',
      newsTitle: '세미나',
      newsContent:
        '우리 동아리의 MT는 새로운 멤버와 친목을 다지고, 함께 즐기는 다양한 액티비티로 구성됩니다. 매년 참가자들은 서로를 더욱 잘 이해하며, 강한 팀워크를 만들어가요.',
    },
    {
      imageSrc: '/example1.jpg',
      altText: 'Conference Image',
      newsTitle: '공모전-경진대회 출전',
      newsContent:
        '우리 동아리의 MT는 새로운 멤버와 친목을 다지고, 함께 즐기는 다양한 액티비티로 구성됩니다. 매년 참가자들은 서로를 더욱 잘 이해하며, 강한 팀워크를 만들어가요.',
    },
    {
      imageSrc: '/example3.jpg',
      altText: 'Teamplay Image',
      newsTitle: 'Team Project',
      newsContent:
        '우리 동아리의 MT는 새로운 멤버와 친목을 다지고, 함께 즐기는 다양한 액티비티로 구성됩니다. 매년 참가자들은 서로를 더욱 잘 이해하며, 강한 팀워크를 만들어가요.',
    },
    {
      imageSrc: '/example2.jpg',
      altText: 'Home ComingDay Image',
      newsTitle: '홈 커밍데이',
      newsContent:
        '우리 동아리의 MT는 새로운 멤버와 친목을 다지고, 함께 즐기는 다양한 액티비티로 구성됩니다. 매년 참가자들은 서로를 더욱 잘 이해하며, 강한 팀워크를 만들어가요.',
    },
    {
      imageSrc: '/example1.jpg',
      altText: 'MT Image',
      newsTitle: 'MT',
      newsContent:
        '우리 동아리의 MT는 새로운 멤버와 친목을 다지고, 함께 즐기는 다양한 액티비티로 구성됩니다. 매년 참가자들은 서로를 더욱 잘 이해하며, 강한 팀워크를 만들어가요.',
    },
    {
      imageSrc: '/example1.jpg',
      altText: 'TeacherDay Image',
      newsTitle: '스승의 날 행사',
      newsContent:
        '우리 동아리의 MT는 새로운 멤버와 친목을 다지고, 함께 즐기는 다양한 액티비티로 구성됩니다. 매년 참가자들은 서로를 더욱 잘 이해하며, 강한 팀워크를 만들어가요.',
    },

    {
      imageSrc: '/example2.jpg',
      altText: 'E-Sports Image',
      newsTitle: 'E-Sports',
      newsContent:
        '기술과 협동을 중시하는 E-Sports 활동은 동아리의 중요한 부분입니다. 대회와 팀 경기를 통해 실력을 키우고, 서로 협력하는 법을 배우며, 경쟁의 재미를 느껴보세요.',
    },
    {
      imageSrc: '/example3.jpg',
      altText: 'Conference Image',
      newsTitle: '개총 / 종총',
      newsContent:
        '새로운 학기의 시작과 마무리를 기념하는 개강총회와 종강총회는 우리 동아리의 중요한 행사입니다. 모두가 함께 모여 한 해를 되돌아보고, 다가오는 학기를 준비하는 시간입니다.',
    },
    {
      imageSrc: '/example4.jpg',
      altText: 'Etc Image',
      newsTitle: '기타 활동',
      newsContent:
        '스터디, 워크숍, 세미나 등 다양한 활동을 통해 서로 배우고 성장하는 시간을 가집니다. 이러한 활동은 동아리 내에서뿐만 아니라, 기술 분야의 트렌드를 따라가는데도 중요한 기회를 제공합니다.',
    },
  ];
  const projectImages = ['/project1.jpg', '/project1.jpg', '/project1.jpg'];
  const supportLogo = [
    { logo: '/naver_cloud.webp', type: 'Logo 1' },
    { logo: '/maritime_ai.png', type: 'Logo 2' },
  ];
  const contactData = {
    address: '부산광역시 영도구 태종로 727 공학1관(B1) 3층 308호실',
    mapLocation: {
      latitude: 37.5665,
      longitude: 126.978,
    },
    generalContact: {
      Email: 'example@example.com',
      Kakao: 'https://example.com/kakao',
      Instagram: 'https://example.com/instagram',
    },
    devContact: {
      Github: 'https://github.com/example',
      Discord: 'https://discord.com/invite/example',
      Kakao: 'https://example.com/devkakao',
    },
  };
  return (
    <>
      <main>
        <div className="mx-auto mt-[150px] flex w-full flex-col items-center gap-5 text-center">
          <Label className="w-full max-w-[800px] text-[30px] font-bold">
            About Us.
          </Label>
          <Label className="mt-4 w-full max-w-[800px] text-lg leading-8">
            우리는 컴퓨터공학과 동아리로, 프로그래밍과 기술 개발에 열정을 가진
            학생들이 모인 공간입니다. 최신 기술 트렌드를 탐구하며 프로젝트와
            스터디를 통해 함께 성장하고 있습니다. 협업과 창의성을 바탕으로
            학문적 발전과 실무 경험을 동시에 추구합니다!
          </Label>

          <Tabs defaultValue="event" className="w-full">
            <TabsList className="mx-auto mb-10 mt-10 flex w-[85%] max-w-[326px] justify-center gap-1">
              <TabsTrigger value="event" className="text-[17px]">
                행사
              </TabsTrigger>
              <TabsTrigger value="project" className="text-[17px]">
                프로젝트
              </TabsTrigger>
              <TabsTrigger value="support" className="text-[17px]">
                교류/후원
              </TabsTrigger>
              <TabsTrigger value="contact" className="text-[17px]">
                Contact
              </TabsTrigger>
            </TabsList>
            {/* 행사 탭 */}
            <TabsContent
              value="event"
              className="mx-auto mb-28 w-full max-w-[950px]"
            >
              <div className="mb-12">
                <Label className="text-[26px] font-bold">행사</Label>
              </div>
              {eventData.map((data, index) => (
                <NewsDirector
                  key={index}
                  imageSrc={data.imageSrc}
                  newsTitle={data.newsTitle}
                  newsContent={data.newsContent}
                  index={index}
                />
              ))}
            </TabsContent>

            {/* 프로젝트 탭 */}
            <TabsContent
              value="project"
              className="mx-auto mt-6 w-full max-w-[900px]"
            >
              <ProjectTab projectImages={projectImages} />
            </TabsContent>
            {/* 교류 & 후원 탭 */}
            <TabsContent
              value="support"
              className="mx-auto w-full max-w-[850px]"
            >
              <SupportTab supportLogo={supportLogo} />
            </TabsContent>
            {/* Contact 탭 */}
            <TabsContent
              value="contact"
              className="mx-auto w-full max-w-[850px]"
            >
              <ContactTab contact={contactData} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
//NOTE - 프로젝트탭 컴포넌트
interface ProjectTabProps {
  projectImages: string[];
}
const ProjectTab: React.FC<ProjectTabProps> = ({ projectImages }) => {
  return (
    <div>
      <Label className="text-[26px] font-bold">프로젝트</Label>
      <Carousel className="mb-12 mt-6 w-full">
        <CarouselContent className="-ml-1">
          {projectImages.map((imageSrc, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-2">
                <Card>
                  <CardContent className="flex aspect-[2/3] items-center justify-center p-3">
                    <Image
                      src={imageSrc}
                      alt={`Project image ${index + 1}`}
                      width={500}
                      height={300}
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mb-20">
        <p className="text-[17px] leading-8">
          우리는 다양한 기술 프로젝트를 통해 실제 문제를 해결하고, 협업 능력을
          키우며 창의적인 아이디어를 실현하고 있습니다. 최신 기술을 적용한 웹
          개발, 앱 개발, 그리고 머신 러닝 프로젝트 등 다양한 분야에서 활동하고
          있습니다. 각 프로젝트는 팀워크와 문제 해결 능력을 향상시킬 수 있는
          기회를 제공합니다. 함께 성장하며, 더 나은 세상을 위한 기술을 만들어
          가고 있습니다.
        </p>
      </div>
    </div>
  );
};
//NOTE - 교류&후원탭 컴포넌트
interface supportLogo {
  logo: string;
  type: string;
}
interface SupportTab {
  supportLogo: supportLogo[];
}
const SupportTab: React.FC<SupportTab> = ({ supportLogo }) => {
  return (
    <div>
      <Label className="text-[26px] font-bold">교류</Label>
      <br />
      <p className="mt-10 text-[17px] leading-8">
        우리 동아리는 다양한 집단과의 협력과 네트워킹을 통해 서로의 강점을
        극대화하며 새로운 기회를 만들어가고 있습니다. 이러한 소통은 우리의
        시야를 넓히고, 동아리 활동에 새로운 동력을 제공합니다. 함께하는 모든
        순간이 우리를 더 단단하고 창의적으로 만들며, 서로의 가치를 존중하는
        가운데 지속 가능한 성장을 추구합니다.
      </p>
      <div className="mb-20 mt-14 flex flex-wrap justify-center gap-6">
        {supportLogo.map((partner, index) => (
          <Card
            key={index}
            className="flex h-[150px] w-[300px] items-center justify-center overflow-hidden shadow-md" // flex 설정 추가
          >
            <CardContent className="flex h-full w-full items-center justify-center p-0">
              <Image
                src={partner.logo}
                alt={partner.type}
                width={130}
                height={100}
                objectFit="cover"
                objectPosition="center"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <Label className="text-[26px] font-bold">후원</Label>
      <p className="mt-10 text-[17px] leading-8">
        우리를 후원해주는 집단들은 우리의 성장과 발전을 위해 지속적인 지원을
        아끼지 않고 있습니다. 이들 후원은 동아리 활동을 더욱 풍성하게
        만들어주며, 다양한 프로젝트와 행사에서 중요한 역할을 합니다. 또한,
        후원자들과의 협력을 통해 실무 경험을 쌓고, 실질적인 기술력 향상에 도움을
        받고 있습니다. 우리 동아리는 이들 후원자들과의 파트너십을 소중히 여기며,
        상호 발전을 위한 지속적인 교류를 이어가고 있습니다.
      </p>
      <div className="mb-28 mt-14 flex flex-wrap justify-center gap-6">
        {supportLogo.map((partner, index) => (
          <Card
            key={index}
            className="flex h-[150px] w-[300px] items-center justify-center overflow-hidden shadow-md" // flex 설정 추가
          >
            <CardContent className="flex h-full w-full items-center justify-center p-0">
              <Image
                src={partner.logo}
                alt={partner.type}
                width={130}
                height={100}
                objectFit="cover"
                objectPosition="center"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
//NOTE - Contact탭 컴포넌트
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
    <div>
      <Label className="text-[26px] font-bold">오시는 길</Label>
      <p className="mt-10 text-[17px] leading-8">{contact.address}</p>
      <div className="mb-20 mt-8 flex flex-wrap justify-center gap-6">
        <KakaoMap />
      </div>
      <Label className="text-[26px] font-bold">문의하기</Label>
      <p className="mb-3 mt-2 text-[17px]">
        더 궁금한 사항이 있거나 후원을 원하신다면 언제든 연락해 주세요!
      </p>
      <div className="mb-16 flex flex-wrap justify-center gap-4">
        {generalContacts.map((button, index) => (
          <ButtonLink
            key={index}
            buttonName={button.buttonName}
            link={button.link}
          />
        ))}
      </div>
      <Label className="text-[26px] font-bold">개발팀 문의하기</Label>
      <p className="mb-3 mt-2 text-[17px]">
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
