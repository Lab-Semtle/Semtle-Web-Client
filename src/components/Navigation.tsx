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
//import Image from 'next/image';
const aboutSections = [
  { title: '소개', href: '/about' },
  {
    title: '조직도',
    href: '/organization',
  },
  {
    title: 'History',
    href: '/history',
  },
];

const activitySections = [
  {
    title: '활동',
    href: '/activities',
  },
  {
    title: '프로젝트',
    href: '/projects',
  },
  {
    title: '학회 일정',
    href: '/schedule',
  },
];

const archiveSections = [
  {
    title: '학회회칙',
    href: '/regulations',
  },
  {
    title: 'Secret Note',
    href: '/secret',
  },
];
export default function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {/* About Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuSection sections={aboutSections} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Activity Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Activity</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuSection sections={activitySections} />
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Archive Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Archive</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuSection sections={archiveSections} />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
