'use client';

import { motion, useInView } from 'framer-motion';
import * as React from 'react';

export function FadeUp({
  direction,
  children,
  className = '',
  staggerChildren = 0.2,
}: {
  direction: 'up' | 'down';
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
}) {
  const FADE_DOWN = {
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 1.2, // 속도 조절 (기본값보다 느리게)
        damping: 30, // 감속 효과 추가
        stiffness: 70, // 스프링의 강도 조절
      },
    },
    hidden: { opacity: 0, y: direction === 'down' ? -30 : 30 }, // 이동거리
  };

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false }); // 보일 때 마다 실행
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_DOWN}>{child}</motion.div>
        ) : (
          child
        ),
      )}
    </motion.div>
  );
}

/** 사용 예제 
<FadeUp
  direction="up"
  className="pt-0 pb-5 flex-col flex justify-center items-center space-y-0"
>
  <h2 className="text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[0rem] prose-h2:my-0">
    Fade Up
  </h2>
  <div className="prose-p:my-1 text-center md:text-lg max-w-lg mx-auto text-balance dark:text-zinc-300">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit amet.
  </div>
</FadeUp>
*/
