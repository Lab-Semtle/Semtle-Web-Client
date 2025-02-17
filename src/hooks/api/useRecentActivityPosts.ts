import { useEffect, useState } from 'react';
import { initMSW } from '@/mocks/msw-init'; // MSW 초기화 함수
import apiClient from '@/lib/api/apiClient'; // Fetch API Client
import { ApiResponseWithData, isApiResponseError } from '@/types/apiTypes'; // API 반환 타입
import { API_ROUTES } from '@/lib/api/apiRoutes';

interface ActivityPost {
  id: number;
  title: string;
  summary: string;
  createdAt: string;
}

export function useRecentActivityPosts(limit = 3) {
  const [posts, setPosts] = useState<ActivityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        await initMSW();
        console.log('[useEffect] MSW 초기화 완료, API 요청 시작');
      }

      try {
        // API 호출
        const response = await apiClient.get<
          ApiResponseWithData<{ posts: ActivityPost[] }>
        >(API_ROUTES.READ_RECENT_ACTIVITY(limit));

        if (isMounted && response?.data && 'posts' in response.data) {
          const { posts } = response.data;
          if (Array.isArray(posts)) {
            setPosts(posts);
          } else {
            throw new Error(
              'Invalid response structure: posts is not an array',
            );
          }
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching recent activity posts:', error);
        setError('Failed to load news');
        throw error;
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { posts, loading, error };
}
