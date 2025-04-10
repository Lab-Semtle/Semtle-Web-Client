'use client';

import {
  Calendar1,
  Home,
  LayoutDashboard,
  LucideIcon,
  Table2,
  DatabaseZapIcon,
  TrophyIcon,
  SquareKanban,
  UserRoundCheck,
  GalleryThumbnails,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/admin/theme-toggle';

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    title: '대시보드 (추가 예정)',
    href: '/executive',
    icon: LayoutDashboard,
  },
  {
    title: '학회원 등록',
    href: '/executive/signup',
    icon: UserPlus,
  },
  {
    title: '학회원 관리',
    href: '/executive/member',
    icon: UserRoundCheck,
  },
  {
    title: '배너 관리',
    href: '/executive/banner',
    icon: GalleryThumbnails,
  },
  {
    title: '활동 게시판',
    href: '/executive/activity',
    icon: Table2,
  },
  {
    title: '학회 성과 (추가 예정)',
    href: '/executive/promotion',
    icon: TrophyIcon,
  },
  {
    title: '운영 DB (추가 예정)',
    href: '/executive/operation',
    icon: DatabaseZapIcon,
  },
  {
    title: '캘린더 (추가 예정)',
    href: '/executive/calendar',
    icon: Calendar1,
  },
  {
    title: '작업관리 (추가 예정)',
    href: '/executive/kanban',
    icon: SquareKanban,
  },
];

export function BaseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar>
        <SidebarHeader className="px-6 py-4">
          <Link href="/executive" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="text-xl font-semibold">공홈관리시스템</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href} className="mt-2">
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.title}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem className="mt-4">
              <SidebarMenuButton asChild tooltip="홈">
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  <Home className="h-5 w-5" />
                  <span>돌아가기</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="flex flex-row items-center gap-2">
          <span className="text-xs text-gray-500">v1.0.0</span>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center justify-end gap-4">
              <ThemeToggle />{' '}
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </SidebarInset>
    </div>
  );
}
