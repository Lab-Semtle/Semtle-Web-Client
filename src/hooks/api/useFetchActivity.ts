/** 활동 게시판 관련 API Fetch
 * - 검증 안된 ApiClient 적용됨 주의바람
 * - 최근 활동 게시물 조회
 * - 활동 게시물 목록 조회
 */
import useSWR from 'swr';
import apiClient from '@/services/api-client';
import { ApiResponseWithData } from '@/types/api';
import { GET_RECENT_ACTIVITY } from '@/constants/ApiRoutes';
import { GET_ACTIVITIES } from '@/constants/ApiRoutes';

/** 최근 활동 게시물 조회 */
interface RecentActivityPost {
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
  posts: RecentActivityPost[];
}

// apiClient 기반
const fetcher = async (url: string) => {
  const response =
    await apiClient.get<ApiResponseWithData<RecentActivityResponse>>(url);

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
    posts: data || [],
    loading: isLoading,
    error: error ? 'Failed to load news' : null,
  };
}

/** 활동 게시판 목록 조회 */

export const usefetchActivities = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: string[];
}) => {
  const category = queryKey[1] || '전체';
  const size = 8;
  const apiUrl = GET_ACTIVITIES(pageParam, size, category);

  const res = await fetch(apiUrl, {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) throw new Error(`Failed to fetch activities: ${res.statusText}`);

  const data = await res.json();

  return {
    posts: data.data.posts,
    nextPage:
      data.data.current_page < data.data.total_pages ? pageParam + 1 : null,
  };
};
