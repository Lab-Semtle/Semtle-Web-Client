'use client';
import { useRouter } from 'next/navigation';
import SecretNoteEditor from '@/components/form/SecretNoteEditor';
import { FormValues } from '@/components/form/SecretNoteEditor';

export default function EditPage() {
  const router = useRouter();

  const handleCreatePost = async (data: FormValues) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('게시글 생성 실패');
    }

    const result = await response.json();
    router.push(`/secret/${result.post_id}`); // 생성된 게시글로 리디렉션
  };

  return (
    <div className="mx-auto mt-[100px] max-w-screen-lg p-4">
      <SecretNoteEditor onSubmit={handleCreatePost} />
    </div>
  );
}
