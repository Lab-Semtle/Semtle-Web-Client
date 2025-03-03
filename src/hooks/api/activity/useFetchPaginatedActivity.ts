import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';

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

// 활동 게시물 조회 함수
const fetchPaginatedActivities = async (
  page: number,
  size: number,
  category?: string,
): Promise<{ posts: ActivityPost[]; totalPages: number }> => {
  console.log(
    `[GET_ACTIVITY_LIST] API 요청: page=${page}, size=${size}, type=${category}`,
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

  const result: { success: boolean; data: ActivityResponse } =
    await response.json();
  console.log('[GET_ACTIVITY_LIST] API 응답 데이터:', result);

  if (!result.success || !Array.isArray(result.data.posts)) {
    throw new Error('API 응답 형식이 올바르지 않습니다.');
  }

  // NCP Presigned URL 변환
  const postsData: ActivityPost[] = await Promise.all(
    result.data.posts.map(async (post) => {
      const imagePath = post.images?.[0] ?? undefined; // 대표 이미지 선택
      const imageUrl = imagePath
        ? await fetchNcpPresignedUrl(imagePath).then((url) => url ?? undefined)
        : undefined;

      return {
        board_id: post.board_id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        writer: post.writer,
        type: post.type ?? '기타',
        imageUrl,
      };
    }),
  );

  return { posts: postsData, totalPages: result.data.total_pages };
};

// 페이지네이션 기반 활동 게시물 조회 훅
export function useFetchPaginatedActivities(
  category?: string,
  pageSize: number = 10,
) {
  const [page, setPage] = useState(1); // 현재 페이지 상태

  const { data, error, isLoading } = useQuery({
    queryKey: ['activities', category, page], // 페이지네이션 적용
    queryFn: () => fetchPaginatedActivities(page, pageSize, category),
    placeholderData: { posts: [], totalPages: 1 }, // 데이터가 없는 경우 기본값 설정
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 캐싱하여 불필요한 API 호출 방지
  });

  // API 요청 실패 시 로그 출력
  useEffect(() => {
    if (error) {
      console.error('[GET_ACTIVITY_LIST] API 요청 실패:', error);
    }
  }, [error]);

  return {
    posts: data?.posts ?? [], // data가 undefined일 경우 빈 배열 반환
    totalPages: data?.totalPages ?? 1, // 기본값 1
    isLoading,
    error,
    page,
    setPage, // 페이지 변경 함수
  };
}
