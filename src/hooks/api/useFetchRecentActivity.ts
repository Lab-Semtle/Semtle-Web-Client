import useSWR from 'swr';
import apiClient from '@/services/api-client';
import { ApiResponseWithData } from '@/types/api';
import { GET_RECENT_ACTIVITY } from '@/constants/api-endpoint';

interface ActivityPost {
  board_id: number;
  title: string;
  content: string;
  createdAt: string;
  images: string[];
  writer: string;
  type: string;
}

interface RecentActivityResponse {
  total_post: number;
  current_page: number;
  total_pages: number;
  posts: ActivityPost[];
}

// SWR을 활용한 API 요청 함수 (apiClient 기반)
const fetcher = async (url: string) => {
  const response =
    await apiClient.get<ApiResponseWithData<RecentActivityResponse>>(url);

  console.log('[API 응답 데이터]:', response.data);

  if (response?.data && 'posts' in response.data) {
    const { posts } = response.data;
    if (Array.isArray(posts)) {
      return posts;
    } else {
      throw new Error('Invalid response structure: posts is not an array');
    }
  } else {
    throw new Error('Invalid response structure');
  }
};

// useSWR을 사용해서 캐싱 적용
export function useRecentActivityPosts(limit = 3) {
  const { data, error, isLoading } = useSWR(
    `${GET_RECENT_ACTIVITY(limit)}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    },
  );

  return {
    posts: data || [], // 데이터가 없으면 빈 배열 반환
    loading: isLoading,
    error: error ? 'Failed to load news' : null,
  };
}
