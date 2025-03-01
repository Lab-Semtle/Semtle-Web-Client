'use client';

import PostForm from '@/components/form/ActivityEditForm';
import { useRouter } from 'next/navigation';
import { API_ROUTES } from '@/constants/ApiRoutes';

export default function ActivityCreatePage() {
  const router = useRouter();

  const handleCreate = async (formData: FormData) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('게시물이 등록되었습니다.');
      router.push('/activities');
    } else {
      alert('오류가 발생했습니다.');
    }
  };

  return <PostForm mode="create" onSubmit={handleCreate} />;
}
