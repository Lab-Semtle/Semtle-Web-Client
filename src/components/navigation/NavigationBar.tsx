'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/** 외부 컴포넌트 라이브러리 */
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SunIcon, MoonIcon } from 'lucide-react';

/** 분리된 컴포넌트 */
import { NavLinkItem } from '@/components/navigation/NavLinkItem';
import NavDesktopMenu from './NavDesktopMenu';
import NavMobileMenu from './NavMobileMenu';
import { FlipButton } from '../animation/FlipButton';

/** 분리된 로직 */
import { useSession } from '@/hooks/use-session'; // 사용자 세션 정보
import { useDarkMode } from '@/hooks/use-darkmode';
import useScrollDirection from '@/hooks/use-navbar-scroll';
import { navigationMenuItems } from '@/constants/navItem';
import { signOutWithForm } from '@/lib/auth/serverActions/auth'; // 로그아웃 처리 함수

export default function NavigationBar() {
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // 다크모드/라이트모드
  const isScrollingUp = useScrollDirection(); // 스크롤 추적
  const [isDesktop, setIsDesktop] = useState(false); // 데스크톱 여부 상태 관리

  // 화면 크기에 따라 상태 업데이트
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); // 초기 렌더링 시 현재 화면 크기 반영
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 메뉴가 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  return (
    <header>
      {session?.user && <div>{session.user.name}</div>}
      {/* 스크롤시 슬라이딩 효과 */}
      {/* <nav
        className={`fixed top-0 z-50 flex h-[60px] w-full items-center justify-between border-b border-gray-200 bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isScrollingUp ? 'translate-y-0' : '-translate-y-full'
        } dark:border-gray-700 dark:bg-gray-950`}
      > */}
      {/* <nav className="fixed top-0 z-50 flex h-[60px] w-full items-center justify-between border-b border-gray-200/30 bg-white/30 shadow-sm backdrop-blur-md transition-colors duration-300 dark:border-gray-700/20 dark:bg-gray-950/50"> */}
      <nav className="fixed top-0 z-50 flex h-[70px] w-full items-center justify-between bg-white/30 shadow-sm backdrop-blur-md transition-colors duration-300 dark:bg-gray-950/50">
        {/* 로고 */}
        <Link
          href="/"
          className="ml-5 whitespace-nowrap font-yclover text-2xl font-bold text-gray-800 dark:text-white"
        >
          아치셈틀
        </Link>

        {/* 데스크톱 메뉴 또는 모바일 드로어 메뉴 */}
        {isDesktop ? (
          <div className="flex flex-1 justify-center">
            <DesktopMenu session={session} />
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
              {/* 로그인 상태 UI 테스트 -> setSession={setSession} 추가 */}
              <UserMenu session={session} />
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </nav>
    </header>
  );
}

function DesktopMenu({ session }: { session: any }) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center gap-1">
        <NavLinkItem href="/" label="처음으로" />
        {navigationMenuItems
          .filter((menu) => {
            // '사용자 메뉴'는 로그인 상태일 때만 렌더링
            if (menu.label === '사용자 메뉴') {
              return session?.user;
            }
            return true;
          })
          .map((menu) => (
            <NavDesktopMenu
              key={menu.label}
              triggerLabel={menu.label}
              sections={menu.items}
            />
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function DarkModeButton({ isDarkMode, toggleDarkMode }: any) {
  return (
    <Button
      variant="ghost"
      onClick={toggleDarkMode}
      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 scale-125 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 scale-125 text-blue-500" />
      )}
    </Button>
  );
}

function UserMenu({ session }: any) {
  if (session?.user) {
    return (
      <NavigationMenuList className="flex items-center gap-3">
        <NavigationMenuItem>
          <form
            action={signOutWithForm}
            onSubmit={(e) => {
              e.preventDefault(); // 기본 폼 동작 방지
            }}
          >
            <FlipButton type="submit">로그아웃</FlipButton>
          </form>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <AvatarMenu session={session} />
        </NavigationMenuItem>
      </NavigationMenuList>
    );
  }
  return (
    <>
      <NavLinkItem href="/recruit" label="가입하기" />
      <NavigationMenuItem>
        <FlipButton>
          <Link href="/auth/signin">로그인</Link>
        </FlipButton>
      </NavigationMenuItem>
    </>
  );
}

function AvatarMenu({ session }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={session.user.profileImageUrl || '/images/default-profile.png'}
            alt={session.user.name || 'User'}
            className="h-10 w-10 rounded-full border-2 border-gray-900"
          />
          <AvatarFallback>
            {session.user.name?.slice(0, 2) || '??'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>내 계정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile/setup">개인정보수정</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/profile/mypage">마이페이지</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/admin">공홈관리시스템</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
