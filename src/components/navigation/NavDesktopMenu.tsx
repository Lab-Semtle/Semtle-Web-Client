'use client';

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface NavDropdownItemProps {
  triggerLabel: string;
  sections: Section[];
}

export default function NavDesktopMenu({
  triggerLabel,
  sections,
}: NavDropdownItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-base font-semibold">
        {triggerLabel}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <MenuSection sections={sections} />
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

interface Section {
  label: string;
  href: string;
  desc: string;
}

const MenuSection = ({
  sections,
  onClickSection,
}: {
  sections: Section[];
  onClickSection?: (title: string, href: string) => void;
}) => {
  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {sections.map((section) => (
        <ListItem
          key={section.label}
          label={section.label}
          href={section.href}
          onClick={() => onClickSection?.(section.label, section.href)} // onClickSection이 있으면 호출
        >
          {section.desc}
        </ListItem>
      ))}
    </ul>
  );
};

const ListItem = ({
  className,
  label,
  children,
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<'a'> & {
  label: string;
  onClick: () => void;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
          onClick={onClick}
        >
          <div className="text-sm font-medium leading-none">{label}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = 'ListItem';
