import { Label } from '@/components/ui/label';
import CardImageLabelList from '@/components/CardImageLabelList';

export default function Organization() {
  const cardCount = 8;
  const imageSrcs = [
    '/default_profile.png',
    '/default_profile.png',
    '/default_profile.png',
    '/default_profile.png',
    '/default_profile.png',
    '/default_profile.png',
    '/default_profile.png',
    '/default_profile.png',
  ];
  const altTexts = ['Card 1', 'Card 2', 'Card 3', 'Card 4','Card 1', 'Card 2', 'Card 3', 'Card 4'];
  const contentTitles = ['[회장]', '[부회장]', '[집행부]', '[집행부]','[집행부]', '[집행부]','[집행부]', '[집행부]'];
  const contentTexts = [
    '이름 홍길동 | 학번 00000000',
    '이름 홍길동 | 학번 00000000',
    '이름 홍길동 | 학번 00000000',
    '이름 홍길동 | 학번 00000000',
    '이름 홍길동 | 학번 00000000',
    '이름 홍길동 | 학번 00000000',
    '이름 홍길동 | 학번 00000000',
    '이름 홍길동 | 학번 00000000',
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
      <main className="mt-[100px] flex flex-col items-center">
        <Label className="text-[30px] font-bold">조직 구성원</Label>
        <div className="my-2 mt-[40px] w-[1100px] border-b-2 border-gray-400"></div>
        <div className="my-2 mb-[30px] w-[1100px] border-b-2 border-gray-400"></div>
        <CardImageLabelList
          cardCount={cardCount}
          imageSrcs={imageSrcs}
          altTexts={altTexts}
          contentTitles={contentTitles}
          contentTexts={contentTexts}
        />
      </main>
    </>
  );
}
