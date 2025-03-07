'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Users, ImageOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type ProjectCard2 = {
  id: number;
  image?: string;
  category: string;
  relatedFields?: string[];
  title: string;
  summary?: string;
  duration?: string;
  participants?: number;
};

// Props 타입 정의
interface CardListCProps {
  cards: ProjectCard2[];
  renderActions?: (id: number) => React.ReactElement; // 삭제 버튼 추가를 위한 콜백
}

const ProjectCard2: React.FC<CardListCProps> = ({ cards, renderActions }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex h-full flex-col border bg-slate-200 p-4 shadow-md transition-all duration-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-800 dark:text-white dark:shadow-gray-700/50"
        >
          {/* 카드 이미지 */}
          {card.image ? (
            <div
              className="h-48 w-full cursor-pointer overflow-hidden rounded-lg"
              onClick={() => router.push(`/projects/showcase/${card.id}`)}
            >
              <Image
                src={card.image}
                alt={card.title}
                width={300}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-52 w-full items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700">
              <ImageOff className="h-10 w-10 text-gray-500 dark:text-gray-400" />
            </div>
          )}

          {/* 카드 정보 */}
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <Badge variant="default">{card.category}</Badge>

              {/* 연관 필드 태그 */}
              {card.relatedFields && card.relatedFields.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {card.relatedFields.map((field, index) => (
                    <Badge key={index} variant="secondary">
                      #{field}
                    </Badge>
                  ))}
                </div>
              )}

              {/* 프로젝트 제목 */}
              <h3
                className="mt-3 cursor-pointer truncate text-lg font-bold hover:underline"
                onClick={() => router.push(`/projects/showcase/${card.id}`)}
              >
                {card.title}
              </h3>

              {/* 프로젝트 설명 */}
              <p className="mt-2 text-gray-800 dark:text-gray-300">
                {card.summary || '설명 없음'}
              </p>

              {/* 프로젝트 진행 정보 */}
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {card.duration || '미정'}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {card.participants ? `${card.participants}명` : '미정'}
                </p>
              </div>
            </div>

            {/* 삭제 버튼 추가 */}
            {renderActions && renderActions(card.id)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard2;
