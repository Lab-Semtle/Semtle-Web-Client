import { cn } from '@/lib/utils';
import {
  Button,
  type ButtonProps as BaseButtonProps,
} from '@/components/ui/button';

type ButtonProps = {
  children: React.ReactNode;
  asChild?: boolean;
} & BaseButtonProps;

export const VariantShineButton = ({
  children,
  asChild,
  ...rest
}: ButtonProps) => {
  return (
    <Button
      {...rest}
      asChild={asChild}
      className={cn(
        'group relative overflow-hidden ease-in-out hover:scale-105 hover:shadow-lg',
        !rest.className?.includes('bg-') &&
          'bg-gradient-to-tr from-zinc-900 to-zinc-700 text-zinc-50 hover:shadow-zinc-500/30',
        !rest.className?.includes('dark:bg-') &&
          'dark:bg-gradient-to-tr dark:from-zinc-50 dark:to-zinc-100 dark:text-zinc-900 dark:hover:shadow-zinc-700/30',
        rest.className,
      )}
    >
      {asChild ? (
        children
      ) : (
        <>
          <span>{children}</span>
          <span className="absolute inset-0 flex size-full justify-center [transform:skew(-14deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-14deg)_translateX(100%)]">
            <span className="relative h-full w-8 bg-white/20 dark:bg-black/10" />
          </span>
        </>
      )}
    </Button>
  );
};
