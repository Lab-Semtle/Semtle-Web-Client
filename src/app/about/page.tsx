import Image from 'next/image';
import { Label } from '@/components/ui/label';
import NewsDirector from '@/components/NewsDirector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function About() {
  const eventData = [
    {
      imageSrc: '/example1.jpg',
      altText: 'Image 1',
      newsTitle: 'Title 1',
      newsContent: 'Content 1',
    },
    {
      imageSrc: '/example2.jpg',
      altText: 'Image 2',
      newsTitle: 'Title 2',
      newsContent: 'Content 2',
    },
    {
      imageSrc: '/example3.jpg',
      altText: 'Image 3',
      newsTitle: 'Title 3',
      newsContent: 'Content 3',
    },
    {
      imageSrc: '/example4.jpg',
      altText: 'Image 4',
      newsTitle: 'Title 4',
      newsContent: 'Content 4',
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
              <Label className="text-[26px] font-bold">행사</Label>
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
