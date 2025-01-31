'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, LucideEye, LucideEyeOff } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { loginApi } from '@/services/authAPI';
import { resetPasswordApi } from '@/services/authAPI';
import { signIn } from '@/lib/authClient';
import { signInWithCredentials } from '@/lib/authServerAction';

export default function SignInPage() {
  const [email, setEmail] = useState('@g.kmou.ac.kr'); // 초기값 설정
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { toast } = useToast(); // toast 초기화
  const router = useRouter();

  // 이메일 검증 로직
  const validateEmail = (email: string) => {
    if (/\s/.test(email)) {
      return '공백이 포함된 이메일은 입력할 수 없습니다.';
    }
    return null;
  };

  // 비밀번호 검증 로직
  const validatePassword = (password: string, emailUsername: string) => {
    if (password.length < 8) {
      return '비밀번호는 최소 8자 이상 입력해야합니다.';
    }
    if (!/[a-z]/.test(password)) {
      return '비밀번호에 최소 1개의 영문 소문자(a-z)가 포함되어야 합니다.';
    }
    if (!/\d/.test(password)) {
      return '비밀번호에 최소 1개의 숫자(0-9)가 포함되어야 합니다.';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return '비밀번호에 최소 1개의 특수 문자( !,@,#,%,^,&,* )가 포함되어야 합니다.';
    }
    if (/[(){}[\]<>]/.test(password)) {
      return '비밀번호에 괄호( (,),[,],{,},<,> )를 사용할 수 없습니다.';
    }
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password)) {
      return '비밀번호에 한글을 포함할 수 없습니다.';
    }
    if (password.includes(emailUsername)) {
      return '비밀번호에 이메일과 동일한 문자열을 포함할 수 없습니다.';
    }
    return null;
  };

  // 이메일 입력 변경 시 상태 업데이트
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // useToast 기반의 오류 처리 함수
  const showErrorToast = (message: string) => {
    toast({
      title: '로그인 실패',
      description: message,
    });
  };

  // login API
  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi(email, password);

      if (response.data.success) {
        router.push('/');
      } else {
        showErrorToast(response.data.message || '로그인 실패');
      }
    } catch (err) {
      console.error('로그인 중 에러 발생:', err);
      showErrorToast('서버와 통신할 수 없습니다. 다시 시도해 주세요.');
    }
  };

  // 비밀번호 재설정 API 요청 함수
  const resetPassword = async () => {
    try {
      const response = await resetPasswordApi(email);

      if (response.data.success) {
        showErrorToast('비밀번호 재설정 성공');
      } else {
        showErrorToast(response.data.message || '비밀번호 재설정 실패');
      }
    } catch (err) {
      console.error('비밀번호 재설정 중 에러 발생:', err);
      showErrorToast('서버와 통신할 수 없습니다. 다시 시도해 주세요.');
    }
  };

  // 로그인 버튼 클릭 시 동작
  // next-auth 핸들러
  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    const emailError = validateEmail(email);
    setEmailError(emailError);

    const emailUsername = email.split('@')[0];
    const passwordError = validatePassword(password, emailUsername);
    setPasswordError(passwordError);

    // 모든 검증이 통과되었을 경우에만 API 호출?
    if (!emailError && !passwordError) {
      const formData = new FormData(e.currentTarget);
      await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
      });
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setEmailError(null);
  //   setPasswordError(null);

  //   const emailError = validateEmail(email);
  //   setEmailError(emailError);

  //   const emailUsername = email.split('@')[0];
  //   const passwordError = validatePassword(password, emailUsername);
  //   setPasswordError(passwordError);

  //   // 모든 검증이 통과되었을 경우에만 API 호출
  //   if (!emailError && !passwordError) {
  //     await login();
  //   }
  // };

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
                  placeholder="이메일을 입력하세요"
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
              onClick={resetPassword}
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
