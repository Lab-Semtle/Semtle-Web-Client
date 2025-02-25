'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import GoUp from '@/components/common/GoUp';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Activity {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  category: string;
}

// 고정된 더미 데이터
const dummyActivities = [
  {
    id: 1,
    title: '세미나: React로 멋진 UI 만들기',
    content:
      'React를 활용하여 인터랙티브한 UI를 만드는 방법에 대해 배워봅시다.',
    image: '/1.jpg',
    date: '2024-01-05T10:00:00.000Z',
    category: '세미나',
  },
  {
    id: 2,
    title: '행사: 해커톤 대회 개최',
    content:
      '팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! 팀을 구성하여 24시간 동안 창의적인 프로젝트를 만들어보세요! ',
    image: '/2.jpg',
    date: '2024-01-10T14:00:00.000Z',
    category: '행사',
  },
  {
    id: 3,
    title: '기타: 커뮤니티 모임',
    content: '개발자들과 만나 네트워킹을 하고 다양한 주제에 대해 이야기해봐요.',
    image: '/3.jpg',
    date: '2024-01-15T18:00:00.000Z',
    category: '기타',
  },
  {
    id: 4,
    title: '세미나: TypeScript 마스터하기',
    content:
      'TypeScript를 활용한 타입 안전성과 코드 품질 향상에 대해 알아봅시다.',
    image: '/4.jpg',
    date: '2024-01-20T09:00:00.000Z',
    category: '세미나',
  },
];

export default function ActivitiesPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [page] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [category, setCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fetchActivities = async (pageNum: number) => {
    const pagedActivities = dummyActivities.map((activity) => ({
      ...activity,
      id: activity.id,
    }));

    setActivities((prev) =>
      [...prev, ...pagedActivities].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    );
  };

  useEffect(() => {
    setActivities([]);
    fetchActivities(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredActivities = activities.filter(
    (activity) => category === 'all' || activity.category === category,
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePostClick = (id: number) => {
    router.push(`/activities/${id}`);
  };

  return (
    <div className="container mx-auto mt-[60px] max-w-4xl p-4">
      <div className="mb-6 mt-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex gap-2">
            <div className="rounded-lg shadow-lg">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="세미나">세미나</SelectItem>
                  <SelectItem value="행사">행사</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <div className="relative flex-1 rounded-lg shadow-lg">
              <Input placeholder="검색어를 입력하세요" className="pl-10" />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
            </div>
            <Button variant="secondary" className="shadow-lg">
              검색
            </Button> */}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredActivities.map((activity) => (
          <Card
            key={activity.id}
            className="cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={() => handlePostClick(activity.id)}
          >
            <CardContent className="p-0">
              <div className="flex items-center">
                {/* <div className="flex items-center justify-center ml-2">
                  <Checkbox
                    checked={selectedIds.includes(activity.id)}
                    onCheckedChange={() => handleSelect(activity.id)}
                    onClick={(e) => e.stopPropagation()} 
                  />
                </div> */}
                {/* 이미지 섹션 */}
                <div className="m-3 flex flex-[2] items-center justify-center overflow-hidden bg-white">
                  <Image
                    src={activity.image || '/placeholder.svg'}
                    alt=""
                    width={500}
                    height={500}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: 'auto',
                    }}
                    className="rounded"
                    priority
                  />
                </div>

                {/* 텍스트 콘텐츠 섹션 */}
                <div className="mr-3 flex hidden flex-[1] flex-col justify-between sm:flex">
                  {/* 제목 */}
                  <h3 className="mb-3 line-clamp-1 h-12 text-lg font-semibold">
                    {activity.title}
                  </h3>
                  {/* 내용 */}
                  <p className="mb-4 line-clamp-3 min-h-[60px] text-gray-600">
                    {activity.content}
                  </p>
                  {/* 날짜 및 카테고리 */}
                  <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                    <span>{format(new Date(activity.date), 'yyyy.MM.dd')}</span>
                    <span>{activity.category}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <GoUp
        onClick={scrollToTop}
        className={`group fixed bottom-8 right-8 rounded-full bg-white p-3 text-primary-foreground shadow-lg transition-all duration-300 hover:bg-semtleColor ${
          showScrollTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-10 opacity-0'
        }`}
      ></GoUp>
    </div>
  );
}
