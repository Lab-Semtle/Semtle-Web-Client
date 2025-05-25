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

      // 이미지의 확장자 유효성 검사, jpg, png, jpeg 형식만 허용
      if (Array.isArray(requestBody.imageUrl) && requestBody.imageUrl.length > 0) {
        const isAllValid = requestBody.imageUrl.every((url) => {
          const lowerUrl = url.toLowerCase();
          return (
            lowerUrl.endsWith('.jpg') ||
            lowerUrl.endsWith('.jpeg') ||
            lowerUrl.endsWith('.png')
          );
        });

        if (!isAllValid) {
          console.log(requestBody.imageUrl);
          alert('모든 이미지 파일은 jpg, png, jpeg 형식이어야 합니다.');
          throw new Error('Invalid image format');
        }
      }

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
