import React from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Card, CardHeader } from '@/components/ui/card';

type NewsDirectorProps = {
  imageSrc: string;
  altText: string;
  newsTitle: string;
  newsContent: string;
  isReverse?: boolean;
};

const NewsDirector: React.FC<NewsDirectorProps> = ({
  imageSrc,
  altText,
  newsTitle,
  newsContent,
  isReverse = false,
}) => {
  return (
    <div
      className={`mb-10 flex items-start gap-4 ${isReverse ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <Card className="w-[200px]">
        <CardHeader className="p-2">
          <Image src={imageSrc} alt={altText} width={200} height={120} />
        </CardHeader>
      </Card>

      <div className="mt-3 flex flex-col">
        <Label
          className={`text-lg font-semibold ${isReverse ? 'ml-[46.5rem]' : ''}`}
        >
          {newsTitle}
        </Label>
        <Label className="mt-2 text-sm text-muted-foreground">
          {newsContent}
        </Label>
      </div>
    </div>
  );
};

export default NewsDirector;
