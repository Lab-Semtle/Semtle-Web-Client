import { useEffect } from 'react';
import {
  useInfiniteQuery,
  useQueryClient,
  QueryFunctionContext,
} from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';
import { ActivityResponseSchema, ActivityPost } from '@/types/activity';

const fetchActivities = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<string[], number>) => {
  const [, type] = queryKey;

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

  const validatedData = ActivityResponseSchema.parse(result.data);

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
        : undefined,
  };
};

/** React Query 기반 무한 스크롤 API 훅 */
export function useFetchInfiniteActivity(category: string) {
  const queryClient = useQueryClient(); // 캐싱에 활용

  const query = useInfiniteQuery({
    queryKey: ['activities', category],
    queryFn: fetchActivities,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });

  // queryClient를 사용하여 특정 데이터 캐싱
  useEffect(() => {
    if (query.data?.pages) {
      query.data.pages.forEach((page) => {
        page.posts.forEach((post) => {
          queryClient.setQueryData(['activity', post.board_id], post);
        });
      });
    }
  }, [query.data, queryClient]);

  useEffect(() => {
    if (query.error) {
      console.error('[GET_ACTIVITY_LIST] API 요청 실패:', query.error);
    }
  }, [query.error]);

  return query;
}
