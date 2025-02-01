import React from 'react';
import CardImageLabel from './CardImageLabel';

type CardImageLabelListProps = {
  cards: {
    imageSrc: string;
    altText: string;
    contentTitle?: string; // ✅ 추가
    contentText: string;
    isHidden?: string;
  }[];
};

const CardImageLabelList: React.FC<CardImageLabelListProps> = ({ cards = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cards.map((card, index) => (
        <CardImageLabel
          key={index}
          imageSrc={card.imageSrc}
          altText={card.altText}
          contentTitle={card.contentTitle} // ✅ 추가
          contentText={card.contentText}
          isHidden={card.isHidden}
        />
      ))}
    </div>
  );
};

export default CardImageLabelList;
