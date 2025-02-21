"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // useRouter 사용
import Image from "next/image";

const CardListC = ({ cards, onDelete }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const router = useRouter(); // 라우터 객체 생성

  // 카드 더블클릭 시 선택 상태 변경
  const handleCardDoubleClick = (id) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else {
      setSelectedCards([...selectedCards, id]);
    }
  };

  // 카드 클릭 시 상세 페이지 이동
  const handleCardClick = (id) => {
    router.push(`/projects/completed/post/${id}`); // 동적 라우팅 이동
  };

  // 삭제 버튼 클릭 처리
  const handleDeleteSelected = () => {
    onDelete(selectedCards);
    setSelectedCards([]);
  };

  return (
    <div>
      {selectedCards.length > 0 && (
        <div className="mb-4 flex items-center">
          <button
            className="mr-4 rounded-md bg-red-500 px-4 py-2 text-white"
            onClick={handleDeleteSelected}
          >
            선택된 카드 삭제
          </button>
          <span className="text-lg font-semibold">{selectedCards.length}개 선택됨</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flex h-full cursor-pointer flex-col border p-4 transition-all duration-200 ${
              selectedCards.includes(card.id) ? "bg-blue-100" : ""
            }`}
            onDoubleClick={() => handleCardDoubleClick(card.id)}
            onClick={() => handleCardClick(card.id)} // 클릭 시 상세 페이지 이동
          >
            <Image
              src={card.image}
              alt={card.title}
              width={300}
              height={200}
              className="h-full max-h-48 w-full object-cover"
            />

            <div className="flex flex-1 flex-col justify-between p-4">
              <div className="mb-2">
                <span className="rounded-full bg-blue-500 px-4 py-1 text-white">
                  #{card.projectType}
                </span>
              </div>
              <div className="mb-2">
                {card.category.map((category, index) => (
                  <span
                    key={index}
                    className="mb-2 mr-2 inline-block rounded-full bg-gray-300 px-4 py-1 text-gray-700"
                  >
                    #{category}
                  </span>
                ))}
              </div>
              <h3 className="mt-2 truncate text-lg font-bold">{card.title}</h3>
              <p className="mt-2 line-clamp-3 text-gray-600">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardListC;
