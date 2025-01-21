import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type CardImageLabelProps = {
  imageSrc: string;
  altText: string;
  contentTitle?: string;
  contentText: string;
  isHidden?: string;
};

const CardImageLabel: React.FC<CardImageLabelProps> = ({
  imageSrc,
  altText,
  contentTitle,
  contentText,
  isHidden,
}) => {
  return (
    <div className="relative">
      <Card className="flex h-[300px] w-[250px] flex-col overflow-hidden rounded-lg bg-gray-100">
        <CardHeader className="flex-1 p-0">
          <CardTitle className="h-[170px] w-full">
            <img
              src={imageSrc}
              alt={altText}
              className="h-full w-full rounded-t-lg object-cover"
            />
          </CardTitle>
        </CardHeader>
        <CardContent
          className={`flex flex-1 flex-col items-center gap-4 p-2 text-center text-sm text-gray-800${contentTitle ? '' : 'justify-center'}`}
        >
          <CardTitle>{contentTitle}</CardTitle>
          <CardDescription>{contentText}</CardDescription>
        </CardContent>
      </Card>
      {isHidden && (
        <div className="absolute bottom-[-25px] w-full text-center text-base font-bold text-gray-800">
          <CardDescription className="mt-2 text-center text-base font-bold text-gray-800">
            {isHidden}
          </CardDescription>
        </div>
      )}
    </div>
  );
};

export default CardImageLabel;
