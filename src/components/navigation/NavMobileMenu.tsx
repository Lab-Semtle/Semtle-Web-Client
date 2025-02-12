'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { SunIcon, MoonIcon, MenuIcon } from 'lucide-react';
// import { navigationMenuData } from '@/constants/navItem';
import { navigationMenuItems } from '@/constants/navItem';
import Link from 'next/link';
import { useSession } from '@/hooks/use-session';
import { signOutWithForm } from '@/lib/auth/serverActions/auth';

interface NavMobileMenuProps {
  setIsMenuOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export default function NavMobileMenu({
  setIsMenuOpen,
  toggleDarkMode,
  isDarkMode,
}: NavMobileMenuProps) {
  const session = useSession(); // 세션 가져오기

  const handleLinkClick = () => {
    setIsMenuOpen(false); // 시트 닫기
  };

  return (
    <Sheet onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <button className="mr-5 rounded-full p-2 transition-colors hover:bg-gray-300/40 dark:hover:bg-gray-700/40">
          <MenuIcon className="h-8 w-8 text-gray-800 dark:text-white" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="h-full max-h-screen w-[300px] overflow-y-auto bg-gray-100 dark:bg-gray-900 sm:w-[400px]"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-gray-800 dark:text-white">
            메뉴
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-4">
          {navigationMenuItems.map((section, index) => (
            <div key={section.label} className={index !== 0 ? 'mt-6' : ''}>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                {section.label}
              </h3>
              <Separator className="-mx-4 my-2 w-[calc(100%+32px)] bg-gray-400 dark:bg-gray-600" />

              <ul>
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className="block w-full py-2 pl-2 text-left text-gray-800 hover:text-blue-500 dark:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 가입 및 로그인 */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              사용자 메뉴
            </h3>
            <Separator className="-mx-4 my-2 w-[calc(100%+32px)] bg-gray-400 dark:bg-gray-600" />
            <ul>
              {!session?.user ? (
                <>
                  <li>
                    <Link
                      href="/recruit"
                      onClick={handleLinkClick}
                      className="block w-full py-2 pl-2 text-left text-gray-800 hover:text-blue-500 dark:text-white"
                    >
                      가입하기
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth/signin"
                      onClick={handleLinkClick}
                      className="block w-full py-2 pl-2 text-left text-gray-800 hover:text-blue-500 dark:text-white"
                    >
                      로그인
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {navigationMenuItems
                    .find((section) => section.label === '사용자 메뉴')
                    ?.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className="block w-full py-2 pl-2 text-left text-gray-800 hover:text-blue-500 dark:text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  <li>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        signOutWithForm(); // 로그아웃 처리
                        // handleToggleSession(); // 임시 로그인 테스트 : 세션 상태 전환 (로그아웃)
                      }}
                    >
                      <button
                        type="submit"
                        onClick={handleLinkClick}
                        className="block w-full py-2 pl-2 text-left text-gray-800 hover:text-blue-500 dark:text-white"
                      >
                        로그아웃
                      </button>
                    </form>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Separator className="-mx-4 my-4 w-[calc(100%+32px)] bg-gray-400 dark:bg-gray-600" />
          <div className="flex items-center py-2 pl-2">
            <button onClick={toggleDarkMode} className="flex items-center">
              {isDarkMode ? (
                <SunIcon className="mr-2 h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="mr-2 h-6 w-6 text-sky-800" />
              )}
              <span className="text-gray-800 dark:text-white">
                {isDarkMode ? '라이트 모드' : '다크 모드'}
              </span>
            </button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
