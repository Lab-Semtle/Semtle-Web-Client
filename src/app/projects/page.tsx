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
import FilterBar from '@/components/FilterBar';
import CardListA from '@/components/CardListA';
import CardListC from '@/components/CardListC';

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
        const response = await fetch('/api/result');
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
      card.title.includes(filter.searchTerm)
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
      ? '/projects/active/create'
      : '/projects/completed/new';
  router.push(path);
};


  // 프로젝트 삭제 (완료된 프로젝트에서만 가능)
  const handleDelete = (selectedCardIds: number[]) => {
    setCompletedCards((prev) =>
      prev.filter((card) => !selectedCardIds.includes(card.id))
    );
    setFilteredCards((prev) =>
      prev.filter((card) => !selectedCardIds.includes(card.id))
    );
  };

  // 현재 페이지에 보여줄 데이터
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

  return (
    <>

      <h2 className="mb-8 mt-20 text-center text-4xl font-bold">프로젝트</h2>

      {/* 탭 UI */}
      <div className="flex justify-center space-x-4 border-b pb-2">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'active' ? 'border-b-4 border-blue-500' : 'text-gray-500'
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
          className={`px-4 py-2 font-semibold ${
            activeTab === 'completed' ? 'border-b-4 border-blue-500' : 'text-gray-500'
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

{/* 필터 + 버튼 */}
<div className="flex items-center justify-start gap-4 p-4">
  <Button onClick={handleCreateProject}>
    {activeTab === 'active' ? '프로젝트 등록' : '완료된 프로젝트 등록'}
  </Button>
  <FilterBar onFilter={handleFilter} />
</div>


      {/* 카드 리스트 */}
      {activeTab === 'active' ? (
        <CardListA
          cards={paginatedCards}
          onDelete={undefined}
        />
      ) : (
        <CardListC
          cards={paginatedCards}
          onDelete={handleDelete}
        />
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
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
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
