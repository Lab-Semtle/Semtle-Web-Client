'use client';
import { useState, useEffect } from 'react';
// import { redirect } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import * as React from 'react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

import { getSession, signOutWithForm } from '@/lib/auth/server-action';

const aboutSections = [
  {
    title: '소개',
    href: '/about',
    description: '우리 조직의 비전과 사명, 그리고 주요 활동을 소개합니다.',
  },
  {
    title: '조직도',
    href: '/organization',
    description: '조직의 구성원들과 각 부서의 역할을 확인할 수 있습니다.',
  },
  {
    title: 'History',
    href: '/history',
    description: '우리의 역사를 통해 성장과 발전 과정을 살펴보세요.',
  },
];
const activitySections = [
  {
    title: '활동',
    href: '/activities',
    description: '우리의 최근 활동과 프로젝트에 대해 알아보세요.',
  },
  {
    title: '학회 일정',
    href: '/schedule',
    description: '다가오는 학회 일정과 이벤트를 확인할 수 있습니다.',
  },
  {
    title: '프로젝트 아카이브',
    href: '/projects/completed',
    description: '완료되어 홍보 중인 프로젝트를 확인해 보세요.',
  },
  {
    title: '프로젝트 참여하기',
    href: '/projects/active',
    description: '여러분을 모집 중인 프로젝트를 확인해 보세요.',
  },
];
const archiveSections = [
  {
    title: '학회회칙',
    href: '/regulations',
    description: '학회의 공식 규칙과 운영 방침을 확인할 수 있습니다.',
  },
  {
    title: 'Secret Note',
    href: '/secret',
    description: '비공개 자료와 특별한 노트를 제공하는 페이지입니다.',
  },
];

export default function NavigationBar() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession(); // 비동기 세션 가져오기
  }, []);

  //NOTE - Dark & White Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  // // 로그인 상태 관리
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [userProfile, setUserProfile] = useState({
  //   name: 'Unknown',
  //   image: '/default_profile.png',
  // });

  // useEffect(() => {
  //   // 예시로 API 호출
  //   fetch('/api/getUserProfile')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUserProfile({
  //         name: data.name,
  //         image: data.image,
  //       });
  //     });
  // }, []);

  // useEffect(() => {
  //   const storedLoginStatus = localStorage.getItem('isLoggedIn');
  //   if (storedLoginStatus === 'true') {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  //   localStorage.setItem('isLoggedIn', 'true');
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem('isLoggedIn');
  //   redirect('/');
  // };

  // const router = useRouter();

  // const handleSecretPage = (title: string, href: string) => {
  //   if (title === 'Secret Note' && !isLoggedIn) {
  //     redirect('/login');
  //   } else {
  //     router.push(href);
  //   }
  // };

  return (
    <nav className="fixed top-0 z-50 flex h-[70px] w-full items-center border-b border-gray-200 bg-white shadow-md transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-950">
      <NavigationMenu>
        <NavigationMenuList className="ml-5 flex items-center gap-2">
          <Avatar>
            <AvatarImage
              className="not-dark h-10 w-10 rounded-full"
              src="/semtle_logo_line.png"
              alt="Arch Semtle Logo"
            />
            <AvatarFallback>LI</AvatarFallback>
          </Avatar>
          <Switch
            id="darkandwhtie-mode"
            onClick={toggleDarkMode}
            checked={isDarkMode}
          />
          <Label htmlFor="darkandwhtie-mode"></Label>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu className="ml-auto mr-4 flex items-center justify-end">
        <NavigationMenuList className="gap-8">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>About</NavigationMenuTrigger>
            <NavigationMenuContent>
              <MenuSection sections={aboutSections} />
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Activity</NavigationMenuTrigger>
            <NavigationMenuContent>
              <MenuSection sections={activitySections} />
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Archive</NavigationMenuTrigger>
            <NavigationMenuContent>
              <MenuSection sections={archiveSections} />
            </NavigationMenuContent>
          </NavigationMenuItem>

          {!session?.user ? (
            <>
              <NavigationMenuItem>
                <Link href="/recruiting" className="mr-[-10] text-sm">
                  Join
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button>
                  <Link href="/signin">Signin</Link>
                </Button>
              </NavigationMenuItem>
            </>
          ) : (
            <>
              <NavigationMenuList className="ml-[-15] flex items-center justify-end gap-3">
                <NavigationMenuItem>
                  <form action={signOutWithForm}>
                    <Button>Logout</Button>
                  </form>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          className="h-8 w-8 rounded-full border-2 border-gray-900"
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
                          <Link href="/mypage/${userid}">개인정보관리</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/mypage/${userid}/activity">
                            내 활동관리
                          </Link>
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
const MenuSection = ({
  sections,
  onClickSection,
}: {
  sections: typeof aboutSections;
  onClickSection?: (title: string, href: string) => void;
}) => {
  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {sections.map((section) => (
        <ListItem
          key={section.title}
          title={section.title}
          href={section.href}
          onClick={() => onClickSection?.(section.title, section.href)} // onClickSection이 있으면 호출
        >
          {section.description}
        </ListItem>
      ))}
    </ul>
  );
};

const ListItem = ({
  className,
  title,
  children,
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<'a'> & { onClick: () => void }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
          onClick={onClick}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = 'ListItem';
