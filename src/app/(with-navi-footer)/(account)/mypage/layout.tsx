'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';

export default function MyPageLayout({
  content,
}: {
  content: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <MyPageLayoutContent content={content} />
    </SessionProvider>
  );
}

function MyPageLayoutContent({ content }: { content: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (!content) {
    redirect('/mypage/projects');
  }

  return (
    <div className="border-b pt-44">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={session?.user.image || '/images/default-profile.jpg'}
                alt="User Avatar"
              />
              <AvatarFallback>
                {session?.user.name.charAt(4) || 'USER'}
              </AvatarFallback>
            </Avatar>
            <span className="text-2xl font-bold tracking-tight">
              {status === 'loading'
                ? '로딩 중...'
                : session?.user.name || '유저 이름'}
            </span>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="mt-8 flex gap-4 border-b">
          {[
            { name: '프로젝트 공고', path: '/mypage/projects' },
            { name: '족보', path: '/mypage/secret' },
            { name: '프로젝트 신청 내역', path: '/mypage/applications' },
            { name: '프로젝트 성과', path: '/mypage/promotions' },
          ].map((tab) => (
            <Link
              key={tab.path}
              href={tab.path}
              className={`px-4 py-2.5 text-base font-medium transition ${
                pathname === tab.path
                  ? 'rounded-md border-b-4 border-blue-900 bg-gray-200 font-bold text-primary dark:border-blue-400 dark:bg-gray-700'
                  : 'rounded-md border-b-2 border-transparent text-muted-foreground hover:border-muted dark:text-gray-300 dark:hover:border-gray-500'
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 탭 콘텐츠 (병렬 슬롯) */}
      <div className="container mx-auto p-6 px-6 md:px-12">{content}</div>
    </div>
  );
}
