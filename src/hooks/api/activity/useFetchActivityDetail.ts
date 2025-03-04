import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';
import { mapActivityDetail, ActivityPost } from '@/types/activity';

/** 활동 게시물 상세 조회 함수 */
const fetchActivityDetail = async (board_id: number): Promise<ActivityPost> => {
  console.log(`[GET_ACTIVITY_DETAIL] API 요청: board_id=${board_id}`);

  const response = await fetch(API_ROUTES.GET_ACTIVITY_DETAIL(board_id), {
    headers: { Accept: 'application/json' },
    method: 'GET',
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();
  console.log('[GET_ACTIVITY_DETAIL] API 응답 데이터:', result);

  if (!result.success) {
    throw new Error(result.error ?? 'API 응답이 올바르지 않습니다.');
  }

  // API 데이터를 프론트에서 사용하는 타입으로 변환
  const mappedData = mapActivityDetail(result);

  // Presigned URL 변환
  if (mappedData.image_url) {
    mappedData.image_url =
      (await fetchNcpPresignedUrl(mappedData.image_url)) || '';
  }

  return mappedData;
};

/** 활동 게시물 상세 조회 훅 */
export function useFetchActivityDetail(board_id: number) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['activityDetail', board_id],
    queryFn: () => fetchActivityDetail(board_id),
    enabled: !!board_id, // board_id가 있을 때만 요청 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱
  });

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
