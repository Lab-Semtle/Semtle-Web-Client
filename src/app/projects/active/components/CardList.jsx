import Image from 'next/image';

const CardList = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
      {cards.map((card) => (
        <div key={card.id} className="grid grid-cols-1 gap-4 border p-4">
          {/* 왼쪽 이미지 영역 */}
          <div className="col-span-1">
            <Image
              src={card.image}
              alt={card.title}
              className="h-40 w-full rounded-md object-cover"
            />
          </div>

          {/* 오른쪽 텍스트 영역 */}
          <div className="col-span-1">
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
            <h3 className="mt-2 truncate text-lg font-bold">{card.title}</h3>
            <p className="truncate text-gray-600">게시 일자: {card.postDate}</p>
            <p className="truncate text-gray-600">마감 일자: {card.deadline}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
