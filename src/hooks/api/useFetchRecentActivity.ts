// import { useEffect, useState } from 'react';
// import apiClient from '@/services/api-client'; // Fetch API Client
// import { ApiResponseWithData } from '@/types/api'; // API 반환 타입
// import { GET_RECENT_ACTIVITY } from '@/constants/api-endpoint';

// interface ActivityPost {
//   id: number;
//   title: string;
//   summary: string;
//   createdAt: string;
// }

// export function useRecentActivityPosts(limit = 3) {
//   const [posts, setPosts] = useState<ActivityPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadData() {
//       try {
//         // API 호출
//         const response = await apiClient.get<
//           ApiResponseWithData<{ posts: ActivityPost[] }>
//         >(GET_RECENT_ACTIVITY(limit));

//         console.log('[API 응답 데이터]:', response.data);

//         if (isMounted && response?.data && 'posts' in response.data) {
//           const { posts } = response.data;
//           if (Array.isArray(posts)) {
//             setPosts(posts);
//           } else {
//             throw new Error(
//               'Invalid response structure: posts is not an array',
//             );
//           }
//         } else {
//           throw new Error('Invalid response structure');
//         }

//       } catch (error) {
//         console.error('Error fetching recent activity posts:', error);
//         setError('Failed to load news');
//         throw error;
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }

//     loadData();

//     return () => {
//       isMounted = false;
//     };
//   }, [limit]);

//   return { posts, loading, error };
// }

import { useEffect, useState } from 'react';
import apiClient from '@/services/api-client';
import { ApiResponseWithData } from '@/types/api';
import { GET_RECENT_ACTIVITY } from '@/constants/api-endpoint';

interface ActivityPost {
  board_id: number; // 명세서에 따른 ID 필드 변경
  title: string;
  content: string; // 명세서에 따른 필드 변경 (기존 summary → content)
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

export function useRecentActivityPosts(limit = 3) {
  const [posts, setPosts] = useState<ActivityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const response = await apiClient.get<
          ApiResponseWithData<RecentActivityResponse>
        >(GET_RECENT_ACTIVITY(limit));

        console.log('[API 응답 데이터]:', response.data);

        if (isMounted && response?.data && 'posts' in response.data) {
          const { posts } = response.data;
          if (Array.isArray(posts)) {
            setPosts(posts);
          } else {
            throw new Error(
              'Invalid response structure: posts is not an array',
            );
          }
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching recent activity posts:', error);
        setError('Failed to load news');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { posts, loading, error };
}
