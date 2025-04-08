'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function MyPageLayout({
  content,
}: {
  content: React.ReactNode;
}) {
  const pathname = usePathname();

  if (!content) {
    redirect('/mypage/projects');
  }

  return (
    <div className="border-b pt-24">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
        {/* 탭 메뉴 */}
        <div className="flex flex-wrap gap-3 border-b pb-2">
          {[
            { name: '내 프로젝트 공고', path: '/mypage/projects' },
            { name: '프로젝트 신청 목록', path: '/mypage/applications' },
            { name: '프로젝트 성과', path: '/mypage/promotions' },
            { name: '업로드한 족보 목록', path: '/mypage/secret' },
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
        {/* 탭 콘텐츠 (병렬 슬롯) */}
        <div className="pt-6">{content}</div>
      </div>
    </div>
  );
}
