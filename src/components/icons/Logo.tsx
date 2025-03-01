import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Logo() {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      src={
        resolvedTheme === 'dark'
          ? '/logo/Logo-Blue-None-v2025.svg'
          : '/logo/Logo-Sky-None-v2025.svg'
      }
      alt="semtle logo"
      width={160}
      height={160}
      className="sm:h-44 sm:w-44 lg:h-48 lg:w-48"
    />
  );
}
