import { useState } from 'react';
import Image from 'next/image';

const CardListC = ({ cards, onDelete }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  // 카드 더블클릭 시 선택 상태 변경
  const handleCardDoubleClick = (id) => {
    if (selectedCards.includes(id)) {
      // 카드 해제
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else {
      // 카드 선택
      setSelectedCards([...selectedCards, id]);
    }
  };

  // 삭제 버튼 클릭 처리
  const handleDeleteSelected = () => {
    onDelete(selectedCards); // 부모 컴포넌트로 선택된 카드 삭제 요청
    setSelectedCards([]); // 삭제 후 선택된 카드 초기화
  };

  return (
    <div>
      {/* 선택된 카드 삭제 버튼 */}
      {selectedCards.length > 0 && (
        <div className="mb-4 flex items-center">
          <button
            className="mr-4 rounded-md bg-red-500 px-4 py-2 text-white"
            onClick={handleDeleteSelected}
          >
            선택된 카드 삭제
          </button>
          <span className="text-lg font-semibold">
            {selectedCards.length}개 선택됨
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flex h-full cursor-pointer flex-col border p-4 transition-all duration-200 ${
              selectedCards.includes(card.id) ? 'bg-blue-100' : ''
            }`}
            onDoubleClick={() => handleCardDoubleClick(card.id)} // 더블클릭 시 카드 선택/해제
          >
            {/* 이미지 영역 (위 절반) */}
            <Image
  src={card.image}
  alt={card.title}
  width={300}  // 원하는 너비
  height={200} // 원하는 높이
  className="h-full max-h-48 w-full object-cover"
/>


            {/* 텍스트 영역 (아래 절반) */}
            <div className="flex flex-1 flex-col justify-between p-4">
              {/* 키워드 박스 */}
              <div className="mb-2">
                <span className="rounded-full bg-blue-500 px-4 py-1 text-white">
                  #{card.projectType}
                </span>
              </div>
              {/* 관련 분야 박스 */}
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
              {/* 제목 */}
              <h3 className="mt-2 truncate text-lg font-bold">{card.title}</h3>
              {/* 설명 (여러 줄로 표시하고 최대 3줄까지 보여주고, 초과 시 ... 표시) */}
              <p className="mt-2 line-clamp-3 text-gray-600">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardListC;
