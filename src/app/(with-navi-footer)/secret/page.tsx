'use client';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SecretPage() {
  const secretPost = {
    total_posts: 35,
    current_page: 1,
    total_pages: 4,
    posts: [
      {
        post_id: 1,
        title: '알고리즘 기출 문제',
        writer: '김철수',
        image_url: '/1.jpg',
        created_at: '2025-02-01T10:30:00Z',
      },
      {
        post_id: 2,
        title: '컴퓨터 네트워크 족보',
        writer: '박영희',
        image_url: '/2.jpg',
        created_at: '2025-01-28T15:20:00Z',
      },
      {
        post_id: 3,
        title: '운영체제 중간고사 정리',
        writer: '이민호',
        created_at: '2025-01-25T09:00:00Z',
      },
      {
        post_id: 4,
        title: '데이터베이스 설계 기초',
        writer: '최수빈',
        image_url: '/4.jpg',
        created_at: '2025-01-20T18:45:00Z',
      },
      {
        post_id: 5,
        title: '컴퓨터 구조 족보',
        writer: '정우성',
        image_url: '/1.jpg',
        created_at: '2025-01-18T13:10:00Z',
      },
      {
        post_id: 6,
        title: '웹 프로그래밍 과제 샘플',
        writer: '한예진',
        image_url: '/4.jpg',
        created_at: '2025-01-12T16:00:00Z',
      },
      {
        post_id: 7,
        title: 'PLC 프로그래밍 요약',
        writer: '김서윤',
        image_url: '/3.jpg',
        created_at: '2025-01-10T11:50:00Z',
      },
      {
        post_id: 8,
        title: '파이썬 프로그래밍 기초 요약',
        writer: '김서윤',
        image_url: '/1.jpg',
        created_at: '2025-01-10T11:50:00Z',
      },
      {
        post_id: 9,
        title: 'C++ 프로그래밍 고급 개념',
        writer: '김서윤',
        image_url: '/4.jpg',
        created_at: '2025-01-10T11:50:00Z',
      },
    ],
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(secretPost.posts);
  const [currentPage, setCurrentPage] = useState(secretPost.current_page);

  const postsPerPage = 8;
  const handleSearch = () => {
    if (searchTerm) {
      const filtered = secretPost.posts.filter(
        (post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()), 
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(secretPost.posts); 
    }
    setCurrentPage(1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  };
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <main>
      <div className="mb-[40px] mt-[150px] flex justify-center">
        <Label className="text-[30px]">Secret Note</Label>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="w-[200px] translate-x-[35px] sm:translate-x-[170px] md:translate-x-[270px] lg:translate-x-[300px]">
          <Input
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        <div className="translate-x-[55px] sm:translate-x-[190px] md:translate-x-[290px] lg:translate-x-[320px]">
          <Button asChild>
            <Link href="/secret/edit">글쓰기</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-[10px] w-[1000px] max-w-screen-lg border-t-2 border-gray-300"></div>

      <section className="mx-auto mb-[50px] mt-[50px] grid max-w-[900px] grid-cols-1 place-items-center gap-x-9 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentPosts.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          currentPosts.map((post,index) => (
            <PostCard
              key={index}
              id={post.post_id}
              title={post.title}
              writer={post.writer}
              image_url={post.image_url}
              created_at={post.created_at}
            />
          ))
        )}
      </section>
      <section className="mb-[50px]">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
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
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  );
}
