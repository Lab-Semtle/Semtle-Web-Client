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
  index,
}) => {
  const isReverse = index % 2 === 1; // 짝수 인덱스일 때 반대 방향으로 출력

  return (
    <div
      className={`mb-10 flex items-start gap-4 ${isReverse ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <Card className="w-[200px]">
        <CardHeader className="p-2">
          <Image src={imageSrc} alt={altText} width={200} height={120} />
        </CardHeader>
      </Card>

      <div className="mt-3 flex flex-col justify-center">
        <Label className="text-lg font-semibold">{newsTitle}</Label>
        <Label className="mt-2 text-sm text-muted-foreground">
          {newsContent}
        </Label>
      </div>
    </div>
  );
};

export default NewsDirector;

