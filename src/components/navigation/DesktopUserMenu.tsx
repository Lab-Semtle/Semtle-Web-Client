/** 데스크톱 사이즈 화면에서 네비게이션바 사용자 메뉴 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { NavLinkItem } from '@/components/navigation/NavLinkItem';
import { useSession } from '@/hooks/use-session';
import { signOutWithForm } from '@/lib/auth/serverActions/auth';
import { ROUTES } from '@/constants/routes';

export default function DesktopUserMenu() {
  const session = useSession();

  if (session?.user) {
    return (
      <NavigationMenuList className="flex items-center gap-3">
        <NavigationMenuItem>
          <form
            action={signOutWithForm}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Button
              type="submit"
              className="rounded-md bg-sky-500/50 px-4 py-2 font-semibold text-black backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-sky-500/80 dark:text-black"
            >
              로그아웃
            </Button>
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
      <NavLinkItem href={ROUTES.RECRUIT} label="가입하기" />
      <NavigationMenuItem>
        <Button
          asChild
          className="rounded-md bg-sky-500/50 px-4 py-2 font-semibold text-black backdrop-blur-md transition-colors duration-300 ease-in-out hover:bg-sky-500/80 dark:text-white"
        >
          <Link href={ROUTES.AUTH_SIGNIN}>로그인</Link>
        </Button>
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
            <Link href={ROUTES.PROFILE_SETUP}>개인정보수정</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={ROUTES.PROFILE_MYPAGE}>마이페이지</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={ROUTES.EXECUTIVE}>공홈관리시스템</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
