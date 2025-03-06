'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
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
import ProjectCard1 from '@/components/common/ProjectCard1';
import ProjectCard2 from '@/components/common/ProjectCard2';
import PageHeading from '@/components/common/PageHeading';
import { useFetchProjects } from '@/hooks/api/project/useFetchProjects';
import { SHOWCASE_DATA } from '@/constants/showcaseData';

// 타입 정의
type Filter = {
  projectType: string;
  category: string;
  searchTerm: string;
};

export default function ProjectBoardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  // 탭 상태 (모집 중인 프로젝트 or 학회 프로젝트 성과)
  const defaultTab =
    searchParams.get('tab') === 'showcase' ? 'completed' : 'active';
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>(
    defaultTab,
  );

  // API에서 데이터 가져오기
  const { projects: activeProjects, loading, error } = useFetchProjects();

  // 필터 상태 추가
  const [filter, setFilter] = useState<Filter>({
    projectType: '전체',
    category: '전체',
    searchTerm: '',
  });

  // 필터링된 프로젝트 상태
  const [filteredProjects, setFilteredProjects] = useState<
    ProjectCard1[] | ProjectCard2[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // 필터 적용
  const handleFilter = (filter: Filter) => {
    setFilter(filter); // 필터 상태 업데이트
  };

  // 데이터 변경 시 필터링 적용
  useEffect(() => {
    if (activeTab === 'active') {
      const filtered = activeProjects.filter(
        (project) =>
          project.title.includes(filter.searchTerm) &&
          (filter.projectType === '전체' ||
            project.category === filter.projectType) &&
          (filter.category === '전체' ||
            project.relatedFields?.includes(filter.category)),
      );

      setFilteredProjects(filtered as ProjectCard1[]);
    } else {
      const filtered = SHOWCASE_DATA.filter(
        (project) =>
          project.title.includes(filter.searchTerm) &&
          (filter.projectType === '전체' ||
            project.category === filter.projectType) &&
          (filter.category === '전체' ||
            project.relatedFields?.includes(filter.category)),
      );

      setFilteredProjects(filtered as ProjectCard2[]);
    }
  }, [activeTab, activeProjects, filter]);

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 프로젝트 등록 버튼 클릭 시 로그인 확인
  const handleCreateProject = () => {
    if (activeTab !== 'active') {
      alert('준비 중입니다.');
      return;
    }

    if (status !== 'authenticated' || !session?.id) {
      alert('로그인이 필요합니다.');
      router.push('/signin');
      return;
    }

    router.push('/projects/hire/edit');
  };

  // 현재 페이지에 보여줄 데이터 (페이지네이션 적용)
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

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
            onClick={() => setActiveTab('active')}
          >
            모집 중인 프로젝트 공고
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold transition-colors ${
              activeTab === 'completed'
                ? 'border-b-4 border-blue-500 text-black dark:text-white'
                : 'text-gray-500 hover:text-black dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            학회 프로젝트 성과
          </button>
        </div>
      </div>

      {/* 필터 + 버튼 */}
      <div className="mx-auto flex w-full max-w-[1000px] items-center justify-between gap-4 p-4 pb-0 pt-0">
        <Button
          onClick={handleCreateProject}
          disabled={activeTab !== 'active'} // "성과 등록하기" 버튼 비활성화
          className={`rounded px-4 py-2 font-bold ${
            activeTab === 'active'
              ? 'bg-blue-500 text-white'
              : 'cursor-not-allowed bg-gray-400 text-gray-700'
          }`}
        >
          {activeTab === 'active'
            ? '새로운 프로젝트 시작하기'
            : '프로젝트 성과 등록하기'}
        </Button>
        <FilterBar onFilter={handleFilter} />
      </div>

      {/* 데이터 상태에 따른 UI */}
      {loading ? (
        <p className="text-center text-lg font-semibold">로딩 중...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">
          데이터를 불러오지 못했습니다.
        </p>
      ) : filteredProjects.length === 0 ? (
        <p className="text-center text-lg font-semibold text-gray-500">
          게시물이 존재하지 않습니다.
        </p>
      ) : (
        <>
          {/* 카드 리스트 */}
          <div className="mx-auto w-full max-w-[1000px]">
            {activeTab === 'active' ? (
              <ProjectCard1 cards={paginatedProjects as ProjectCard1[]} />
            ) : (
              <ProjectCard2 cards={paginatedProjects as ProjectCard2[]} />
            )}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
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
                      isActive={currentPage === index + 1}
                      className={
                        currentPage === index + 1
                          ? 'rounded-full bg-blue-500 text-white'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
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
          )}
        </>
      )}
    </main>
  );
}
