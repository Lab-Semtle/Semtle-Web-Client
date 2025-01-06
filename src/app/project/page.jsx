"use client"; // 이 줄을 추가하여 클라이언트 컴포넌트로 선언

import { useState } from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import CardList from "./components/CardList";
import Pagination from "./components/Pagination";

const sampleCards = [
  { id: 1, image: "images/image1.jpg", title: "Post 1", postDate: "2024-12-30", deadline: "2025-01-05", projectType: "해커톤", category: ["Web", "Game"] },
  { id: 2, image: "images/image2.jpg", title: "Post 2", postDate: "2024-12-29", deadline: "2025-01-04", projectType: "경진대회", category: ["Game"] },
  { id: 3, image: "images/image3.jpg", title: "Post 3", postDate: "2024-12-30", deadline: "2025-01-05", projectType: "공모전", category: ["iOS", "Web"] },
  { id: 4, image: "images/image5.jpg", title: "Post 4", postDate: "2024-12-29", deadline: "2025-01-04", projectType: "사이드프로젝트", category: ["Android"] },
  { id: 5, image: "images/image6.jpg", title: "Post 5", postDate: "2024-12-30", deadline: "2025-01-05", projectType: "기타", category: ["Web", "Android"] },
  { id: 6, image: "images/image4.jpg", title: "Post 6", postDate: "2024-12-29", deadline: "2025-01-04", projectType: "해커톤", category: ["Android", "Web"] },
  { id: 7, image: "images/image6.jpg", title: "Post 7", postDate: "2024-12-30", deadline: "2025-01-05", projectType: "경진대회", category: ["iOS"] },
  { id: 8, image: "images/image3.jpg", title: "Post 8", postDate: "2024-12-29", deadline: "2025-01-04", projectType: "공모전", category: ["Game", "iOS"] }
];

export default function Project() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 관리
  const [filteredCards, setFilteredCards] = useState(sampleCards);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleFilter = (filter) => {
    const filtered = sampleCards.filter((card) =>
      card.title.includes(filter.searchTerm)
    );
    setFilteredCards(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCreateProject = () => {
    // 프로젝트 등록 기능을 추가할 부분
    alert("프로젝트 등록");
  };

  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <h2 className="text-4xl font-bold text-center mt-8 mb-8">프로젝트</h2>
      <div className="flex justify-start items-center gap-4 p-4">
        {isLoggedIn && (
          <button
            className="bg-green-500 text-white px-4 py-2"
            onClick={handleCreateProject}
          >
            프로젝트 등록
          </button>
        )}
        <FilterBar onFilter={handleFilter} />
      </div>
      <CardList cards={paginatedCards} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredCards.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
}
