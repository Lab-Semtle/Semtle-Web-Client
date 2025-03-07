'use client';

import { useState } from 'react';
import { GalleryVerticalEnd, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { useToast } from '@/hooks/useToast';
import { AdminLoginForm } from '@/components/form/AdminLoginForm';
import { API_ROUTES } from '@/constants/ApiRoutes';

export default function ManagerPage() {
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleAdminAuth = async (password: string) => {
    if (status === 'loading') {
      return;
    }

    if (!session?.accessToken) {
      toast({
        variant: 'destructive',
        title: '인증 실패',
        description: '로그인이 필요합니다. 다시 로그인해주세요.',
        duration: 2000,
      });
      router.push('/signin');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ROUTES.AUTH_MANAGER_SIGNIN, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ password }),
      });

      const responseText = await response.text();
      const result = responseText ? JSON.parse(responseText) : null;

      if (!response.ok || !result.success) {
        console.error('[handleAdminAuth] 로그인 실패:', result.message);
        throw new Error(
          result.message || '로그인이 실패했습니다. 관리자 권한이 없습니다.',
        );
      }

      toast({
        title: '인증 성공',
        description: '관리자 페이지로 이동합니다.',
        duration: 2000,
      });

      router.push('/executive');
    } catch (error) {
      console.error('[handleAdminAuth] 관리자 인증 요청 중 오류 발생:', error);

      const errorMessage =
        error instanceof Error ? error.message : '관리자 인증에 실패했습니다.';

      toast({
        variant: 'destructive',
        title: '로그인 실패',
        description: errorMessage,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = (formData.get('password') as string) || '';

    if (!password.trim()) return;
    await handleAdminAuth(password);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 font-medium hover:underline"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            ARCHI SEMTLE
          </button>
        </div>

        {/* 로그인 폼 */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <button
              onClick={() => router.push('/')}
              className="mb-4 flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              돌아가기
            </button>
            <AdminLoginForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/images/kmou_2023_spring.jpg"
          alt="Login Background"
          fill
          className="dark:contrast-110 object-cover brightness-100 dark:brightness-75"
          priority
        />
      </div>
    </div>
  );
}
