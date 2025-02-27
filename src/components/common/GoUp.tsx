import React from 'react';
import { ChevronUp } from 'lucide-react';

interface GoUpProps {
  onClick: () => void;
  className: string;
}

const GoUp: React.FC<GoUpProps> = ({ onClick, className }) => {
  return (
    <button
      aria-label="페이지 상단으로 이동"
      onClick={onClick}
      className={`flex items-center justify-center ${className}`}
    >
      <ChevronUp
        size={24} // 아이콘 크기 지정
        className="transition-all duration-300 group-hover:text-semtleColor"
      />
    </button>
  );
};

export default GoUp;
