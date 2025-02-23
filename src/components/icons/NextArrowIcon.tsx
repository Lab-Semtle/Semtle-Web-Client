'use client';

import { ChevronRight } from 'lucide-react';

interface CustomArrowProps {
  onClick?: () => void;
}

const NextArrowIcon: React.FC<CustomArrowProps> = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer dark:opacity-80 dark:hover:opacity-100"
    onClick={onClick}
  >
    <ChevronRight size={30} className="text-white dark:text-gray-300" />
  </div>
);

export default NextArrowIcon;
