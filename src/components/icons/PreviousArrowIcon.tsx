'use client';

import { ChevronLeft } from 'lucide-react';

interface CustomArrowProps {
  onClick?: () => void;
}

const PreviousArrowIcon: React.FC<CustomArrowProps> = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer dark:opacity-80 dark:hover:opacity-100"
    onClick={onClick}
  >
    <ChevronLeft size={30} className="text-white dark:text-gray-300" />
  </div>
);

export default PreviousArrowIcon;
