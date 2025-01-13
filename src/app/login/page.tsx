'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 시 '/'로 리다이렉트
        router.push('/');
        console.log('API 응답:', data);
      } else {
        setError(data.message || '로그인 실패');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || '예기치 못한 오류가 발생했습니다.');
      } else {
        setError('예기치 못한 오류가 발생했습니다.');
      }
    }
  };

  const handleRecruiting = () => {
    // 가입하기 버튼 클릭 시 '/signup' 페이지로 이동
    router.push('/recruiting');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-center">
          <Image
            src="/logo.jpg"
            alt="semtle logo"
            width={140}
            height={60}
            priority
          />
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-gray-500"
            >
              {showPassword ? '🤦🏻' : '🙎🏻'}
            </button>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <div className="flex items-center justify-between space-x-4">
            <button
              type="submit"
              className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={handleRecruiting}
              className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition duration-200 hover:bg-gray-300"
            >
              가입하기
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>비밀번호를 잊어버리셨나요?</p>
          <p className="cursor-pointer text-blue-500 hover:underline">
            가입했던 이메일로 재설정 메일 보내기
          </p>
        </div>
      </div>
    </div>
  );
}
