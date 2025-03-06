'use client';

import { MemberBulkDropzone } from '@/components/file/MemberBulkDropzone';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import NCPPathDownloader from '@/components/file/NCPPathDownloader';

export default function BulkSignupPage() {
  const router = useRouter();

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">일괄 회원가입</h2>
      {/* 드롭존 컴포넌트 */}
      <MemberBulkDropzone />

      <NCPPathDownloader directory="template/signup" />

      {/* 구분선 */}
      <Separator className="my-6" />
    </div>
  );
}
