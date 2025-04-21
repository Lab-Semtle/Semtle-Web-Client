import { useState, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';

type Post = {
  board_id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  images?: string[];
  imageUrl?: string;
};

type SecretPost = {
  total_posts: number;
  total_pages: number;
  posts: Post[];
};

export function useFetchSecretPosts() {
  const { data: session, status } = useSession();
  const [secretPost, setSecretPost] = useState<SecretPost>({
    total_posts: 0,
    total_pages: 1,
    posts: [],
  });
  const [loading, setLoading] = useState(true);

  const cacheRef = useRef<{ [key: string]: SecretPost }>({});

  const fetchPosts = useCallback(
    async (page = 1, searchKeyword = '') => {
      try {
        setLoading(true);

        // ✅ 개발 환경일 경우 mock 데이터 사용
        if (process.env.NODE_ENV === 'development') {
          // 이 if 문은 main 브랜치 병합 전에 삭제
          const mockPosts: Post[] = Array.from({ length: 30 }, (_, i) => ({
            board_id: i + 1,
            title: `예시 족보 게시물 ${i + 1}`,
            writer: `작성자${(i % 5) + 1}`,
            createdAt: `2025-03-${(i % 28) + 1}`.padStart(10, '0'),
            images: [`mock/image_${i + 1}.png`],
            imageUrl: '/images/kmou_2022.jpg',
            content: '테스트 게시물',
          }));

          // ✅ 검색어 필터링 적용 (제목, 작성자, 내용 포함)
          const filtered = searchKeyword
            ? mockPosts.filter((post) =>
                [post.title]
                  .join(' ')
                  .toLowerCase()
                  .includes(searchKeyword.toLowerCase()),
              )
            : mockPosts;

          const paginated = filtered.slice((page - 1) * 8, page * 8);

          const mockData: SecretPost = {
            total_posts: mockPosts.length,
            total_pages: Math.ceil(mockPosts.length / 8), // 페이지당 8개 기준
            posts: paginated,
          };

          setSecretPost(mockData);
          cacheRef.current[`${searchKeyword}_${page}`] = mockData;
          return;
        }

        if (!session?.accessToken) {
          console.error('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
          return;
        }

        const cacheKey = `${searchKeyword}_${page}`;
        if (cacheRef.current[cacheKey]) {
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
          setSecretPost({ total_posts: 0, total_pages: 1, posts: [] });
          return;
        }

        const responseText = await response.text();
        if (!responseText.trim()) {
          setSecretPost({ total_posts: 0, total_pages: 1, posts: [] });
          return;
        }

        const json = JSON.parse(responseText);
        if (json.success && json.data) {
          const postsData = json.data?.posts ?? [];

          const updatedPosts = await Promise.all(
            postsData.map(async (post: Post) => {
              const imagePath = post.images?.[0];
              const presignedUrl = imagePath
                ? await fetchNcpPresignedUrl(imagePath)
                : undefined;

              return {
                ...post,
                imageUrl: presignedUrl ?? '/images/kmou_2022.jpg',
              };
            }),
          );

          const processedData = {
            total_posts: json.data.total_post ?? 0,
            total_pages: json.data.total_pages ?? 1,
            posts: updatedPosts,
          };

          setSecretPost(processedData);
          cacheRef.current[cacheKey] = processedData;
        } else {
          setSecretPost({ total_posts: 0, total_pages: 1, posts: [] });
        }
      } catch (error) {
        console.error('[API 요청 실패] 데이터 가져오기 실패:', error);
        setSecretPost({ total_posts: 0, total_pages: 1, posts: [] });
      } finally {
        setLoading(false);
      }
    },
    [session],
  );

  return { secretPost, loading, fetchPosts, status };
}
