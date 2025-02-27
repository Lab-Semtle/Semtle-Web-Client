import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type PostCardProps = {
  id: number;
  title: string;
  writer: string;
  image_url?: string | string[];
  created_at: string;
  summary?: string;
};

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  writer,
  image_url,
  created_at,
  summary,
}) => {
  // 이미지가 배열일 경우 첫 번째 이미지를 사용
  const imageUrl = Array.isArray(image_url) ? image_url[0] : image_url;

  return (
    <Link href={`/secret/${id}`} className="group block w-[220px]">
      <Card className="rounded-lg bg-gray-100 shadow-md dark:bg-[#18181A]">
        {/* 대표 이미지 */}
        <div className="flex aspect-[3/2] overflow-clip rounded-xl">
          <div className="flex-1">
            <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
              <Image
                src={
                  imageUrl && imageUrl !== ''
                    ? imageUrl.startsWith('/') || imageUrl.startsWith('http')
                      ? imageUrl
                      : `/${imageUrl}`
                    : '/temp-server/sample-1.jpg'
                }
                alt={title}
                width={400}
                height={266}
                className="h-full w-full rounded-xl object-cover object-center"
              />
            </div>
          </div>
        </div>

        <CardContent className="p-3">
          <div className="mb-2 line-clamp-1 break-words text-sm font-medium md:mb-3 md:text-base lg:text-lg">
            {title}
          </div>

          {/* 요약 */}
          {summary && (
            <div className="mb-3 line-clamp-2 text-xs text-muted-foreground md:text-sm lg:mb-4">
              {summary}
            </div>
          )}
        </CardContent>

        {/* 게시물 날짜 & 작성자 */}
        <CardFooter className="flex items-center justify-between p-3 text-xs text-gray-500">
          <span>{writer}</span>
          <span>{formatDate(created_at)}</span>
        </CardFooter>

        {/* "Read More" 버튼 */}
        <div className="text-600 flex items-center p-3 text-xs font-medium text-semtle-lite dark:text-semtle-dark">
          Read more
          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Card>
    </Link>
  );
};

export default PostCard;

// 게시글 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/\. /g, '.')
    .replace(/\.$/, ''); // 마지막 점 제거
};
