'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SecretNoteEditor, { FormValues } from '@/components/SecretNoteEditor'; 

export default function ModifyPostEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  
  const [post, setPost] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 임시 데이터 생성
        const data = {
          title: '임시 제목입니다!',
          content: '이것은 임시 본문 내용입니다.',
          created_at: new Date().toISOString(),
        };

        const initialFiles = [
            new File([new Blob(['file content for pdf'])], 'example.pdf', { type: 'application/pdf' }),
            new File([new Blob(['file content for zip'])], 'archive.zip', { type: 'application/zip' }),
          ];
          
          const initialImages = [
            new File([new Blob(['image content for jpg'])], 'example1.jpg', { type: 'image/jpeg' }),
            new File([new Blob(['image content for png'])], 'example2.png', { type: 'image/png' }),
          ];
          

        setPost({
          ...data,
          initialFiles,   // 초기 파일 리스트
          initialImages,  // 초기 이미지 리스트
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdatePost = async (data: FormValues) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('게시글 수정 실패');
    }

    const result = await response.json();
    router.push(`/secret/${result.post_id}`);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-auto mt-[100px] max-w-screen-lg p-4">
      {post && (
        <SecretNoteEditor
          initialValues={post}
          onSubmit={handleUpdatePost}
          isEdit={true}
        />
      )}
    </div>
  );
}
