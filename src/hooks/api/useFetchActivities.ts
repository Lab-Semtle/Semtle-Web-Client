import { useInfiniteQuery } from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchPresignedUrl } from '@/hooks/api/useFetchPresignedUrls';

/** 활동 게시물 타입 */
interface ActivityPost {
  board_id: number;
  title: string;
  content: string;
  createdAt: string;
  writer: string;
  type: string;
  imageUrl?: string;
}

/** API 응답 타입 */
interface ActivityResponse {
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

// API 요청 및 Presigned URL 변환 포함
const fetchActivities = async ({ pageParam = 1, queryKey }: any) => {
  const [_key, type] = queryKey;
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

  const result: { success: boolean; data: ActivityResponse } =
    await response.json();
  console.log('[GET_ACTIVITY_LIST] API 응답 데이터:', result);

  if (!result.success || !Array.isArray(result.data.posts)) {
    throw new Error('API 응답 형식이 올바르지 않습니다.');
  }

  // Presigned URL 변환 (공통 함수 활용)
  const postsData: ActivityPost[] = await Promise.all(
    result.data.posts.map(async (post) => ({
      board_id: post.board_id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      writer: post.writer,
      type: post.type,
      imageUrl: await fetchPresignedUrl(post.images?.[0]), // Presigned URL 변환
    })),
  );

  return {
    posts: postsData,
    nextPage:
      result.data.current_page < result.data.total_pages
        ? pageParam + 1
        : undefined, // 다음 페이지 존재 여부
  };
};

// React Query 기반 무한 스크롤 API 훅
export function useFetchActivities(category: string) {
  return useInfiniteQuery({
    queryKey: ['activities', category],
    queryFn: fetchActivities,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });
}
