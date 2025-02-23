/** 로그인 페이지 */

'use client';
import { useState } from 'react';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
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
import { signInWithCredentials } from '@/lib/auth/auth.server';

// 서버에서 반환하는 상태 코드에 대한 매핑
const ERROR_MESSAGES: Record<string, string> = {
  '400': '잘못된 요청입니다.',
  '401': '이메일 또는 비밀번호가 올바르지 않습니다.',
  '403': '접근 권한이 없습니다.',
  '404': '요청한 정보를 찾을 수 없습니다.',
  '500': '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

export default function SignInPage() {
  // 입력값 검증
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
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 로그인 요청 핸들러
  const onSubmit = async (signinData: z.infer<typeof loginSchema>) => {
    console.log('[SignInPage] 제출된 로그인 데이터:', signinData);
    setLoading(true);

    startTransition(async () => {
      try {
        await signInWithCredentials(signinData);
        console.log('[SignInPage] 로그인 성공');
      } catch (error) {
        console.error('[SignInPage] 로그인 실패:', error);
        const errorMessage =
          (error as Error).message ||
          '로그인 요청 중 알 수 없는 오류가 발생했습니다.';

        // 서버에서 받은 응답 메시지를 토스트로 표시
        toast({
          variant: 'destructive',
          title: '로그인 실패',
          description: errorMessage,
          duration: 2000,
        });
      }
    });
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
                  {loading ? '로그인 중...' : '로그인'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
            <Button
              variant="secondary"
              onClick={() => router.push('/recruit')}
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
