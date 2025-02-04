'use client';

import { signInWithCredentials } from '@/lib/auth/server-action';
import { loginSchema } from '@/lib/validation/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { startTransition } from 'react';

import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
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
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 리다이렉트 없이 로그인 검증
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log('[SignInPage] 제출된 로그인 데이터:', data);
    startTransition(async () => {
      try {
        await signInWithCredentials(data);
        console.log('[SignInPage] 로그인 성공');
        router.push('/'); // 로그인 성공 시 메인 페이지로 리다이렉트 -> Mock 제거시 중복 로직일 수 있음
      } catch (error: unknown) {
        handleSignInError(error);
      }
    });
  };

  const handleSignInError = (error: unknown) => {
    let errorMessage = '알 수 없는 오류가 발생했습니다.';

    if (error instanceof Error) {
      errorMessage = error.message || '알 수 없는 오류가 발생했습니다.';
    }

    // 특정 에러 메시지에 따라 처리할 경우
    switch (errorMessage) {
      case 'NON_EXISTENT_ACCOUNT':
        errorMessage = '등록되지 않은 이메일입니다.';
        break;
      case 'MISMATCHED_PASSWORD':
        errorMessage = '비밀번호가 틀렸습니다.';
        break;
    }

    // Toast 알림 호출
    toast({
      variant: 'destructive',
      title: '로그인 실패',
      description: errorMessage,
      duration: 2000,
    });

    console.error('[SignInPage] 로그인 실패:', error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xs space-y-6 sm:max-w-md lg:max-w-lg">
        {/* 홈으로 돌아가기 버튼 */}
        <div className="text-left">
          <Button onClick={() => router.push('/')} variant="ghost">
            <ArrowLeft className="mr-1" /> 홈으로 돌아가기
          </Button>
        </div>

        {/* 로그인 카드 섹션 */}
        <Card>
          <CardHeader className="text-center">
            {/* 로고 */}
            <div className="flex flex-col items-center">
              <Image
                src="/images/semtle_logo_square_none.png"
                alt="semtle logo square none"
                width={80}
                height={80}
                className="sm:h-20 sm:w-20 lg:h-28 lg:w-28"
              />
              <CardTitle className="mt-4 text-base sm:text-lg lg:text-xl">
                아치셈틀 공식 홈페이지에 오신 것을 환영합니다!
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 sm:text-base">
                학교 이메일주소와 비밀번호를 입력하여 로그인을 진행해주세요.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* 이메일 입력 폼 */}
              <div className="flex flex-col space-y-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="학교 이메일"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* 비밀번호 입력 */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center rounded-md border">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호"
                    {...register('password')}
                    aria-invalid={!!errors.password} // 에러 발생 시 시각적 접근성 대응
                    className="flex-1 border-none px-3 focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="px-3 text-gray-500"
                  >
                    {showPassword ? (
                      <LucideEyeOff
                        width={20}
                        height={20}
                        className="text-gray-500"
                      />
                    ) : (
                      <LucideEye
                        width={20}
                        height={20}
                        className="text-gray-500"
                      />
                    )}
                  </button>
                </div>
                {/* 에러 메세지 표시 */}
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* 버튼 섹션 */}
              <div className="space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-slate-950 hover:bg-slate-800"
                >
                  로그인
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
            <Button
              variant="secondary"
              onClick={() => router.push('/recruiting')}
              className="w-full bg-white hover:bg-slate-300 sm:w-1/3"
            >
              가입하기
            </Button>
            <Button variant="link" className="w-full text-sm sm:w-1/3">
              비밀번호를 잊으셨나요?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
