// 로그인 페이지
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 컴포넌트
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// 아이콘
import EyeIcon from '@/components/icons/LightBlubFillIcon';
import EyeSlashIcon from '@/components/icons/LightBlulb';

// LoginPage 컴포넌트 정의
export default function LoginPage() {
  // 이메일, 비밀번호, 비밀번호 보기 상태, 에러 메시지 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 로그인 폼 제출 시 처리 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    setError(null); // 에러 메시지 초기화

    // 이메일과 비밀번호가 입력되지 않았을 경우 에러 메시지 설정
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      // Mock API 호출
      const response = await fetch('/api/mock-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // 입력 데이터 전송
      });

      const data = await response.json(); // 응답 데이터 JSON 파싱

      // 로그인 성공 처리
      if (response.ok) {
        router.push('/'); // home 페이지로 리다이렉트
        console.log('API 응답:', data);
      } else {
        setError(data.message || '로그인 실패');
      }
    } catch (err) {
      if (err instanceof Error) {
        // 실패 시 에러 메시지
        setError(err.message || '예기치 못한 오류가 발생했습니다.');
      } else {
        // 예외 처리 (네트워크 오류 등)
        setError('예기치 못한 오류가 발생했습니다.');
      }
    }
  };

  // 가입하기 버튼 클릭 시 호출 함수
  const handleRecruiting = () => {
    router.push('/recruiting'); // join 페이지로 리다이렉트
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center">
            <Image
              src="/logo.jpg"
              alt="semtle logo"
              width={140}
              height={60}
              priority
            />
          </div>
          <CardTitle>로그인</CardTitle>
          <CardDescription>계정 정보를 입력해 주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@g.kmou.ac.kr"
                required
              />
            </div>
            <div className="relative flex flex-col space-y-1.5">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[58%] -translate-y-1/2 text-gray-500"
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
            {error && <div className="text-sm text-red-500">{error}</div>}
            <Button type="submit" className="w-full">
              로그인
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleRecruiting}>
            가입하기
          </Button>
          <Button variant="link" onClick={() => alert('비밀번호 재설정')}>
            비밀번호를 잊으셨나요?
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
