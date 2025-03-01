'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import SecretNoteEditor, { FormValues } from '@/components/form/SecretEditForm';

export default function ModifyPostEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [post, setPost] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다.');
      router.push('/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      // 게시글 데이터를 가져오는 로직
    }

    const fetchPost = async () => {
      try {
        const data = {
          title: '임시 제목입니다!',
          content: '이것은 임시 본문 내용입니다.',
          created_at: new Date().toISOString(),
        };

        const initialFiles = [
          {
            id: '1',
            name: 'example.pdf',
            size: '2.5MB',
            url: 'https://example.com/example.pdf',
          },
          {
            id: '2',
            name: 'archive.zip',
            size: '2.5MB',
            url: 'https://example.com/archive.zip',
          },
        ];

        const initialImages = [
          {
            id: '1',
            name: 'example1.jpg',
            size: '1.5MB',
            url: 'https://example.com/example1.jpg',
          },
          {
            id: '2',
            name: 'example2.png',
            size: '2.2MB',
            url: 'https://example.com/example2.png',
          },
        ];

        setPost({
          ...data,
          initialFiles,
          initialImages,
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
  }, [id, status]);

  const handleUpdatePost = async (data: FormValues) => {
    try {
      // 삭제 요청
      const deletePayload = {
        deletedFiles: data.deletedFiles || [],
        deletedImages: data.deletedImages || [],
      };

      if (
        deletePayload.deletedFiles.length > 0 ||
        deletePayload.deletedImages.length > 0
      ) {
        await fetch(`/archives/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(deletePayload),
        });
      }

      // 수정 요청
      const response = await fetch(`/archives/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('게시글 수정 실패');
      }

      const result = await response.json();
      router.push(`/secret/${result.post_id}`);
    } catch (error) {
      console.error('수정 오류:', error);
      alert('수정 중 오류가 발생했습니다.');
    }
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
