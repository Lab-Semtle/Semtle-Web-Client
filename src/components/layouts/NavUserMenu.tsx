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
import { ROUTES } from '@/constants/Routes';
import { useSession, signOut } from 'next-auth/react'; // ✅ next-auth에서 가져오기
import { useState } from 'react';

export default function NavUserMenu() {
  const { data: session } = useSession(); // ✅ next-auth에서 세션 가져오기
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavigationMenuList className="flex items-center gap-3">
      {session?.user ? (
        <NavigationMenuItem>
          <LoginMenu
            session={session}
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
          />
        </NavigationMenuItem>
      ) : (
        <>
          <NavLinkMenu href={ROUTES.RECRUIT} label="가입하기" />
          <NavigationMenuItem>
            <Link href={ROUTES.AUTH_SIGNIN} passHref>
              <VariantShineButton className="bg-blue-300 text-blue-950 hover:bg-blue-700 hover:text-gray-200 dark:bg-blue-700 dark:text-gray-200 dark:hover:bg-blue-300 dark:hover:text-blue-950">
                로그인
              </VariantShineButton>
            </Link>
          </NavigationMenuItem>
        </>
      )}
    </NavigationMenuList>
  );
}

function LoginMenu({
  session,
  isMenuOpen,
  setIsMenuOpen,
}: {
  session: any; // ✅ 타입을 any로 변경 (NextAuth 타입 문제 회피)
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}) {
  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={session?.user.image || '/images/default-profile.jpg'}
            alt={session?.user.name || 'User'}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                '/images/default-profile.jpg';
            }}
            className="h-10 w-10 rounded-full border-2 border-gray-900"
          />
          <AvatarFallback>
            {session?.user.name?.slice(0, 4) || '알수없음'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>
          <span className="block font-bold">
            {session?.user.name || '사용자'}
          </span>
        </DropdownMenuLabel>
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
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            type="submit"
            onClick={() => signOut()}
            className="w-full text-left text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
          >
            로그아웃
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
