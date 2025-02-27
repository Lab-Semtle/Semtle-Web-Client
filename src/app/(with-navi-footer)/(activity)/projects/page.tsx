'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '@/components/ui/pagination';
import FilterBar from '@/components/common/FilterBar';
import CardListA from '@/components/common/CardListA';
import CardListC from '@/components/common/CardListC';
import PageHeading from '@/components/common/PageHeading';

type Card = {
  id: number;
  title: string;
  description: string;
};

type Filter = {
  searchTerm: string;
};

export default function ProjectPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active'); // 현재 선택된 탭
  const [activeCards, setActiveCards] = useState<Card[]>([]);
  const [completedCards, setCompletedCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // 진행 중 프로젝트 데이터 가져오기
  useEffect(() => {
    const fetchActiveProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data: Card[] = await response.json();
        setActiveCards(data);
        if (activeTab === 'active') setFilteredCards(data);
      } catch (error) {
        console.error('Failed to fetch active projects:', error);
      }
    };
    fetchActiveProjects();
  }, []);

  // 완료된 프로젝트 데이터 가져오기
  useEffect(() => {
    const fetchCompletedProjects = async () => {
      try {
        const response = await fetch('/api/promotion');
        const data: Card[] = await response.json();
        setCompletedCards(data);
        if (activeTab === 'completed') setFilteredCards(data);
      } catch (error) {
        console.error('Failed to fetch completed projects:', error);
      }
    };
    fetchCompletedProjects();
  }, []);

  // 필터 적용
  const handleFilter = (filter: Filter) => {
    const sourceCards = activeTab === 'active' ? activeCards : completedCards;
    const filtered = sourceCards.filter((card) =>
      card.title.includes(filter.searchTerm),
    );
    setFilteredCards(filtered);
    setCurrentPage(1);
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 프로젝트 등록 버튼 클릭 시 이동
  const handleCreateProject = () => {
    const path =
      activeTab === 'active'
        ? '/projects/hire/create'
        : '/projects/showcase/create';
    router.push(path);
  };

  // 프로젝트 삭제 (완료된 프로젝트에서만 가능)
  const handleDelete = (selectedCardIds: number[]) => {
    setCompletedCards((prev) =>
      prev.filter((card) => !selectedCardIds.includes(card.id)),
    );
    setFilteredCards((prev) =>
      prev.filter((card) => !selectedCardIds.includes(card.id)),
    );
  };

  // 현재 페이지에 보여줄 데이터
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

  return (
    <main className="flex flex-col items-center px-6 pb-32 pt-24">
      <PageHeading
        title="학회 프로젝트"
        description="아치셈틀 학회원들과 함께 관심 있는 프로젝트에 참여하거나, 직접 프로젝트를 시작해보세요! 🚀"
      />

      {/* 탭 UI */}
      <div className="mx-auto w-full max-w-[1000px] px-6">
        <div className="flex w-full justify-center space-x-6 border-b pb-2 dark:border-gray-700">
          <button
            className={`px-6 py-3 text-lg font-semibold transition-colors ${
              activeTab === 'active'
                ? 'border-b-4 border-blue-500 text-black dark:text-white'
                : 'text-gray-500 hover:text-black dark:hover:text-white'
            }`}
            onClick={() => {
              setActiveTab('active');
              setFilteredCards(activeCards);
              setCurrentPage(1);
            }}
          >
            진행 중
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold transition-colors ${
              activeTab === 'completed'
                ? 'border-b-4 border-blue-500 text-black dark:text-white'
                : 'text-gray-500 hover:text-black dark:hover:text-white'
            }`}
            onClick={() => {
              setActiveTab('completed');
              setFilteredCards(completedCards);
              setCurrentPage(1);
            }}
          >
            완료됨
          </button>
        </div>
      </div>

      {/* 필터 + 버튼 */}
      <div className="mx-auto flex w-full max-w-[1000px] items-center justify-between gap-4 p-4 pb-0 pt-0">
        <Button
          className="text-base hover:bg-semtle-lite hover:text-blue-950 hover:dark:bg-semtle-dark hover:dark:text-black"
          onClick={handleCreateProject}
        >
          {activeTab === 'active'
            ? '프로젝트 공고 등록하기'
            : '내 프로젝트 홍보하기'}
        </Button>
        <FilterBar onFilter={handleFilter} />
      </div>

      {/* 카드 리스트 */}
      <div className="mx-auto w-full max-w-[1000px]">
        {activeTab === 'active' ? (
          <CardListA cards={paginatedCards} />
        ) : (
          <CardListC cards={paginatedCards} onDelete={handleDelete} />
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
                aria-disabled={currentPage === 1}
                className={
                  currentPage === 1
                    ? 'pointer-events-none cursor-not-allowed opacity-50'
                    : ''
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
                aria-disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none cursor-not-allowed opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
}
