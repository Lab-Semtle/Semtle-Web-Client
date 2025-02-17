/** 모바일 사이즈 화면에서 네비게이션 메뉴(사용자 메뉴 포함됨) */

'use client';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import DarkModeButton from '@/components/button/DarkModeButton';
import { MenuIcon } from 'lucide-react';
import { useSession } from '@/hooks/use-session';
import { signOutWithForm } from '@/lib/auth/serverActions/auth';
import { ROUTES } from '@/constants/routes';
import { NAVIGATION_MENU } from '@/constants/navItems';

interface MobileMenuProps {
  setIsMenuOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export default function NavMobileMenu({
  setIsMenuOpen,
  toggleDarkMode,
  isDarkMode,
}: MobileMenuProps) {
  const session = useSession();

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
          {NAVIGATION_MENU.map((section, index) => (
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
                      href={ROUTES.RECRUIT}
                      onClick={handleLinkClick}
                      className="block w-full py-2 pl-2 text-left text-gray-800 hover:text-blue-500 dark:text-white"
                    >
                      가입하기
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={ROUTES.AUTH_SIGNIN}
                      onClick={handleLinkClick}
                      className="block w-full py-2 pl-2 text-left text-gray-800 hover:text-blue-500 dark:text-white"
                    >
                      로그인
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {NAVIGATION_MENU.find(
                    (section) => section.label === '사용자 메뉴',
                  )?.items.map((item) => (
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
            <DarkModeButton
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
