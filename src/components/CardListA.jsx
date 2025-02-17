'use client';
import { useRouter } from 'next/navigation'; // next/router 대신 next/navigation 사용
import { useState, useEffect } from 'react';
import Image from 'next/image';

const CardListA = ({ cards }) => {
  const [isClient, setIsClient] = useState(false); // 클라이언트 여부 상태
  const router = useRouter(); // next/navigation에서 가져오는 useRouter

  useEffect(() => {
    setIsClient(true);  // 클라이언트에서만 실행되도록 설정
  }, []);

  const handleCardClick = (id) => {
    // 동적 경로로 이동
  router.push(`/projects/active/post/${id}`);
  };

  if (!isClient) {
    return null; // 클라이언트 사이드에서만 렌더링
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.id} 
          className="flex flex-col rounded-lg border p-4 shadow-md cursor-pointer"
          onClick={() => handleCardClick(card.id)} // 카드 클릭 이벤트 추가
        >
          {/* 이미지 영역 */}
          <div className="relative h-40 w-full">
            <Image
              src={card.image}
              alt={card.title}
              layout="fill"
              className="rounded-md object-cover"
            />
          </div>

          {/* 텍스트 영역 */}
          <div className="flex flex-col flex-grow mt-4">
            {/* 프로젝트 타입 */}
            <div className="mb-2">
              <span className="rounded-full bg-blue-500 px-4 py-1 text-sm text-white">
                #{card.projectType}
              </span>
            </div>

            {/* 관련 분야 */}
            <div className="mb-2 flex flex-wrap gap-2">
              {card.category.map((category, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-300 px-4 py-1 text-sm text-gray-700"
                >
                  #{category}
                </span>
              ))}
            </div>

            {/* 제목 및 날짜 정보 */}
            <h3 className="mt-2 text-lg font-bold truncate">{card.title}</h3>
            <p className="text-gray-600">📅 게시 일자: {card.postDate}</p>
            <p className="text-gray-600">⏳ 마감 일자: {card.deadline}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardListA;
