'use client';

import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const buttonVariants = {
  initial: {
    backgroundColor: '#0EA5E9', // 기본 하늘색 (sky-500)
    color: '#FFFFFF',
  },
  hover: {
    backgroundColor: '#1E3A8A', // 호버 시 진한 파란색 (blue-900)
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export const FlipButton = ({
  children,
  onClick,
  type = 'button',
}: AnimatedButtonProps) => {
  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      variants={buttonVariants}
      onClick={onClick}
      type={type}
      className="rounded-md px-4 py-2 font-semibold text-white transition-colors"
    >
      {children}
    </motion.button>
  );
};
