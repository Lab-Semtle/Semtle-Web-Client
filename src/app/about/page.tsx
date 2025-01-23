import Image from 'next/image';
import { Label } from '@/components/ui/label';
import NewsDirector from '@/components/NewsDirector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function About() {
  const eventData = [
    {
      imageSrc: '/example1.jpg',
      altText: 'MT Image',
      newsTitle: 'MT',
      newsContent: '우리 동아리의 MT는 새로운 멤버와 친목을 다지고, 함께 즐기는 다양한 액티비티로 구성됩니다. 매년 참가자들은 서로를 더욱 잘 이해하며, 강한 팀워크를 만들어가요.',
    },
    {
      imageSrc: '/example2.jpg',
      altText: 'E-Sports Image',
      newsTitle: 'E-Sports',
      newsContent: '기술과 협동을 중시하는 E-Sports 활동은 동아리의 중요한 부분입니다. 대회와 팀 경기를 통해 실력을 키우고, 서로 협력하는 법을 배우며, 경쟁의 재미를 느껴보세요.',
    },
    {
      imageSrc: '/example3.jpg',
      altText: 'Conference Image',
      newsTitle: '개총 / 종총',
      newsContent: '새로운 학기의 시작과 마무리를 기념하는 개강총회와 종강총회는 우리 동아리의 중요한 행사입니다. 모두가 함께 모여 한 해를 되돌아보고, 다가오는 학기를 준비하는 시간입니다.',
    },
    {
      imageSrc: '/example4.jpg',
      altText: 'Etc Image',
      newsTitle: '기타 활동',
      newsContent: '스터디, 워크숍, 세미나 등 다양한 활동을 통해 서로 배우고 성장하는 시간을 가집니다. 이러한 활동은 동아리 내에서뿐만 아니라, 기술 분야의 트렌드를 따라가는데도 중요한 기회를 제공합니다.',
    },
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
        <div className="mx-auto mt-[100px] flex w-full max-w-[800px] flex-col items-center text-center">
          <Label className="text-[30px] font-bold">About Us.</Label>
          <Label className="mt-4 text-lg">
            우리는 컴퓨터공학과 동아리로, 프로그래밍과 기술 개발에 열정을 가진
            학생들이 모인 공간입니다. 최신 기술 트렌드를 탐구하며 프로젝트와
            스터디를 통해 함께 성장하고 있습니다. 협업과 창의성을 바탕으로
            학문적 발전과 실무 경험을 동시에 추구합니다!
          </Label>
          <Tabs defaultValue="event" className="w-[800px]">
            <TabsList className="mb-16 mt-14 grid h-[40px] w-full grid-cols-4">
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

            <TabsContent value="event">
              <Label className="mb-[10px] text-[26px] font-bold">행사</Label>
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
            <TabsContent value="project">
              <h2>hello2</h2>
            </TabsContent>
            <TabsContent value="support">
              <h2>hello3</h2>
            </TabsContent>
            <TabsContent value="contact">
              <h2>hello4</h2>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
