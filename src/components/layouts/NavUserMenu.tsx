/** 데스크톱 사이즈 화면에서 네비게이션바 사용자 메뉴 */

import Link from 'next/link';
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
import {
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { NavLinkMenu } from '@/components/layouts/NavLinkMenu';
import { VariantShineButton } from '@/components/common/VariantShineButton';
import { useSession } from '@/hooks/useSession';
import { signOutWithForm } from '@/lib/auth/auth.server';
import { ROUTES } from '@/constants/routes';
import { Session } from 'next-auth';

export default function NavUserMenu() {
  const session = useSession(); // 서버에서 세션 가져오기

  return (
    <NavigationMenuList className="flex items-center gap-3">
      {session?.user ? (
        <>
          <NavigationMenuItem>
            <form action={signOutWithForm}>
              <VariantShineButton
                type="submit"
                className="bg-blue-300 text-blue-950 hover:bg-blue-700 hover:text-gray-200 dark:bg-blue-700 dark:text-gray-200 dark:hover:bg-blue-300 dark:hover:text-blue-950"
              >
                로그아웃
              </VariantShineButton>
            </form>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <LoginMenu session={session} />
          </NavigationMenuItem>
        </>
      ) : (
        <>
          <NavLinkMenu href={ROUTES.RECRUIT} label="가입하기" />
          <NavigationMenuItem>
            <VariantShineButton className="bg-blue-300 text-blue-950 hover:bg-blue-700 hover:text-gray-200 dark:bg-blue-700 dark:text-gray-200 dark:hover:bg-blue-300 dark:hover:text-blue-950">
              <Link href={ROUTES.AUTH_SIGNIN}>로그인</Link>
            </VariantShineButton>
          </NavigationMenuItem>
        </>
      )}
    </NavigationMenuList>
  );
}

function LoginMenu({ session }: { session: Session | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={
              session?.user?.profileImageUrl || '/images/default-profile.png'
            }
            alt={session?.user?.username || 'User'}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                '/images/default-profile.png';
            }}
            className="h-10 w-10 rounded-full border-2 border-gray-900"
          />
          <AvatarFallback>
            {session?.user?.username?.slice(0, 2) || '??'}
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
