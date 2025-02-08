'use client';

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
import {
  aboutSections,
  activitySections,
  archiveSections,
} from '@/constants/navi-item';
import Link from 'next/link';

import { useSession } from '@/hooks/use-session';
import { useDarkMode } from '@/hooks/use-darkmode';
import useScrollDirection from '@/hooks/use-navbar-scroll';
import { signOutWithForm } from '@/lib/auth/server-action';
import { NavLinkItem } from '@/components/layouts/NavLinkItem';
import NavDropdownItem from '@/components/layouts/NavDropdownItem';

import AnimatedLogo from '@/components/animation/AnimatedLogo';

export default function NavigationBar() {
  const session = useSession();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const isScrollingUp = useScrollDirection();

  // 네비게이션바 투명도 설정 (내릴 때 약간 투명해짐)
  const opacityClass = isScrollingUp ? 'opacity-100' : 'opacity-80';

  // nav classname 에 이거 추가하면 네비바 숨김 기능
  // ${
  //   isScrollingUp ? 'translate-y-0' : '-translate-y-[70px]'
  // }
  return (
    <nav
      className={`fixed top-0 z-50 flex h-[70px] w-full items-center border-b border-gray-200 bg-white shadow-md transition-all duration-300 ease-in-out ${opacityClass} dark:border-gray-700 dark:bg-gray-950`}
    >
      {/* 로고 */}
      <Link href="/" className="cursor-pointer">
        <AnimatedLogo />
      </Link>

      {/* 중앙 메뉴 */}
      <div className="flex flex-1 justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-5">
            <NavLinkItem href="/" label="처음으로" />
            <NavDropdownItem
              triggerLabel="아치 셈틀"
              sections={aboutSections}
            />
            <NavDropdownItem
              triggerLabel="학회 활동"
              sections={activitySections}
            />
            <NavDropdownItem
              triggerLabel="학회 자료실"
              sections={archiveSections}
            />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* 우측 메뉴 */}
      <NavigationMenu className="ml-auto mr-4 flex items-center justify-end">
        <NavigationMenuList className="gap-0">
          <Button
            variant="ghost"
            onClick={toggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-full p-0 focus:outline-none"
          >
            {isDarkMode ? (
              <SunIcon className="h-full w-full scale-150 text-yellow-500" />
            ) : (
              <MoonIcon className="h-full w-full scale-150 text-sky-800" />
            )}
          </Button>

          {!session?.user ? (
            <>
              <NavLinkItem href="/recruit" label="가입하기" />
              <NavigationMenuItem>
                <Button className="text-base font-semibold">
                  <Link href="/auth/signin">로그인</Link>
                </Button>
              </NavigationMenuItem>
            </>
          ) : (
            <>
              <NavigationMenuList className="ml-[-15] flex items-center justify-end gap-0">
                <NavigationMenuItem>
                  <form action={signOutWithForm}>
                    <Button>로그아웃</Button>
                  </form>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          className="h-10 w-10 rounded-full border-2 border-gray-900"
                          src={
                            session.user.profileImageUrl ||
                            '/default-profile.png'
                          }
                          alt={session.user.name || 'User'}
                        />
                        <AvatarFallback>
                          {session.user.name
                            ? session.user.name.slice(0, 2)
                            : '??'}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-30">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link href="/profile/setting">개인정보관리</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/profile/activity">내 활동관리</Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </NavigationMenuList>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
