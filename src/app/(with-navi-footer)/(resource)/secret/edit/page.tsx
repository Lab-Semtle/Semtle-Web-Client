'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SecretNoteEditor from '@/components/form/SecretEditForm';
import { API_ROUTES } from '@/constants/ApiRoutes';

export default function SecretEditPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다.');
      router.push('/signin');
    }
  }, [status, router]);

  const handleCreatePost = async (formData: FormData) => {
    try {
      if (status !== 'authenticated' || !session?.id) {
        alert('로그인이 필요합니다.');
        return;
      }

      const requestBody = {
        writer: session.user?.name || '학회원',
        content: formData.get('content') as string,
        title: formData.get('title') as string,
        uuid: session.id,
        createdAt: formData.get('created_at') as string,
        imageUrl: formData.getAll('imagePath') as string[],
        fileUrl: formData.getAll('filePaths') as string[],
      };

      const response = await fetch(API_ROUTES.CREATE_ARCHIVE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('서버 오류 응답:', errorData);
        throw new Error(errorData.message || '게시글 생성 실패');
      }

      alert('게시글이 성공적으로 생성되었습니다!');
      router.push('/secret');
    } catch (error) {
      console.error('게시글 생성 실패:', error);
      alert('게시글을 생성하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mx-auto mt-[100px] max-w-screen-lg p-4">
      <SecretNoteEditor
        mode="create"
        onSubmit={handleCreatePost}
        initialValues={{
          title: '',
          content: '',
          created_at: new Date().toISOString(),
          imagePath: [],
          filePaths: [],
        }}
      />
    </div>
  );
}
