/** 개별 활동 카드 컴포넌트 */
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface Activity {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  category: string;
  onClick: (id: number) => void;
}

export default function ActivityCard1({
  id,
  title,
  content,
  image,
  date,
  category,
  onClick,
}: Activity) {
  return (
    <Card
      className="cursor-pointer overflow-hidden rounded-lg shadow-lg"
      onClick={() => onClick(id)}
    >
      <CardContent className="p-0">
        <div className="flex items-center">
          {/* 이미지 섹션 */}
          <div className="m-3 flex flex-[2] items-center justify-center overflow-hidden bg-white">
            <Image
              src={image || '/placeholder.svg'}
              alt=""
              width={500}
              height={500}
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
              className="rounded"
              priority
            />
          </div>

          {/* 텍스트 콘텐츠 섹션 */}
          <div className="mr-3 flex flex-[1] flex-col justify-between sm:flex">
            {/* 제목 */}
            <h3 className="mb-3 line-clamp-1 h-12 text-lg font-semibold">
              {title}
            </h3>
            {/* 내용 */}
            <p className="mb-4 line-clamp-3 min-h-[60px] text-gray-600">
              {content}
            </p>
            {/* 날짜 및 카테고리 */}
            <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
              <span>{format(new Date(date), 'yyyy.MM.dd')}</span>
              <span>{category}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
