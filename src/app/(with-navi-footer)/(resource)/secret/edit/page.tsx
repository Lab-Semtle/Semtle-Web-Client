'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SecretNoteEditor from '@/components/form/SecretEditForm';
import { FormValues } from '@/components/form/SecretEditForm';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchPresignedUrl } from '@/hooks/api/useFetchPresignedUrls';

export default function EditPage() {
  const router = useRouter();
  const { data: session, status } = useSession(); // 현재 로그인한 사용자 세션 가져오기

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다.');
      router.push('/signin');
    }
  }, [status, router]);

  const handleCreatePost = async (data: FormValues) => {
    if (!session?.id) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      console.log('📢 게시글 작성 요청 데이터:', data);

      if (status !== 'authenticated' || !session?.id) {
        alert('로그인이 필요합니다.');
        return;
      }

      // ✅ 이미지 및 파일 Presigned URL 변환 적용
      const uploadedImages = await Promise.all(
        (data.initialImages || []).map(async (img) => ({
          ...img,
          url: img.file ? await fetchPresignedUrl(img.file.name) : img.url,
        })),
      );

      const uploadedFiles = await Promise.all(
        (data.initialFiles || []).map(async (file) => ({
          ...file,
          url: file.file ? await fetchPresignedUrl(file.file.name) : file.url,
        })),
      );

      const requestBody = {
        title: data.title,
        content: data.content,
        createdAt: data.created_at,
        uuid: session.id, // ✅ 세션에서 가져온 UUID 추가
        images: uploadedImages.map((img) => img.url),
        files: uploadedFiles.map((file) => file.url),
        deletedImages: data.deletedImages || [],
        deletedFiles: data.deletedFiles || [],
      };

      console.log('🔑 API 요청 데이터:', requestBody);

      const response = await fetch(API_ROUTES.CREATE_ARCHIVE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`, // ✅ next-auth 토큰 사용
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📩 서버 응답 상태:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ 서버 오류 응답:', errorData);
        throw new Error(errorData.message || '게시글 생성 실패');
      }

      const result = await response.json();
      console.log('✅ 게시글 생성 완료:', result);

      router.push(`/secret/${result.data.board_id}`); // ✅ 생성된 게시글 상세 페이지로 이동
    } catch (error) {
      console.error('❌ 게시글 생성 실패:', error);
      alert('게시글을 생성하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="mx-auto mt-[100px] max-w-screen-lg p-4">
      <SecretNoteEditor onSubmit={handleCreatePost} />
    </div>
  );
}
