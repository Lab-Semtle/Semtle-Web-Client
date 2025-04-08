import { useState, useEffect } from 'react';
import { ProjectPost } from '@/types/project';
import { API_ROUTES } from '@/constants/ApiRoutes';

export const useProjectDetail = (id: string | undefined) => {
  const [postData, setPostData] = useState<ProjectPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchPostData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ROUTES.GET_PROJECT_DETAIL(Number(id)));

        if (!response.ok) throw new Error('게시물을 불러오는 데 실패했습니다.');

        const json = await response.json();
        if (json.success && json.data) {
          setPostData(json.data);
        } else {
          throw new Error(json.message || '데이터를 가져오는 중 오류 발생');
        }
      } catch (error) {
        console.error('Failed to fetch post data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  return { postData, loading, error };
};
