import React from "react";

const CardImageLabel = ({ 
  imageSrc, 
  altText, 
  contentText, 
  cardHeight = 300, 
  cardWidth = 250, 
  imageHeight = 170 
}) => {
  return (
    <div
      className="overflow-hidden rounded-lg bg-gray-100"
      style={{ height: `${cardHeight}px`, width: `${cardWidth}px` }}
    >
      <div className="p-0">
        <div style={{ height: `${imageHeight}px`, width: "100%" }}>
          <img
            src={imageSrc}
            alt={altText}
            className="h-full w-full rounded-t-lg object-cover object-center"
          />
        </div>
      </div>
      <div
        className="flex items-center justify-center p-2 text-center text-sm text-gray-800"
        style={{ height: `${cardHeight - imageHeight}px` }}
      >
        <p>{contentText}</p>
      </div>
    </div>
  );
};

export default CardImageLabel;
