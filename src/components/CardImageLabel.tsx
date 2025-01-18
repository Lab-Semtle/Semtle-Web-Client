import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// CardImageLabel 컴포넌트의 props를 수정
type CardImageLabelProps = {
  imageSrc: string;
  altText: string;
  contentTitle?: string;
  contentText: string;
  isHidden?: string; // 선택적인 프로퍼티로 설정
};

const CardImageLabel: React.FC<CardImageLabelProps> = ({
  imageSrc,
  altText,
  contentTitle,
  contentText,
  isHidden,
}) => {
  return (
    // CardImageLabel 컴포넌트의 구조 예시
    <div className="relative">
      <Card className="flex h-[300px] w-[250px] flex-col overflow-hidden rounded-lg bg-gray-100">
        <CardHeader className="flex-1 p-0">
          <CardTitle className="h-[150px] w-full">
            <img
              src={imageSrc}
              alt={altText}
              className="h-full w-full rounded-t-lg object-cover"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center p-2 text-center text-sm text-gray-800">
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
