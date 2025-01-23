import React from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Card, CardHeader } from '@/components/ui/card';

type NewsDirectorProps = {
  imageSrc: string;
  altText: string;
  newsTitle: string;
  newsContent: string;
  index: number;
};

const NewsDirector: React.FC<NewsDirectorProps> = ({
    imageSrc,
    altText,
    newsTitle,
    newsContent,
    index = 0, // 기본값 추가
  }) => {
    return (
      <div
        className={`mb-10 flex ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'} items-center gap-6`}
      >
        {/* 이미지 카드 */}
        <Card className="w-[300px]"> {/* 카드 너비 확대 */}
          <CardHeader className="p-0">
            <Image
              src={imageSrc}
              alt={altText}
              width={300} 
              height={180} 
              className="object-cover w-full h-full" // 너비와 높이를 꽉 채워서 표시
            />
          </CardHeader>
        </Card>
  
        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-2">
          <Label className={`${index % 2 === 1 ?'ml-[33rem]':''} text-lg font-semibold text-left`}>{newsTitle}</Label>
          <Label className="text-sm text-muted-foreground text-left">{newsContent}</Label>
        </div>
      </div>
    );
  };
  

export default NewsDirector;

