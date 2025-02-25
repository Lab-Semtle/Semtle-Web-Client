import React from 'react';

type SlideIndicatorProps = {
  totalSlides: number;
  currentIndex: number;
  onClick: (index: number) => void;
};
const SlideIndicator: React.FC<SlideIndicatorProps> = ({
  totalSlides,
  currentIndex,
  onClick,
}) => {
  return (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={`h-3 w-3 rounded-full ${currentIndex === index ? 'bg-black' : 'bg-gray-400'}`}
        />
      ))}
    </div>
  );
};

export default SlideIndicator;
