'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// 목업 데이터
const mockPosts = Array.from({ length: 30 }, (_, idx) => ({
  id: idx + 1,
  title: `프로젝트 모집 게시물 #${idx + 1}`,
  content: `게시물 내용 예시입니다. 게시물 번호는 ${idx + 1}입니다.`,
  board: idx % 2 === 0 ? '프로젝트 모집 공고' : '프로젝트 홍보',
}));

const mockComments = Array.from({ length: 20 }, (_, idx) => ({
  id: idx + 1,
  content: `댓글 내용 예시입니다. 댓글 번호는 ${idx + 1}입니다.`,
  board: idx % 2 === 0 ? '프로젝트 모집 공고' : '프로젝트 홍보',
  postTitle: `관련 게시물 제목 #${idx + 1}`,
}));

export default function ActivityPage() {
  const [currentPagePosts, setCurrentPagePosts] = useState(1);
  const [currentPageComments, setCurrentPageComments] = useState(1);
  const [selectedBoardPosts, setSelectedBoardPosts] = useState<string | null>(
    null,
  );
  const [selectedBoardComments, setSelectedBoardComments] = useState<
    string | null
  >(null);

  const postsPerPage = 6;
  const commentsPerPage = 6;

  const filterByBoard = (data, board) =>
    board ? data.filter((item) => item.board === board) : data;

  const getPaginatedData = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const filteredPosts = filterByBoard(mockPosts, selectedBoardPosts);
  const filteredComments = filterByBoard(mockComments, selectedBoardComments);

  const paginatedPosts = getPaginatedData(
    filteredPosts,
    currentPagePosts,
    postsPerPage,
  );
  const paginatedComments = getPaginatedData(
    filteredComments,
    currentPageComments,
    commentsPerPage,
  );

  const totalPagesPosts = Math.ceil(filteredPosts.length / postsPerPage);
  const totalPagesComments = Math.ceil(
    filteredComments.length / commentsPerPage,
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* 활동 내역 섹션 */}
        <section className="space-y-6">
          <h1 className="text-center text-2xl font-bold">활동 내역</h1>
          <Tabs defaultValue="posts">
            <div className="flex items-center justify-between">
              {/* 탭 전환 버튼 */}
              <TabsList className="flex space-x-4">
                <TabsTrigger value="posts">작성 게시물</TabsTrigger>
                <TabsTrigger value="comments">작성 댓글</TabsTrigger>
              </TabsList>
              {/* 필터링 박스 */}
              <Select
                onValueChange={(value) => {
                  if (value === 'all') {
                    setSelectedBoardPosts(null);
                    setSelectedBoardComments(null);
                  } else {
                    setSelectedBoardPosts(value);
                    setSelectedBoardComments(value);
                  }
                  setCurrentPagePosts(1);
                  setCurrentPageComments(1);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="게시판 필터링" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>게시판 선택</SelectLabel>
                    <SelectItem value="all">모든 게시판</SelectItem>
                    <SelectItem value="프로젝트 모집 공고">
                      프로젝트 모집 공고
                    </SelectItem>
                    <SelectItem value="프로젝트 홍보">프로젝트 홍보</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* 게시물 탭 */}
            <TabsContent value="posts">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{post.content}</p>
                      <p className="mt-2 text-sm text-gray-500">
                        게시판: {post.board}
                      </p>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="secondary" size="sm">
                          삭제
                        </Button>
                        <Button size="sm">보기</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* 페이지네이션 */}
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() =>
                          setCurrentPagePosts((prev) => Math.max(prev - 1, 1))
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPagesPosts }).map((_, idx) => (
                      <PaginationItem key={idx}>
                        <PaginationLink
                          href="#"
                          isActive={currentPagePosts === idx + 1}
                          onClick={() => setCurrentPagePosts(idx + 1)}
                        >
                          {idx + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() =>
                          setCurrentPagePosts((prev) =>
                            Math.min(prev + 1, totalPagesPosts),
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>

            {/* 댓글 탭 */}
            <TabsContent value="comments">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedComments.map((comment) => (
                  <Card key={comment.id}>
                    <CardHeader>
                      <CardTitle>댓글</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{comment.content}</p>
                      <p className="mt-2 text-sm text-gray-500">
                        게시판: {comment.board}, 게시물: {comment.postTitle}
                      </p>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="secondary" size="sm">
                          삭제
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* 페이지네이션 */}
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() =>
                          setCurrentPageComments((prev) =>
                            Math.max(prev - 1, 1),
                          )
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPagesComments }).map(
                      (_, idx) => (
                        <PaginationItem key={idx}>
                          <PaginationLink
                            href="#"
                            isActive={currentPageComments === idx + 1}
                            onClick={() => setCurrentPageComments(idx + 1)}
                          >
                            {idx + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() =>
                          setCurrentPageComments((prev) =>
                            Math.min(prev + 1, totalPagesComments),
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* 프로젝트 신청 현황 섹션 */}
        <section className="space-y-6">
          <h2 className="text-center text-xl font-bold">프로젝트 신청 현황</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>프로젝트 신청 게시물 #{idx + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    마감 여부: {idx % 2 === 0 ? '진행 중' : '마감'}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm">보기</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* 페이지네이션 */}
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => {
                      console.log('Previous clicked'); // 이전 페이지 로직 추가
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href="#"
                      isActive={idx === 0} // 현재 페이지 상태 로직 추가 가능
                      onClick={() => {
                        console.log(`Page ${idx + 1} clicked`); // 특정 페이지 로직 추가
                      }}
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => {
                      console.log('Next clicked'); // 다음 페이지 로직 추가
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </div>
    </div>
  );
}
