'use client';

import { useRouter } from 'next/navigation';
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

import { useSignInForm } from '@/hooks/use-signin-form';
import { signInWithCredentials } from '@/lib/auth/server-action';

import {
  validateEmail,
  validatePassword,
} from '@/lib/validation/signin-validation';
import { loginApi, resetPasswordApi } from '@/services/auth';

export default function SignInPage() {
  const {
    email,
    password,
    showPassword,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    togglePasswordVisibility,
    resetErrors,
    setEmailError,
    setPasswordError,
  } = useSignInForm();
  const { toast } = useToast();
  const router = useRouter();

  // 로그인 버튼 클릭 시 동작, next-auth 핸들러
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(
      password,
      email.split('@')[0],
    );

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      toast({
        title: '로그인 실패',
        description: emailValidationError || passwordValidationError,
      });
      return;
    }

    try {
      await loginApi(email, password);
      router.push('/');
    } catch (error: any) {
      toast({
        title: '로그인 실패',
        description: error.message,
      });
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPasswordApi(email);
      toast({
        title: '비밀번호 재설정 성공',
        description: '이메일로 비밀번호 재설정 링크가 발송되었습니다.',
      });
    } catch (error: any) {
      toast({
        title: '비밀번호 재설정 실패',
        description: error.message,
      });
    }
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

        {/* 로그인 섹션 */}
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
            <form
              action={signInWithCredentials}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              {/* 이메일 입력 */}
              <div className="flex flex-col space-y-1">
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="학교 이메일"
                  required
                />
                {emailError && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>

              {/* 비밀번호 입력 */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center rounded-md border">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="비밀번호"
                    required
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
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
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
            <Button
              variant="link"
              onClick={handleResetPassword}
              className="w-full text-sm sm:w-1/3"
            >
              비밀번호를 잊으셨나요?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
