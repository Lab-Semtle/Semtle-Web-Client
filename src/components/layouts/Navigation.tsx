import { redirect } from 'next/navigation';
import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/tailwind-utils';
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
    title: '프로젝트',
    href: '/projects',
    description: '진행 중인 프로젝트와 그 성과를 확인해 보세요.',
  },
  {
    title: '학회 일정',
    href: '/schedule',
    description: '다가오는 학회 일정과 이벤트를 확인할 수 있습니다.',
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

export default async function NavigationBar() {
  const session = await getSession();

  // // 로그인 상태 관리
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [userProfile, setUserProfile] = useState({
  //   name: 'Unknown',
  //   image: '/profile-image.jpg',
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

  // // Secret Note 페이지를 클릭할 때 로그인 상태 확인 후 리다이렉트
  // const handleSecretPage = (title: string, href: string) => {
  //   if (title === 'Secret Note' && !isLoggedIn) {
  //     redirect('/signin'); // 로그인되지 않으면 로그인 페이지로 리다이렉트
  //   } else {
  //     redirect(href); // 로그인되었으면 해당 페이지로 이동
  //   }
  // };

  return (
    <header>
      <nav className="fixed top-0 z-50 flex h-[70px] w-full items-center bg-white shadow-md transition-all duration-300 ease-in-out">
        <NavigationMenu>
          <NavigationMenuList className="ml-5 flex items-center gap-2">
            <Avatar>
              <AvatarImage
                className="h-10 w-10 rounded-full border-2 border-gray-300"
                src="/semtle_logo_line.png"
                alt="Arch Semtle Logo"
              />
              <AvatarFallback>LI</AvatarFallback>
            </Avatar>
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode"></Label>
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
                <MenuSection
                  sections={archiveSections}
                  // onClickSection={handleSecretPage}
                />
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
                    <Link href="/signin">Login</Link>
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
                            src={session.user.image || '/default-profile.png'}
                            alt={session.user.name || 'User'}
                          />
                          <AvatarFallback>
                            {session.user.name?.slice(0, 2) || '??'}
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
                          <DropdownMenuItem>
                            <Link href="/개인시간표">시간표</Link>
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
    </header>
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
