'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFetchSecretPosts } from '@/hooks/api/secret/useFetchSecretPosts';
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

export default function SecretPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { secretPost, loading, fetchPosts, status } = useFetchSecretPosts();

  // 디바운스: 입력 후 300ms 후 `debouncedSearchTerm` 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms 후 API 요청 실행

    return () => clearTimeout(timer); // 이전 요청 취소
  }, [searchTerm]); // searchTerm 변경 시 실행됨

  // 검색어 변경될 때만 fetch 실행
  useEffect(() => {
    if (status === 'authenticated') {
      fetchPosts(currentPage, debouncedSearchTerm);
    }
  }, [fetchPosts, currentPage, debouncedSearchTerm, status]); // `debouncedSearchTerm`이 바뀔 때만 실행됨

  // // Debounce 적용: 입력 후 300ms 후에 fetch 실행
  // useEffect(() => {
  //   const debounceTimer = setTimeout(() => {
  //     if (status === 'authenticated') {
  //       fetchPosts(currentPage, searchTerm);
  //     }
  //   }, 300); // 300ms 후 API 요청 실행

  //   return () => clearTimeout(debounceTimer); // 이전 요청 취소
  // }, [fetchPosts, currentPage, searchTerm, status]);

  // 로그인되지 않은 경우 로그인 페이지로 리디렉트
  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다.');
      router.push('/signin');
    }
  }, [status, router]);

  if (loading) {
    return <p className="text-center text-lg font-semibold">로딩중...</p>;
  }

  const totalPages = secretPost.total_pages;

  // 검색어 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="flex flex-col items-center px-6 pb-32 pt-24">
      <PageHeading
        title="Secret Note"
        description={`${String.fromCodePoint(0x1f4dd)} 학업, 학습과 관련된 자료를 자유롭게 공유하는 공간입니다.`}
      />

      {/* 상단 바 (새글 작성, 검색 바) */}
      <div className="flex w-full items-center justify-center gap-4">
        <Button asChild>
          <Link href="/secret/edit" className="font-bold">
            새 글 작성하기
          </Link>
        </Button>
        <div className="w-[200px] sm:w-[300px]">
          <Input
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchTerm}
            onChange={handleSearchChange}
            className="rounded-md border border-gray-400 shadow-sm focus:border-gray-700 focus:ring-2 focus:ring-gray-600"
          />
        </div>
      </div>

      {/* 게시물 목록 */}
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

      {/* 페이지네이션 */}
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
