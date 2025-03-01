'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PostForm from '@/components/form/ActivityEditForm';

interface PostData {
  board_id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  images?: string[];
  type: string;
}

export default function ActivityEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [postData, setPostData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/activities/${id}`);
        if (!response.ok) throw new Error('게시물을 불러오는 데 실패했습니다.');

        const { success, data } = await response.json();
        if (success) {
          setPostData(data);
        } else {
          throw new Error('데이터 로드 실패');
        }
      } catch (error) {
        console.error(error);
        alert('게시물을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('게시물 수정 실패');

      alert('게시물이 수정되었습니다.');
      router.push('/activities');
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!postData) return <p>게시물을 찾을 수 없습니다.</p>;

  return (
    <PostForm
      mode="update"
      initialData={{
        title: postData.title,
        category: postData.type,
        content: postData.content,
        imageUrl: postData.images?.[0] || '',
      }}
      onSubmit={handleUpdate}
    />
  );
}
