import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';

/** 활동 게시물 상세 타입 */
interface ActivityPostDetail {
  board_id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  type: string;
  imageUrl?: string;
}

/** API 응답 타입 */
interface ActivityPostResponse {
  success: boolean;
  message: string;
  data?: {
    board_id: number;
    title: string;
    content: string;
    writer: string;
    createdAt: string;
    images?: (string | null)[]; // null 포함 가능
    type: string;
  };
  error?: string | null;
}

// 활동 게시물 상세 조회 함수
const fetchActivityDetail = async (
  board_id: number,
): Promise<ActivityPostDetail> => {
  console.log(`[GET_ACTIVITY_DETAIL] API 요청: board_id=${board_id}`);

  const response = await fetch(API_ROUTES.GET_ACTIVITY_DETAIL(board_id), {
    headers: { Accept: 'application/json' },
    method: 'GET',
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const result: ActivityPostResponse = await response.json();
  console.log('[GET_ACTIVITY_DETAIL] API 응답 데이터:', result);

  if (!result.success || !result.data) {
    throw new Error(result.error ?? 'API 응답이 올바르지 않습니다.');
  }

  // 대표 이미지 Presigned URL 변환
  const imagePath = result.data.images?.[0] ?? undefined; // null → undefined 처리
  const imageUrl =
    imagePath && imagePath !== null
      ? await fetchNcpPresignedUrl(imagePath).then((url) => url ?? undefined)
      : undefined;

  return {
    board_id: result.data.board_id,
    title: result.data.title,
    content: result.data.content,
    writer: result.data.writer,
    createdAt: result.data.createdAt,
    type: result.data.type,
    imageUrl,
  };
};

// 활동 게시물 상세 조회 훅
export function useFetchActivityDetail(board_id: number) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['activityDetail', board_id],
    queryFn: () => fetchActivityDetail(board_id),
    enabled: !!board_id, // board_id가 있을 때만 요청 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱
  });

  // API 요청 실패 시 로그 출력
  useEffect(() => {
    if (error) {
      console.error('[GET_ACTIVITY_DETAIL] API 요청 실패:', error);
    }
  }, [error]);

  return {
    post: data,
    isLoading,
    error,
  };
}
