'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SecretNoteEditor, { FormValues } from '@/components/form/SecretEditForm';
import { API_ROUTES } from '@/constants/ApiRoutes';

export default function ModifyPostEditor() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
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

  const fetchPost = useCallback(async () => {
    if (!id || status !== 'authenticated') return;

    try {
      setLoading(true);
      const response = await fetch(API_ROUTES.GET_ARCHIVE_DETAIL(id), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('게시글을 불러오는 데 실패했습니다.');
      }

      const result = await response.json();
      const postData = result.data;

      setPost({
        title: postData.title,
        content: postData.content,
        created_at: postData.createdAt,
        imagePath: postData.imageUrl?.[0] || '',
        filePaths: postData.fileUrl || [],
      });
    } catch (err) {
      console.error('게시글 불러오기 오류:', err);
      setError('게시글을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [id, session?.accessToken, status]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleUpdatePost = async (data: FormData) => {
    try {
      if (status !== 'authenticated' || !session?.id) {
        alert('로그인이 필요합니다.');
        return;
      }

      const requestBody = {
        writer: session.user?.name || 'USER',
        content: data.get('content') as string,
        title: data.get('title') as string,
        uuid: session.id,
        createdAt: data.get('created_at') as string,
        imageUrl: data.get('imagePath')
          ? [data.get('imagePath') as string]
          : [],
        fileUrl: data.getAll('filePaths') as string[],
      };

      const response = await fetch(API_ROUTES.UPDATE_ARCHIVE(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('서버 오류 응답:', errorData);
        throw new Error(errorData.message || '게시글 수정 실패');
      }

      alert('게시글이 성공적으로 수정되었습니다!');
      router.push(`/secret/${id}`);
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      alert('게시글을 수정하는 중 오류가 발생했습니다.');
    }
  };
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-auto mt-[100px] max-w-screen-lg p-4">
      {post && (
        <SecretNoteEditor
          mode="update"
          initialValues={post}
          onSubmit={handleUpdatePost}
        />
      )}
    </div>
  );
}
