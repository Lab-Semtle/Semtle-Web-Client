'use client';

import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
//import { Icons } from '@/components/icons';
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
//import Image from 'next/image';
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

export default function NavigationBar() {
  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: 'Unknown',
    image: '/profile-image.jpg',
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  useEffect(() => {
    // 예시로 API 호출
    fetch('/api/getUserProfile')
      .then((response) => response.json())
      .then((data) => {
        setUserProfile({
          name: data.name,
          image: data.image,
        });
      });
  }, []);

  return (
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
              <MenuSection sections={archiveSections} />
            </NavigationMenuContent>
          </NavigationMenuItem>

          {!isLoggedIn ? (
            <>
              <NavigationMenuItem>
                <Link href="/reqruiting" className="mr-[-10] text-sm">
                  Join
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              </NavigationMenuItem>
            </>
          ) : (
            <>
              <NavigationMenuList className="ml-[-15] flex items-center justify-end gap-3">
                <NavigationMenuItem>
                  <Button onClick={handleLogout}>Logout</Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          className="h-8 w-8 rounded-full border-2 border-gray-900"
                          src={userProfile.image}
                          alt={userProfile.name}
                        />
                        <AvatarFallback>
                          {userProfile.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-30">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem><Link href="/mypage/${userid}">개인정보관리</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/mypage/${userid}/activity">내 활동관리</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/개인시간표">시간표</Link></DropdownMenuItem>
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

    // <nav className="navBar">
    //   <div className="navBarLogoToggle">
    //     <div className="navBarLogo">
    //       <img src="/semtle_logo_square.jpg" alt="Logo" className="logoImage" />
    //       <label className="modeToggle">
    //         <input role="switch" type="checkbox" />
    //       </label>
    //     </div>

    //     <div className="navBarMenus">
    //       <ul className="navBarMenusLink">
    //         <Link href="/" className="navBarMenusLinks">
    //           Home
    //         </Link>
    //         <li className="group relative">
    //           <button className="navBarMenusLinks">About</button>
    //           <div className="dropdownContainer">
    //             <ul>
    //               <li>
    //                 <Link href="/about">소개</Link>
    //               </li>
    //               <li>
    //                 <Link href="/organization">조직도</Link>
    //               </li>
    //               <li>
    //                 <Link href="/history">History</Link>
    //               </li>
    //             </ul>
    //           </div>
    //         </li>

    //         <li className="group relative">
    //           <button className="navBarMenusLinks">Activity</button>
    //           <div className="dropdownContainer">
    //             <ul>
    //               <li>
    //                 <Link href="/activities">활동</Link>
    //               </li>
    //               <li>
    //                 <Link href="/projects">프로젝트</Link>
    //               </li>
    //               <li>
    //                 <Link href="/schedule">학회 일정</Link>
    //               </li>
    //             </ul>
    //           </div>
    //         </li>

    //         <li className="group relative">
    //           <button className="navBarMenusLinks">Archive</button>
    //           <div className="dropdownContainer">
    //             <ul>
    //               <li>
    //                 <Link href="/regulations">학회회칙</Link>
    //               </li>
    //               <li>
    //                 <Link href="/secret">Secret Note</Link>
    //               </li>
    //             </ul>
    //           </div>
    //         </li>
    //       </ul>

    //       <ul className="navBarLoginJoin">
    //         {!isLoggedIn ? (
    //           <>
    //             <li>
    //               <Link href="/recruiting" className="navBarMenusLinks">
    //                 Join
    //               </Link>
    //             </li>
    //             <li>
    //               <Link href="/login">
    //                 <button className="btnLogin">Login</button>
    //               </Link>
    //             </li>
    //           </>
    //         ) : (
    //           <>
    //             <li>
    //               <button onClick={toggleLogin} className="btnLogout">
    //                 Logout
    //               </button>
    //             </li>
    //             <li className="flex items-center">
    //               <button onClick={toggleDropdown}>
    //                 <img
    //                   src="/semtle_logo_square.jpg"
    //                   alt="Profile"
    //                   className="profileImage cursor-pointer"
    //                 />
    //               </button>
    //             </li>
    //             {isDropdownVisible && (
    //               <div
    //                 ref={dropdownRef}
    //                 className="z-60 absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg"
    //               >
    //                 <ul>
    //                   <li>
    //                     <Link href="/mypage/${userid}">개인정보관리</Link>
    //                   </li>
    //                   <li>
    //                     <Link href="/mypage/${userid}/activities"></Link>내
    //                     활동관리
    //                   </li>
    //                   <li>
    //                     <Link href="/">시간표</Link>
    //                   </li>
    //                 </ul>
    //               </div>
    //             )}
    //           </>
    //         )}
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
}
const MenuSection = ({ sections }: { sections: typeof aboutSections }) => {
  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {sections.map((section) => (
        <ListItem key={section.title} title={section.title} href={section.href}>
          {section.description}
        </ListItem>
      ))}
    </ul>
  );
};
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
