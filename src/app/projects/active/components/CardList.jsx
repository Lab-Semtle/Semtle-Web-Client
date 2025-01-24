const CardList = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {cards.map((card) => (
        <div key={card.id} className="border p-4 grid grid-cols-1 gap-4">
          {/* 왼쪽 이미지 영역 */}
          <div className="col-span-1">
            <img 
              src={card.image} 
              alt={card.title} 
              className="w-full h-40 object-cover rounded-md" 
            />
          </div>

          {/* 오른쪽 텍스트 영역 */}
          <div className="col-span-1">
            {/* 키워드 박스 */}
            <div className="mb-2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full">
                #{card.projectType}
              </span>
            </div>
            {/* 관련 분야 박스 */}
            <div className="mb-2">
              {card.category.map((category, index) => (
                <span key={index} className="inline-block bg-gray-300 text-gray-700 px-4 py-1 rounded-full mr-2 mb-2">
                  #{category}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-bold mt-2 truncate">{card.title}</h3>
            <p className="text-gray-600 truncate">게시 일자: {card.postDate}</p>
            <p className="text-gray-600 truncate">마감 일자: {card.deadline}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
