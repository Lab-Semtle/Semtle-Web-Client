/** 네비게이션 바 */

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import NavToogleMenu from '@/components/layouts/NavToggleMenu';
import NavMobileMenu from '@/components/layouts/NavMobileMenu';
import NavUserMenu from '@/components/layouts/NavUserMenu';
import DarkModeButton from '@/components/button/DarkModeButton';
import { useDarkMode } from '@/hooks/use-darkmode';
import { ROUTES } from '@/constants/routes';

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 열림 구분
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // 다크모드/라이트모드
  const [isDesktop, setIsDesktop] = useState(false); // 데스크톱/모바일

  // 화면 크기에 따라 상태 업데이트
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 메뉴가 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  return (
    <header>
      <nav className="fixed top-0 z-50 flex h-[70px] w-full items-center justify-between bg-white/30 shadow-sm backdrop-blur-md transition-colors duration-300 dark:bg-gray-950/50">
        {/* 로고 */}
        <Link
          href={ROUTES.HOME}
          className="font-yclover ml-5 whitespace-nowrap text-2xl font-bold text-gray-800 dark:text-white"
        >
          아치셈틀
        </Link>

        {/* 중앙 메뉴 */}
        {isDesktop ? (
          <div className="flex flex-1 justify-center">
            <NavToogleMenu />
          </div>
        ) : (
          <NavMobileMenu
            setIsMenuOpen={setIsMenuOpen}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
        )}

        {/* 데스크톱 전용 사용자 메뉴 */}
        {isDesktop && (
          <NavigationMenu className="ml-auto mr-5 flex items-center">
            <NavigationMenuList className="flex items-center gap-1">
              <DarkModeButton
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
              <NavUserMenu />
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </nav>
    </header>
  );
}
