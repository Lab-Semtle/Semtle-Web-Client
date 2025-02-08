'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedLogo = () => {
  const [currentText, setCurrentText] = useState('아치셈틀');
  const [isHoveredOnce, setIsHoveredOnce] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const keywords = [
    'ARCHI SEMTLE',
    'SEMTLE',
    '인공지능',
    '머신러닝',
    '딥러닝',
    '강화학습',
    '자연어처리',
    '컴퓨터비전',
    '알고리즘',
    '컴퓨터과학',
    '웹 개발',
    '앱 개발',
    '네트워크',
    '서버개발',
  ];

  const handleMouseEnter = () => {
    if (!isHoveredOnce) {
      const randomIndex = Math.floor(Math.random() * keywords.length);
      setCurrentText(keywords[randomIndex]);
      setIsHoveredOnce(true);
    }
  };

  const handleMouseLeave = () => {
    setCurrentText('아치셈틀');
    setIsHoveredOnce(false); // 다시 마우스가 떼지면 상태 초기화
  };

  useEffect(() => {
    setIsMounted(true); // 클라이언트에서만 애니메이션 적용
  }, []);

  return (
    <motion.div
      className="font-yclover ml-5 text-2xl font-bold text-gray-800 dark:text-white"
      initial={isMounted ? { opacity: 0, scale: 0.8 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentText}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedLogo;
