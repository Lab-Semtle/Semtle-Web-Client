// 로그인 페이지
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import EyeIcon from '@/components/icons/LightBlubFillIcon';
import EyeSlashIcon from '@/components/icons/LightBlulb';

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
        {/* Semtle 아이콘 */}
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
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* 이메일 입력 필드 */}
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

            {/* 비밀번호 입력 필드, 비밀번호 확인 아이콘 버튼 */}
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

            {/* 에러 메시지 라벨 및 비밀번호 찾기 링크 */}
            <div className="mt-1 flex items-center justify-between">
              <div className="h-5 text-sm text-red-500">{error || null}</div>
              <Button
                variant="link"
                onClick={() => alert('비밀번호 재설정')}
                className="text-sm"
              >
                비밀번호 찾기
              </Button>
            </div>
            <Button type="submit" className="mt-2 w-full">
              로그인
            </Button>
            <Button
              variant="secondary"
              onClick={handleRecruiting}
              className="mt-2 w-full text-center"
            >
              가입하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
