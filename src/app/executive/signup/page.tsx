'use client';

import { MemberBulkDropzone } from '@/components/file/MemberBulkDropzone';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import NCPPathDownloader from '@/components/file/NCPPathDownloader';

export default function BulkSignupPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">일괄 회원가입</h2>
      <MemberBulkDropzone />
      <NCPPathDownloader directory="template/signup" />
      <Separator className="my-6" />
    </div>
  );
}
