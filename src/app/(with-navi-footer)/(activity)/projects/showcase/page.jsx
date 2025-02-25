'use client'; // 클라이언트 컴포넌트 선언

import { useEffect, useState } from 'react';
// import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '@/components/ui/pagination';

import Header from './components/Header';
import FilterBar from '@/components/common/FilterBar';
import CardList from '@/components/common/CardList';

export default function Completed() {
  //  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/result');
        const data = await response.json();
        setCards(data);
        setFilteredCards(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (filter) => {
    const filtered = cards.filter((card) =>
      card.title.includes(filter.searchTerm),
    );
    setFilteredCards(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (selectedCardIds) => {
    setCards(cards.filter((card) => !selectedCardIds.includes(card.id)));
    setFilteredCards(
      filteredCards.filter((card) => !selectedCardIds.includes(card.id)),
    );
  };

  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

  return (
    <>
      <Header />
      <h2 className="mb-8 mt-8 text-center text-4xl font-bold">
        프로젝트 결과
      </h2>
      <FilterBar onFilter={handleFilter} />
      <CardList cards={paginatedCards} onDelete={handleDelete} />

      {/* Shadcn Pagination 적용 */}
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
