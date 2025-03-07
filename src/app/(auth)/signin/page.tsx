'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // ✅ 클라이언트에서 NextAuth.js `signIn()` 사용
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/useToast';
import { loginSchema } from '@/lib/validation/login-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { ArrowLeft, LucideEye, LucideEyeOff } from 'lucide-react';
import { useTheme } from 'next-themes';

const ERROR_MESSAGES: Record<string, string> = {
  '400': '잘못된 요청입니다.',
  '401': '이메일 또는 비밀번호가 올바르지 않습니다.',
  '403': '접근 권한이 없습니다.',
  '404': '요청한 정보를 찾을 수 없습니다.',
  '500': '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

export default function SignInPage() {
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof loginSchema>
  >({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });
  const { errors } = formState;
  const router = useRouter();
  const { toast } = useToast();
  const { resolvedTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (signinData: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: signinData.email,
        password: signinData.password,
        redirect: false,
      });

      if (!result || result.error) {
        const errorMessage =
          ERROR_MESSAGES[result?.error || '500'] ||
          '로그인 중 오류가 발생했습니다.';
        toast({
          variant: 'destructive',
          title: '로그인 실패',
          description: errorMessage,
          duration: 2000,
        });
        return;
      }

      toast({
        title: '로그인 성공',
        description: '홈 화면으로 이동합니다.',
        duration: 1000,
      });
      router.push('/');
    } catch (error) {
      console.error('[signInWithCredentials] 로그인 중 오류 발생:', error);
      toast({
        variant: 'destructive',
        title: '로그인 실패',
        description: '예기치 않은 오류가 발생했습니다.',
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/kmou_2022.jpg"
          alt="background"
          fill
          style={{ objectFit: 'cover' }}
          className="contrast-95 brightness-90 dark:brightness-50 dark:grayscale"
          priority
        />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
      </div>

      <div className="relative z-10 w-full max-w-xs space-y-6 sm:max-w-md lg:max-w-lg">
        <div className="text-left">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="flex items-center rounded-md bg-gray-200 px-4 py-2 text-gray-950 shadow-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            <ArrowLeft className="mr-2 size-7 text-gray-900 dark:text-white" />
            홈으로 돌아가기
          </Button>
        </div>

        <Card className="bg-white/90 shadow-lg backdrop-blur-md dark:bg-gray-800/80 dark:shadow-gray-700/50">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center">
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
              <CardTitle className="mt-4 text-lg text-gray-900 dark:text-gray-100 sm:text-xl lg:text-2xl">
                아치셈틀 공식 홈페이지에 오신 것을 환영합니다!
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                학교 이메일주소와 비밀번호를 입력하여 로그인을 진행해주세요.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="학교 이메일"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                  className="bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex items-center rounded-md border bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호"
                    {...register('password')}
                    aria-invalid={!!errors.password}
                    className="flex-1 border-none bg-transparent px-3 text-gray-900 focus:outline-none focus:ring-0 dark:text-gray-200"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="px-3 text-gray-500 dark:text-gray-300"
                  >
                    {showPassword ? (
                      <LucideEyeOff width={20} height={20} />
                    ) : (
                      <LucideEye width={20} height={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                {loading ? '로그인 중...' : '로그인'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
