import { useState } from "react";

const CardList = ({ cards, onDelete }) => {
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
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
            onClick={handleDeleteSelected}
          >
            선택된 카드 삭제
          </button>
          <span className="text-lg font-semibold">
            {selectedCards.length}개 선택됨
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`border p-4 flex flex-col h-96 cursor-pointer transition-all duration-200 ${
              selectedCards.includes(card.id)
                ? "bg-blue-100" // 선택된 카드의 배경색 변경
                : ""
            }`}
            onDoubleClick={() => handleCardDoubleClick(card.id)} // 더블클릭 시 카드 선택/해제
          >
            {/* 이미지 영역 (위 절반) */}
            <div className="h-1/2 w-full">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 텍스트 영역 (아래 절반) */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              {/* 키워드 박스 */}
              <div className="mb-2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full">
                  #{card.projectType}
                </span>
              </div>
              {/* 관련 분야 박스 */}
              <div className="mb-2">
                {card.category.map((category, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-300 text-gray-700 px-4 py-1 rounded-full mr-2 mb-2"
                  >
                    #{category}
                  </span>
                ))}
              </div>
              {/* 제목과 설명 */}
              <h3 className="text-lg font-bold mt-2">{card.title}</h3>
              <p className="text-gray-600 mt-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
