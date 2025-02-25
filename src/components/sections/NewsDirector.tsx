import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const truncateNewsContent = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
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
  const isReversed = index % 2 !== 0; // 짝수/홀수에 따라 정렬 변경
  const truncatedContent = truncateNewsContent(newsContent, 140);

  return (
    <div
      className={`grid gap-6 overflow-hidden rounded-xl border border-border md:grid-cols-2 lg:gap-8`}
    >
      {/* 이미지 영역 (짝수: 왼쪽, 홀수: 오른쪽) */}
      <div
        className={`md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem] ${
          isReversed ? 'md:order-last' : ''
        }`}
      >
        <Image
          src={imageSrc}
          alt={newsTitle}
          width={500}
          height={300}
          className="aspect-[16/9] h-full w-full object-cover object-center"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        <h3 className="mb-3 text-xl font-medium md:mb-4 md:text-3xl lg:mb-6">
          {newsTitle}
        </h3>
        <p className="text-gray-800 text-muted-foreground dark:text-gray-200 lg:text-xl">
          {truncatedContent}
        </p>

        {/* 더 보기 버튼 (링크가 존재하는 경우) */}
        {link_url && (
          <Link
            href={link_url}
            className="mt-4 flex items-center text-sm font-medium text-semtle-lite transition-colors hover:text-semtle-dark md:text-base lg:text-lg"
          >
            더 보기
            <ArrowRight className="ml-2 size-4 transition-transform hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NewsDirector;
