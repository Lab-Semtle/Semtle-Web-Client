'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import PostCard from '@/components/common/PostCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PageHeading from '@/components/common/PageHeading';
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

export default function SecretPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [secretPost, setSecretPost] = useState<SecretPost>({
    total_posts: 0,
    total_pages: 1,
    posts: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 캐싱을 위한 useRef 추가 (각 페이지 & 검색어별 데이터를 저장)
  const cacheRef = useRef<{ [key: string]: SecretPost }>({});

  // 로그인되지 않은 경우 로그인 페이지로 리디렉트
  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다.');
      router.push('/signin');
    }
  }, [status, router]);

  // 데이터 Fetch 함수
  const fetchPosts = useCallback(
    async (page = 1, searchKeyword = '') => {
      try {
        setLoading(true);

        if (!session) {
          console.error(
            '🚨 세션 정보가 없습니다. 로그인 후 다시 시도해주세요.',
          );
          return;
        }

        if (!session?.accessToken) {
          console.error(
            '🚨 인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.',
          );
          return;
        }

        // 캐시 확인: 동일한 검색어 & 페이지가 있다면 API 호출 없이 사용
        const cacheKey = `${searchKeyword}_${page}`;
        if (cacheRef.current[cacheKey]) {
          setSecretPost(cacheRef.current[cacheKey]);
          setLoading(false);
          return;
        }

        console.log(
          '[족보 게시판 조회] 요청:',
          API_ROUTES.GET_ARCHIVE_LIST(page, 8, searchKeyword),
        );

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

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ 서버 오류 응답:', errorText);
          throw new Error(
            `게시물 조회 실패: ${errorText || response.statusText}`,
          );
        }

        const json = await response.json();

        if (json.success && json.data) {
          const postsData = json.data.posts;

          // NCP Presigned URL 변환
          const updatedPosts = await Promise.all(
            postsData.map(async (post: Post) => {
              const imagePath = post.images?.[0] ?? undefined;
              const imageUrl = imagePath
                ? await fetchNcpPresignedUrl(imagePath).then(
                    (url) => url ?? undefined,
                  )
                : undefined;

              return {
                ...post,
                imageUrl,
              };
            }),
          );

          const processedData = {
            total_posts: json.data.total_post,
            total_pages: json.data.total_pages,
            posts: updatedPosts,
          };

          setSecretPost(processedData);
          cacheRef.current[cacheKey] = processedData; // 캐싱
        } else {
          console.error('데이터 로드 실패:', json.message);
        }
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    },
    [session], // session이 변경될 때만 fetchPosts가 다시 생성됨
  );

  // useEffect 내부에 fetchPosts를 의존성으로 포함
  useEffect(() => {
    if (status === 'authenticated') {
      fetchPosts(currentPage, searchTerm);
    }
  }, [fetchPosts, currentPage, searchTerm, status]);

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;

  const totalPages = secretPost.total_pages;

  // 검색 기능
  const handleSearch = () => {
    setCurrentPage(1);
    cacheRef.current = {}; // 기존 캐시 초기화
    fetchPosts(1, searchTerm);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  // ✅ 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="flex flex-col items-center px-6 pb-32 pt-24">
      <PageHeading
        title="Secret Note"
        description="📝 학업, 학습과 관련된 자료를 자유롭게 공유하는 공간입니다."
      />
      <div className="flex w-full items-center justify-center gap-4">
        {/* 새 글 작성 버튼 */}
        <Button asChild>
          <Link href="/secret/edit" className="font-bold">
            새 글 작성하기
          </Link>
        </Button>

        {/* 검색 입력창 */}
        <div className="w-[200px] sm:w-[300px]">
          <Input
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="rounded-md border border-gray-400 shadow-sm focus:border-gray-700 focus:ring-2 focus:ring-gray-600"
          />
        </div>

        {/* 검색 버튼 */}
        <Button onClick={handleSearch}>검색</Button>
      </div>

      <section className="mx-auto mb-12 mt-8 grid max-w-[900px] grid-cols-1 place-items-center gap-x-9 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {secretPost.posts.length === 0 ? (
          <p className="text-center text-xl font-semibold text-gray-500">
            검색 결과가 없습니다.
          </p>
        ) : (
          secretPost.posts.map((post) => (
            <PostCard
              key={post.board_id}
              id={post.board_id}
              title={post.title}
              writer={post.writer}
              image_url={post.imageUrl}
              created_at={post.createdAt}
            />
          ))
        )}
      </section>

      {/* ✅ 페이지네이션 추가 */}
      <section className="mb-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`hover:cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={`hover:cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  );
}
