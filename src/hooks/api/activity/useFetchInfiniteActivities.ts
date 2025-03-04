import { useEffect } from 'react';
import {
  useInfiniteQuery,
  useQueryClient,
  QueryFunctionContext,
} from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';
import { ActivityResponseSchema, ActivityPost } from '@/types/activity';

// `queryFn`의 매개변수 타입을 `QueryFunctionContext`로 지정
const fetchActivities = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<string[], number>) => {
  const [, type] = queryKey; // _key 생략

  console.log(`[GET_ACTIVITY_LIST] API 요청: page=${pageParam}, type=${type}`);

  const response = await fetch(
    API_ROUTES.GET_ACTIVITY_LIST(pageParam, 8, type),
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
  console.log('[GET_ACTIVITY_LIST] API 응답 데이터:', result);

  if (!result.success) {
    throw new Error('API 응답이 실패했습니다.');
  }

  // API 응답을 Zod 스키마로 검증
  const validatedData = ActivityResponseSchema.parse(result.data);

  // Presigned URL 변환
  const postsData: ActivityPost[] = await Promise.all(
    validatedData.posts.map(async (post) => {
      const presignedUrl = post.images?.[0]
        ? await fetchNcpPresignedUrl(post.images[0])
        : null;

      return {
        ...post,
        images: post.images ? [presignedUrl ?? null] : undefined,
      };
    }),
  );

  return {
    posts: postsData,
    nextPage:
      validatedData.current_page < validatedData.total_pages
        ? pageParam + 1
        : undefined, // 다음 페이지 존재 여부
  };
};

/** React Query 기반 무한 스크롤 API 훅 */
export function useFetchInfiniteActivity(category: string) {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ['activities', category],
    queryFn: fetchActivities,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (query.error) {
      console.error('[GET_ACTIVITY_LIST] API 요청 실패:', query.error);
    }
  }, [query.error]);

  return query;
}
