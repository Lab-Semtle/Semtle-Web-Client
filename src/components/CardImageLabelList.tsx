import React from 'react';
import CardImageLabel from './CardImageLabel';

interface CardListProps {
  cardCount: number;
  imageSrcs: string[];
  altTexts: string[];
  contentTitles?: string[];
  contentTexts: string[];
  isHiddens?: string[];
}

const CardImageLabelList: React.FC<CardListProps> = ({
  cardCount,
  imageSrcs,
  altTexts,
  contentTitles = [],
  contentTexts,
  isHiddens = [],
}) => {
  const cards = [];


  for (let i = 0; i < cardCount; i++) {
    cards.push(
      <CardImageLabel
        key={i}
        imageSrc={imageSrcs[i]}
        altText={altTexts[i]}
        contentTitle={contentTitles[i]}
        contentText={contentTexts[i]}
        isHidden={isHiddens[i]}
      />,
    );
  }

  const rows = [];
  for (let i = 0; i < cards.length; i += 4) {
    rows.push(cards.slice(i, i + 4));
  }

  return (
    <div className="mt-10">
      {rows.map((row, index) => (
        <div key={index} className="flex justify-center gap-4 mb-4">
          {row}
        </div>
      ))}
    </div>
  );
};

export default CardImageLabelList;