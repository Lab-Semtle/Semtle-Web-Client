'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SecretNoteEditor from '@/components/form/SecretEditForm';
import { FormValues } from '@/components/form/SecretEditForm';

export default function EditPage() {
  const router = useRouter();
  const { data: session, status } = useSession(); // 현재 로그인한 사용자 세션 가져오기

  const handleCreatePost = async (data: FormValues) => {
    try {
      console.log('📢 게시글 작성 요청 데이터:', data);

      console.log('📢 세션 유저 id:', session?.id);
      if (status !== 'authenticated' || !session?.id) {
        alert('로그인이 필요합니다.');
        return;
      }

      const requestBody = {
        ...data,
        uuid: session.id, // 세션에서 가져온 UUID 추가
      };

      console.log('🔑 API 요청 데이터:', requestBody);

      const response = await fetch('/api/archives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`, // next-auth 토큰 사용
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

      router.push(`/secret/${result.data.post_id}`); // 생성된 게시글로 리디렉션
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
