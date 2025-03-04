import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';
import { ActivityPost, mapActivityList } from '@/types/activity';

/** 활동 게시물 리스트 조회 함수 */
const fetchPaginatedActivities = async (
  page: number,
  size: number,
  category?: string,
): Promise<{ posts: ActivityPost[]; totalPages: number }> => {
  console.log(
    `[GET_ACTIVITY_LIST] API 요청: page=${page}, size=${size}, category=${category}`,
  );

  const response = await fetch(
    API_ROUTES.GET_ACTIVITY_LIST(page, size, category),
    {
      headers: { Accept: 'application/json' },
      method: 'GET',
      mode: 'cors',
    },
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success || !Array.isArray(result.data.posts)) {
    throw new Error('API 응답 형식이 올바르지 않습니다.');
  }

  // 백엔드 응답을 프론트에서 사용할 ActivityPost[] 형태로 변환
  const mappedData = mapActivityList(result.data);

  // NCP Presigned URL 변환 적용
  const postsData: ActivityPost[] = await Promise.all(
    mappedData.posts.map(async (post) => {
      if (post.image_url) {
        const presignedUrl = await fetchNcpPresignedUrl(post.image_url);
        return { ...post, image_url: presignedUrl ?? undefined };
      }
      return post;
    }),
  );

  return {
    posts: postsData,
    totalPages: mappedData.total_pages, // API 응답 필드 사용
  };
};

/** 페이지네이션 기반 활동 게시물 조회 훅 */
export function useFetchPaginatedActivity(
  category?: string,
  pageSize: number = 10,
) {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ['activities', category, page],
    queryFn: () => fetchPaginatedActivities(page, pageSize, category),
    placeholderData: { posts: [], totalPages: 1 },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (error) {
      console.error('[GET_ACTIVITY_LIST] API 요청 실패:', error);
    }
  }, [error]);

  return {
    posts: data?.posts ?? [],
    totalPages: data?.totalPages ?? 1,
    isLoading,
    error,
    page,
    setPage,
  };
}
