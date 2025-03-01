import { useState } from 'react';
import { cn } from '@/lib/utils/tailwind-cn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LucideEye, LucideEyeOff } from 'lucide-react';

type AdminLoginFormProps = {
  onSubmit: (password: string) => Promise<void>;
  loading: boolean;
};

/** 관리자 로그인 폼 */
export function AdminLoginForm({
  onSubmit,
  loading,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> & AdminLoginFormProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim()) return; // 빈 비밀번호 방지
    await onSubmit(password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">공홈관리시스템</h1>
        <p className="text-balance text-sm text-muted-foreground">
          관리자 비밀번호를 입력해주세요.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">비밀번호</Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
            >
              {showPassword ? (
                <LucideEyeOff size={20} />
              ) : (
                <LucideEye size={20} />
              )}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? '인증 중...' : '인증하기'}
        </Button>
      </div>
    </form>
  );
}
