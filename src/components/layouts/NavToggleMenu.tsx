/** 데스크톱 사이즈 화면에서 네비게이션 바 중앙 메뉴 */

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { NavLinkMenu } from '@/components/layouts/NavLinkMenu';
import { cn } from '@/lib/utils';
import { Session } from 'next-auth';
import { NAVIGATION_MENU } from '@/constants/navItems';
import { ROUTES } from '@/constants/routes';

export default function NavToogleMenu({
  session,
}: {
  session?: Session | null;
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center gap-1">
        <NavLinkMenu href={ROUTES.HOME} label="처음으로" />
        {NAVIGATION_MENU.filter((menu) =>
          menu.label === '사용자 메뉴' ? session?.user : true,
        ).map((menu) => (
          <NavigationMenuItem key={menu.label}>
            <NavigationMenuTrigger className="bg-transparent text-base font-semibold transition-all hover:bg-gray-300/40 hover:text-gray-900 dark:hover:bg-gray-700/40 dark:hover:text-white">
              {menu.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {menu.items.map((item) => (
                  <li key={item.href}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        className={cn(
                          'block select-none space-y-1 rounded-lg px-4 py-2 leading-none no-underline outline-none transition-all',
                          'bg-transparent text-inherit hover:bg-gray-300/40 hover:text-gray-900 dark:hover:bg-gray-700/40 dark:hover:text-white',
                        )}
                      >
                        <div className="text-sm font-medium leading-none">
                          {item.label}
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.desc}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
