'use client';

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
import Link from 'next/link';
// import { Session } from '@/components/navigation/types/navigation';

interface MenuItem {
  label: string;
  href: string;
}

interface AvatarMenuProps {
  session: Session;
  menuItems: MenuItem[];
}

export default function AvatarMenu({ session, menuItems }: AvatarMenuProps) {
  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.profileImageUrl || '/images/default-profile.png'}
            alt={user?.name || 'User'}
            className="h-10 w-10 rounded-full border-2 border-gray-900"
          />
          <AvatarFallback>{user?.name?.slice(0, 2) || '??'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>내 계정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
