/** 텍스트가 흐려진 상태에서 서서히 선명해지는 효과 */

'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';

export const TextBlurIn = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { triggerOnce: false });

  return (
    <motion.h2
      ref={ref}
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}} // 요소가 보일 때만 실행
      transition={{
        duration: 1.2,
        ease: 'easeInOut', // 부드러운 애니메이션 효과
      }}
      className={`text-center text-xl font-bold tracking-tighter sm:text-4xl md:text-6xl md:leading-[4rem] ${className}`}
    >
      {children}
    </motion.h2>
  );
};

/** 사용 예제
<TextBlurIn>Text Blur in</TextBlurIn> 
 */
