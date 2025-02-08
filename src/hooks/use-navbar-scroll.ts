import { useEffect, useState } from 'react';

/**
 * 스크롤 방향을 감지하는 커스텀 훅
 * @returns {boolean} 스크롤 방향이 위로 올라가는 경우 true, 내려가는 경우 false
 */
export default function useScrollDirection() {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsScrollingUp(false); // 스크롤 내릴 때 숨기기
      } else {
        setIsScrollingUp(true); // 스크롤 올릴 때 보이기
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return isScrollingUp;
}
