import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';

interface RecentActivityPost {
  board_id: number;
  title: string;
  content: string;
  createdAt: string;
  writer: string;
  type: string;
  imageUrl?: string;
}

interface RecentActivityResponse {
  total_post: number;
  current_page: number;
  total_pages: number;
  posts: {
    board_id: number;
    title: string;
    content: string;
    createdAt: string;
    writer: string;
    type: string;
    images?: string[];
  }[];
}

export function useFetchActivitiesRecent(limit = 3) {
  const [posts, setPosts] = useState<RecentActivityPost[]>([]);
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

        const result: {
          success: boolean;
          message: string;
          data?: RecentActivityResponse;
          error?: string;
        } = await response.json();

        console.log('[GET_ACTIVITY_RECENT] API 응답 데이터:', result);

        if (!result.success || !result.data?.posts) {
          throw new Error(result.error || 'API 응답 형식이 올바르지 않습니다.');
        }

        const postsData = result.data.posts;

        if (postsData.length === 0) {
          console.warn('최근 활동 게시물이 없습니다.');
        }

        // NCP Presigned URL을 가져와서 업데이트
        const updatedPosts = await Promise.all(
          postsData.map(async (post) => {
            const imagePath = post.images?.[0] ?? undefined;
            const imageUrl = imagePath
              ? await fetchNcpPresignedUrl(imagePath).then(
                  (url) => url ?? undefined,
                ) // 🔹 null → undefined 변환
              : undefined;

            return {
              board_id: post.board_id,
              title: post.title,
              content: post.content,
              createdAt: post.createdAt,
              writer: post.writer,
              type: post.type,
              imageUrl,
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
