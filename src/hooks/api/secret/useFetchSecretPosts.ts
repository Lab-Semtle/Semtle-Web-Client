import { useState, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';

/** 게시글 타입 */
type Post = {
  board_id: number;
  title: string;
  writer: string;
  createdAt: string;
  images?: string[];
  imageUrl?: string;
};

/** API 응답 타입 */
type SecretPost = {
  total_posts: number;
  total_pages: number;
  posts: Post[];
};

/** 데이터 Fetch 훅 */
export function useFetchSecretPosts() {
  const { data: session, status } = useSession();
  const [secretPost, setSecretPost] = useState<SecretPost>({
    total_posts: 0,
    total_pages: 1,
    posts: [],
  });
  const [loading, setLoading] = useState(true);

  // 캐싱을 위한 useRef 추가
  const cacheRef = useRef<{ [key: string]: SecretPost }>({});

  const fetchPosts = useCallback(
    async (page = 1, searchKeyword = '') => {
      try {
        setLoading(true);

        if (!session?.accessToken) {
          console.error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
          return;
        }

        // 캐시 확인: 동일한 검색어 & 페이지가 있다면 API 호출 없이 사용
        const cacheKey = `${searchKeyword}_${page}`;
        if (cacheRef.current[cacheKey]) {
          console.log(`[CACHE HIT] ${cacheKey}`);
          setSecretPost(cacheRef.current[cacheKey]);
          setLoading(false);
          return;
        }

        const response = await fetch(
          API_ROUTES.GET_ARCHIVE_LIST(page, 8, searchKeyword),
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.accessToken}`,
            },
          },
        );

        if (!response.ok || response.status === 204) {
          console.warn('[API 응답] 서버에서 게시물이 없습니다.');
          setSecretPost({ total_posts: 0, total_pages: 1, posts: [] });
          return;
        }
        const responseText = await response.text();

        if (!responseText.trim()) {
          console.warn('[API 응답] 응답이 비어 있습니다.');
          setSecretPost({ total_posts: 0, total_pages: 1, posts: [] });
          return;
        }
        const json = JSON.parse(responseText);

        if (json.success && json.data) {
          const postsData = json.data?.posts ?? [];
          console.log(`[API 응답] 게시물 개수: ${postsData.length}`);

          // NCP Presigned URL 변환
          const updatedPosts = await Promise.all(
            postsData.map(async (post: Post) => {
              const imagePath = post.images?.[0] ?? undefined;
              const imageUrl = imagePath
                ? await fetchNcpPresignedUrl(imagePath).then(
                    (url) => url ?? undefined,
                  )
                : undefined;

              return { ...post, imageUrl };
            }),
          );

          const processedData = {
            total_posts: json.data.total_post ?? 0,
            total_pages: json.data.total_pages ?? 1,
            posts: updatedPosts,
          };

          setSecretPost(processedData);
          cacheRef.current[cacheKey] = processedData; // 캐싱 저장
        } else {
          console.warn(
            '[API 응답] 데이터 없음:',
            json.message || '게시물이 없습니다.',
          );
          setSecretPost({ total_posts: 0, total_pages: 1, posts: [] });
        }
      } catch (error) {
        console.error('[API 요청 실패] 데이터 가져오기 실패:', error);
        setSecretPost({ total_posts: 0, total_pages: 1, posts: [] }); // 오류 발생 시 빈 데이터 설정
      } finally {
        setLoading(false);
      }
    },
    [session],
  );

  return { secretPost, loading, fetchPosts, status };
}
