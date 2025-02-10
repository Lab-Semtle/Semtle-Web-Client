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
import { NavLinkItem } from '@/components/layouts/NavLinkItem';
import NavDropdownItem from '@/components/layouts/NavDesktopMenu';
import NavMobileMenu from './NavMobileMenu';

/** 분리된 로직 */
import { signOutWithForm } from '@/lib/auth/server-action';
import { useSession } from '@/hooks/use-session';
import { useDarkMode } from '@/hooks/use-darkmode';
import useScrollDirection from '@/hooks/use-navbar-scroll';
import { navigationMenuData } from '@/constants/navigation';

///////////////////////////////////////////////////////////////////////////////////////////////////
// // 로그인 상태 UI 테스트 : 임시 세션 데이터
// /** 임시 세션 초기값 */
// const initialSession = {
//   user: {
//     name: '홍길동',
//     email: 'hong@example.com',
//     profileImageUrl: '/images/default-profile.jpg',
//   },
// };
///////////////////////////////////////////////////////////////////////////////////////////////////

export default function NavigationBar() {
  // const [session, setSession] = useState(initialSession); // 로그인 상태 UI 테스트
  const session = useSession(); // 로그인 구분
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
    <nav
      className={`fixed top-0 z-50 flex h-[60px] w-full items-center justify-between border-b border-gray-200 bg-white shadow-md transition-transform duration-300 ease-in-out ${
        isScrollingUp ? 'translate-y-0' : '-translate-y-full'
      } dark:border-gray-700 dark:bg-gray-950`}
    >
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
          <DesktopMenu />
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
            {/* 로그인 상태 UI 테스트 -> setSession={setSession} */}
            <UserMenu session={session} />
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </nav>
  );
}

function DesktopMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center gap-1">
        <NavLinkItem href="/" label="처음으로" />
        <NavDropdownItem
          triggerLabel="아치 셈틀"
          sections={navigationMenuData[0].items}
        />
        <NavDropdownItem
          triggerLabel="학회 활동"
          sections={navigationMenuData[1].items}
        />
        <NavDropdownItem
          triggerLabel="학회 자료실"
          sections={navigationMenuData[2].items}
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function DarkModeButton({ isDarkMode, toggleDarkMode }: any) {
  return (
    <Button
      variant="ghost"
      onClick={toggleDarkMode}
      className="flex h-10 w-10 items-center justify-center rounded-full"
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 scale-150 text-yellow-500" />
      ) : (
        <MoonIcon className="h-6 w-6 scale-150 text-sky-800" />
      )}
    </Button>
  );
}

function UserMenu({ session }: any) {
  // 로그인 상태 UI 테스트 : 파라미터 -> setSession

  //////////////////////////////////////////////////////////////////////////////////////////
  // 로그인 상태 UI 테스트 : 로그인/로그아웃 토글
  // const handleToggleSession = () => {
  //   setSession(session ? null : initialSession); // 로그인/로그아웃 상태 전환
  // };
  //////////////////////////////////////////////////////////////////////////////////////////

  if (!session?.user) {
    return (
      <>
        <NavLinkItem href="/recruit" label="가입하기" />
        <NavigationMenuItem>
          <Button
            className="text-base font-semibold"
            // 로그인 상태 UI 테스트 -> onClick={handleToggleSession}
          >
            <Link href="/auth/signin">로그인</Link>
          </Button>
        </NavigationMenuItem>
      </>
    );
  }

  return (
    <NavigationMenuList className="flex items-center gap-3">
      <NavigationMenuItem>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // 기본 폼 동작 방지
            // handleToggleSession(); // 로그인 상태 UI 테스트 : 로그아웃 시 세션 상태 변경
            signOutWithForm(); // 로그아웃 처리
          }}
        >
          <Button type="submit">로그아웃</Button>
        </form>
      </NavigationMenuItem>
      <NavigationMenuItem>
        {/* 사용자 프로필 메뉴*/}
        <AvatarMenu session={session} />
      </NavigationMenuItem>
    </NavigationMenuList>
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
