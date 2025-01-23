import Image from 'next/image';
import { Label } from '@/components/ui/label';
import NewsDirector from '@/components/NewsDirector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function About() {
  const eventData = [
    {
      imageSrc: '/example1.jpg',
      altText: 'MT Image',
      newsTitle: 'MT',
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
    { id: 1, src: '/logo1.png', alt: 'Logo 1' },
    { id: 2, src: '/logo2.png', alt: 'Logo 2' },
  ];

  return (
    <>
      {/* 임시 네비게이션 바 */}
      <nav
        style={{
          height: '70px',
          width: '100%',
          backgroundColor: 'black',
        }}
      ></nav>

      {/* 본문 콘텐츠 */}
      <main>
        <div className="mx-auto mt-[100px] flex w-full flex-col items-center gap-5 text-center">
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
            <TabsList className="mx-auto mb-10 mt-10 flex w-[80%] max-w-[330px] justify-center">
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

            <TabsContent
              value="event"
              className="mx-auto mb-28 w-full max-w-[850px]"
            >
              <div className="mb-12">
                <Label className="text-[26px] font-bold">행사</Label>
              </div>
              {eventData.map((data, index) => (
                <NewsDirector
                  key={index}
                  imageSrc={data.imageSrc}
                  altText={data.altText}
                  newsTitle={data.newsTitle}
                  newsContent={data.newsContent}
                  index={index}
                />
              ))}
            </TabsContent>

            <TabsContent
              value="project"
              className="mx-auto mt-6 w-full max-w-[900px]"
            >
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
                  우리는 다양한 기술 프로젝트를 통해 실제 문제를 해결하고, 협업
                  능력을 키우며 창의적인 아이디어를 실현하고 있습니다. 최신
                  기술을 적용한 웹 개발, 앱 개발, 그리고 머신 러닝 프로젝트 등
                  다양한 분야에서 활동하고 있습니다. 각 프로젝트는 팀워크와 문제
                  해결 능력을 향상시킬 수 있는 기회를 제공합니다. 함께 성장하며,
                  더 나은 세상을 위한 기술을 만들어 가고 있습니다.
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="support"
              className="mx-auto w-full max-w-[850px]"
            >
              <Label className="text-[26px] font-bold">교류</Label>
              <br />
              <p className="mt-10 text-[17px] leading-8">
                우리 동아리는 다양한 집단과의 협력과 네트워킹을 통해 서로의
                강점을 극대화하며 새로운 기회를 만들어가고 있습니다. 이러한
                소통은 우리의 시야를 넓히고, 동아리 활동에 새로운 동력을
                제공합니다. 함께하는 모든 순간이 우리를 더 단단하고 창의적으로
                만들며, 서로의 가치를 존중하는 가운데 지속 가능한 성장을
                추구합니다.
              </p>
              <div className="mb-20 mt-14 flex flex-wrap justify-center gap-6">
                {supportLogo.map((logo) => (
                  <Card
                    key={logo.id}
                    className="flex h-[150px] w-[300px] items-center justify-center overflow-hidden shadow-md" // flex 설정 추가
                  >
                    <CardContent className="flex h-full w-full items-center justify-center p-0">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={250}
                        height={150}
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Label className="text-[26px] font-bold">후원</Label>
              <p className="mt-10 text-[17px] leading-8">
                우리를 후원해주는 집단들은 우리의 성장과 발전을 위해 지속적인
                지원을 아끼지 않고 있습니다. 이들 후원은 동아리 활동을 더욱
                풍성하게 만들어주며, 다양한 프로젝트와 행사에서 중요한 역할을
                합니다. 또한, 후원자들과의 협력을 통해 실무 경험을 쌓고,
                실질적인 기술력 향상에 도움을 받고 있습니다. 우리 동아리는 이들
                후원자들과의 파트너십을 소중히 여기며, 상호 발전을 위한 지속적인
                교류를 이어가고 있습니다.
              </p>
              <div className="mb-28 mt-14 flex flex-wrap justify-center gap-6">
                {supportLogo.map((logo) => (
                  <Card
                    key={logo.id}
                    className="flex h-[150px] w-[300px] items-center justify-center overflow-hidden shadow-md" // flex 설정 추가
                  >
                    <CardContent className="flex h-full w-full items-center justify-center p-0">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={250}
                        height={150}
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="contact"
              className="mx-auto w-full max-w-[850px]"
            >
              <h2>hello4</h2>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      {/* 임시 푸터 */}
      <footer
        style={{
          height: '300px',
          width: '100%',
          backgroundColor: 'black',
        }}
      ></footer>
    </>
  );
}
