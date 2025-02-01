import React from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Card, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

const truncateNewsContent = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};
type NewsDirectorProps = {
  id?: number;
  imageSrc: string;
  newsTitle: string;
  newsContent: string;
  link_url?: string;
  index: number;
};
const NewsDirector: React.FC<NewsDirectorProps> = ({
  id,
  imageSrc,
  newsTitle,
  newsContent,
  link_url,
  index = 0,
}) => {
  newsContent = truncateNewsContent(newsContent, 140);
  return (
    <div
      className={`mb-10 flex ${
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
      } items-start gap-6`}
    >
      <Card className="w-[250px] flex-shrink-0">
        <CardHeader className="p-0">
          <Image
            src={imageSrc}
            alt={'News' + id}
            width={350}
            height={200}
            className="h-full w-full object-cover"
          />
        </CardHeader>
      </Card>

      <div className="mt-8 flex flex-grow flex-col gap-2">
        {link_url ? (
          <Link href={link_url}>
            <Label
              className={`cursor-pointer text-left text-lg font-semibold hover:underline ${
                index % 2 === 0 ? '' : 'ml-[31.5rem]'
              } whitespace-nowrap`}
            >
              {newsTitle}
            </Label>
          </Link>
        ) : (
          <Label
            className={`text-left text-lg font-semibold ${
              index % 2 === 0 ? '' : 'ml-[34rem]'
            } whitespace-nowrap`}
          >
            {newsTitle}
          </Label>
        )}
        <Label className="text-left text-[15px] text-muted-foreground">
          {newsContent}
        </Label>
      </div>
    </div>
  );
};

export default NewsDirector;