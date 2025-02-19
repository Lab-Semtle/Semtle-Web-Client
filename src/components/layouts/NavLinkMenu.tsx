/** 단순한 링크로 구성된 네비게이션 항목 */

import Link from 'next/link';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils/utils';

interface NavItemProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

export const NavLinkMenu = ({ href, label, onClick }: NavItemProps) => (
  <NavigationMenuItem>
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          'bg-transparent text-base font-semibold text-inherit',
          'rounded-lg px-4 py-2 transition-colors',
          'hover:bg-gray-300/40 hover:text-gray-900 dark:hover:bg-gray-700/40 dark:hover:text-white',
        )}
        onClick={onClick}
      >
        {label}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);
