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
  index = 0,
}) => {
  return (
    <div
      className={`mb-10 flex ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'} items-start gap-6`}
    >
      {/* 이미지 카드 */}
      <Card className="w-[250px] flex-shrink-0">
        <CardHeader className="p-0">
          <Image
            src={imageSrc}
            alt={altText}
            width={350} // 고정된 너비
            height={200} // 고정된 높이
            className="h-full w-full object-cover"
          />
        </CardHeader>
      </Card>

      {/* 텍스트 영역 */}
      <div className="flex flex-grow flex-col gap-2">
        <Label
          className={`text-left text-lg font-semibold ${index % 2 === 1 ? 'ml-[31.5rem]' : ''} whitespace-nowrap`}
        >
          {newsTitle}
        </Label>
        <Label className="break-words text-left text-[17px] text-muted-foreground">
          {newsContent}
        </Label>
      </div>
    </div>
  );
};

export default NewsDirector;
