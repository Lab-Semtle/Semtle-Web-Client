import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';
import { ActivityResponseSchema, ActivityPost } from '@/types/activity';

export function useFetchRecentActivities(limit = 3) {
  const [posts, setPosts] = useState<ActivityPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecentActivities() {
      setLoading(true);
      setError(null);

      try {
        console.log('[GET_ACTIVITY_RECENT] API 요청');
        const response = await fetch(API_ROUTES.GET_ACTIVITY_RECENT(limit), {
          headers: { Accept: 'application/json' },
          method: 'GET',
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('[GET_ACTIVITY_RECENT] API 응답 데이터:', result);

        if (!result.success) {
          throw new Error(result.error || 'API 응답 형식이 올바르지 않습니다.');
        }

        // Zod 스키마 검증 적용
        const validatedData = ActivityResponseSchema.parse(result.data);

        // Presigned URL 변환 및 필드명 수정
        const updatedPosts = await Promise.all(
          validatedData.posts.map(async (post) => {
            const presignedUrl = post.images?.[0]
              ? await fetchNcpPresignedUrl(post.images[0])
              : null; // undefined → null 변경

            return {
              ...post,
              images: post.images ? [presignedUrl ?? null] : undefined, // undefined 대신 null 유지
            };
          }),
        );

        setPosts(updatedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchRecentActivities();
  }, [limit]);

  return { posts, loading, error };
}
