'use client';
import { useEffect, useState } from 'react';
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

//NOTE - 게시글 목록 Data Fetching 용 타입 정의
type Post = {
  post_id: number;
  title: string;
  writer: string;
  image_url: string | null;
  create_date: string;
};
type SecretPost = {
  total_posts: number;
  total_pages: number;
  posts: Post[];
};

export default function SecretPage() {
  const [secretPost, setSecretPost] = useState<SecretPost>({
    total_posts: 0,
    total_pages: 1,
    posts: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL_PROD}/archives`,
        );
        const json: SecretPost = await response.json();
        setSecretPost(json);
        setFilteredPosts(json.posts);
        setLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) return 'Loading...';

  const postsPerPage = 8;

  const handleSearch = () => {
    if (searchTerm) {
      const filtered = secretPost.posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()),
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
          currentPosts.map((post, index) => (
            <PostCard
              key={index}
              id={post.post_id}
              title={post.title}
              writer={post.writer}
              image_url={post.image_url || undefined}
              created_at={post.create_date}
            />
          ))
        )}
      </section>
      <section className="mb-[50px]">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="hover:cursor-pointer"
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
                className="hover:cursor-pointer"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  );
}
