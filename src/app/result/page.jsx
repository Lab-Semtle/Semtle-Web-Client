
"use client"; // 이 줄을 추가하여 클라이언트 컴포넌트로 선언

import { useState } from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import CardList from "./components/CardList";
import Pagination from "./components/Pagination";


const sampleCards = [
    { id: 1, image: "images/image1.jpg", title: "해커톤 도전", description: "코딩과 혁신을 통해 해커톤에서 자신의 실력을 뽐내보세요.", projectType: "해커톤", category: ["Web", "Game"] },
    { id: 2, image: "images/image2.jpg", title: "게임 개발 경진대회", description: "흥미진진한 게임 개발 경진대회에서 우승을 향한 도전을 시작하세요.", projectType: "경진대회", category: ["Game"] },
    { id: 3, image: "images/image3.jpg", title: "혁신 공모전", description: "창의적인 프로젝트 아이디어를 제출하고 인정과 보상을 받으세요.", projectType: "공모전", category: ["iOS", "Web"] },
    { id: 4, image: "images/image5.jpg", title: "사이드 프로젝트 협업", description: "팀원들과 함께 창의적인 해결책을 만들기 위한 사이드 프로젝트에 참여하세요.", projectType: "사이드프로젝트", category: ["Android"] },
    { id: 5, image: "images/image6.jpg", title: "웹 & 안드로이드 오픈 챌린지", description: "웹 개발자와 안드로이드 개발자들이 모여 다음 최고의 앱을 만들어 보세요.", projectType: "기타", category: ["Web", "Android"] },
    { id: 6, image: "images/image4.jpg", title: "해커톤 혁신", description: "실제 문제를 해결하는 혁신적인 아이디어로 해커톤에 참여하세요.", projectType: "해커톤", category: ["Android", "Web"] },
    { id: 7, image: "images/image6.jpg", title: "iOS 개발 챌린지", description: "iOS 개발자들만을 위한 도전, 최신 모바일 앱을 만들어보세요.", projectType: "경진대회", category: ["iOS"] },
    { id: 8, image: "images/image3.jpg", title: "게임 & iOS 혁신", description: "게임 또는 iOS 앱을 혁신적으로 만들어 최고의 아이디어를 선보이세요.", projectType: "공모전", category: ["Game", "iOS"] }
  ];
  




export default function project() {
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

  const handleDelete = (selectedCardIds) => {
    // 선택된 카드 ID가 포함되지 않은 카드들만 필터링해서 업데이트
    setCards(cards.filter((card) => !selectedCardIds.includes(card.id)));
  };

  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <h2 className="text-4xl font-bold text-center mt-8 mb-8">프로젝트결과</h2>
      <FilterBar onFilter={handleFilter} />
      <CardList cards={paginatedCards} onDelete={handleDelete} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredCards.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
}
