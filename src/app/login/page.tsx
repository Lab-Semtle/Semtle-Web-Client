'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EyeIcon from '@/components/icons/LightBlubFillIcon';
import EyeSlashIcon from '@/components/icons/LightBlulb';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.jpg"
            alt="semtle logo"
            width={140}
            height={60}
            priority
          />
        </div>
        <form className="space-y-3">
          <div className="flex flex-col space-y-1">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="학교 이메일"
              required
            />
          </div>
          <div className="mb-0.5 flex items-center rounded-md border">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
              className="flex-1 border-none px-3 focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-3 text-gray-500"
            >
              {showPassword ? (
                <EyeSlashIcon
                  width={20}
                  height={20}
                  className="text-gray-500"
                />
              ) : (
                <EyeIcon width={20} height={20} className="text-gray-500" />
              )}
            </button>
          </div>
          <div className="mt-0 flex items-center justify-between">
            <Label className="text-sm text-red-500">{error || null}</Label>
            <Button
              variant="link"
              onClick={() => alert('비밀번호 재설정')}
              className="p-0 text-sm"
            >
              비밀번호 찾기
            </Button>
          </div>
          <Button type="submit" className="mt-2 w-full">
            로그인
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push('/recruiting')}
            className="mt-2 w-full text-center"
          >
            가입하기
          </Button>
        </form>
      </div>
    </div>
  );
}
