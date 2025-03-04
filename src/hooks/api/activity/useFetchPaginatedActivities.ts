import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';
import {
  ActivityPostResponseSchema,
  ActivityResponseSchema,
} from '@/types/activity';

/** 활동 게시물 리스트 조회 함수 */
const fetchPaginatedActivities = async (
  page: number,
  size: number,
  category?: string,
) => {
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

  // api 응답 zod 스키마 검증
  const validatedData = ActivityResponseSchema.parse(result.data);

  // NCP Presigned URL 변환
  const postsData = await Promise.all(
    validatedData.posts.map(async (post) => {
      if (post.images?.length && post.images[0]) {
        const presignedUrl = await fetchNcpPresignedUrl(post.images[0]);
        return { ...post, images: [presignedUrl ?? null] };
      }
      return post;
    }),
  );

  return {
    posts: postsData,
    totalPages: validatedData.total_pages, // API 응답 필드 사용
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
