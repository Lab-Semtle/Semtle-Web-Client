/** 네비게이션 바 다크모드(화이트모드) 전환 버튼 */

import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from 'lucide-react';

interface DarkModeButtonProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function DarkModeButton({
  isDarkMode,
  toggleDarkMode,
}: DarkModeButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={toggleDarkMode}
      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 scale-125 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 scale-125 text-blue-400" />
      )}
    </Button>
  );
}
