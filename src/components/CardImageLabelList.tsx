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

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4">{cards}</div>
  );
};

export default CardImageLabelList;
