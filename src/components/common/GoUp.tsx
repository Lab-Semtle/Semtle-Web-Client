import React from 'react';

interface GoUpProps {
  onClick: () => void;  // onClick은 함수 타입이어야 합니다
  className: string;    // className은 문자열 타입이어야 합니다
}

const GoUp: React.FC<GoUpProps> = ({ onClick, className }) => {
  return (
    <button
      aria-label="페이지 상단으로 이동"
      onClick={onClick}
      className={className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="white"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300 group-hover:fill-semtleColor group-hover:stroke-white"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
};

export default GoUp;
