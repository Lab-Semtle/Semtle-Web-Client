import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Label } from '@/components/ui/label';

type PostCardProps = {
  id: number;
  title: string;
  writer: string;
  image_url?: string;
  created_at: string;
};
const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  writer,
  image_url = '/semtle_logo_2022_square.jpg',
  created_at,
}) => {
  return (
    <div>
      <Card className="flex h-[255px] w-[210px] flex-col rounded-lg bg-gray-100 dark:bg-[#18181A]">
        <CardHeader className="flex-1 p-0">
          <CardTitle className="h-[170px] w-full">
            <Image
              src={image_url}
              alt={'Secret Post' + id}
              width={700}
              height={400}
              className="h-[185px] w-[210px] rounded-t-lg object-cover"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="ml-[-18px] flex flex-col">
          <Label className="text-[15px] font-semibold hover:underline dark:text-white">
            <Link href={`/secret/${id}`}>{title}</Link>
          </Label>
        </CardContent>
        <CardFooter className="flex w-full justify-between p-0 px-2 text-[11px]">
          <span className="text-left">{formatDate(created_at)}</span>
          <span className="text-right">{writer}</span>
        </CardFooter>
      </Card>
    </div>
  );
};
export default PostCard;
//NOTE - 게시글 날짜 Formatting
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/\. /g, '.')
    .replace(/\.$/, ''); // 마지막에 붙는 점 제거
};
