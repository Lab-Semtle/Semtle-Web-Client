'use client';
import { GalleryVerticalEnd, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AdminLoginForm } from '@/components/form/AdminLoginForm';

export default function ExecutivePage() {
  const router = useRouter();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            ARCHI SEMTLE
          </a>
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
            <AdminLoginForm />
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
