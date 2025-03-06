'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CalendarClock, User } from 'lucide-react';

// ProjectCard1 타입 정의
type ProjectCard1 = {
  id: number;
  title: string;
  author: string;
  category: string;
  relatedFields?: string[];
  deadline: string; // 모집마감일
};

interface ProjectCard1Props {
  cards: ProjectCard1[];
}

const ProjectCard1: React.FC<ProjectCard1Props> = ({ cards }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCardClick = (id: number) => {
    router.push(`/projects/hire/${id}`);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex cursor-pointer flex-col rounded-lg border p-4 shadow-lg dark:border-gray-800 dark:bg-gray-800 dark:text-white"
          onClick={() => handleCardClick(card.id)}
        >
          {/* 텍스트 영역 */}
          <div className="flex flex-grow flex-col justify-between">
            <div>
              {/* 프로젝트 제목 */}
              <h3 className="text-xl font-bold">{card.title}</h3>

              {/* 프로젝트 카테고리 + 관련 분야  */}
              <div className="mb-2 mt-2 flex items-center gap-2">
                <span className="rounded-full bg-blue-500 px-3 py-1 text-sm text-white">
                  {card.category}
                </span>

                {card.relatedFields?.length
                  ? card.relatedFields.map((field, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-300 px-3 py-1 text-sm text-gray-700"
                      >
                        #{field}
                      </span>
                    ))
                  : null}
              </div>

              {/* 작성자 정보 */}
              <p className="mt-1 flex items-center text-sm text-gray-600 dark:text-gray-400">
                <User className="mr-1 h-4 w-4 text-gray-700 dark:text-gray-300" />
                {card.author}
              </p>
            </div>

            {/* 마감일을 카드 하단에 고정 */}
            <p className="mt-4 flex items-center gap-2 font-bold text-gray-800 dark:text-gray-300">
              <CalendarClock className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              모집 마감 : {card.deadline}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard1;
