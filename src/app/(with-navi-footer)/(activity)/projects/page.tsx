'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import FilterBar from '@/components/common/FilterBar';
import ProjectCard1 from '@/components/common/ProjectCard1';
import ProjectCard2 from '@/components/common/ProjectCard2';
import PageHeading from '@/components/common/PageHeading';
import { useFetchProjects } from '@/hooks/api/project/useFetchProjects';
import { SHOWCASE_DATA } from '@/constants/showcaseData';

export default function ProjectBoardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { projects: activeProjects, loading, error } = useFetchProjects();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filter, setFilter] = useState({
    projectType: '전체',
    category: '전체',
    searchTerm: '',
  });
  const safeShowcaseData = SHOWCASE_DATA ?? [];

  // 검색 파라미터 기반으로 기본 탭 설정
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    if (status === 'authenticated' && session?.id) {
      setIsAuthenticated(true);
    }
  }, [status, session]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get('tab') === 'showcase' ? 'completed' : 'active';
    setActiveTab(tab);
  }, []);

  const [filteredProjects, setFilteredProjects] = useState<
    ProjectCard1[] | ProjectCard2[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (activeTab === 'active') {
      setFilteredProjects(
        activeProjects.filter(
          (project) =>
            project.title.includes(filter.searchTerm) &&
            (filter.projectType === '전체' ||
              project.category === filter.projectType) &&
            (filter.category === '전체' ||
              project.relatedFields?.includes(filter.category)),
        ),
      );
    } else {
      setFilteredProjects(
        safeShowcaseData.filter(
          (project) =>
            project.title.includes(filter.searchTerm) &&
            (filter.projectType === '전체' ||
              project.category === filter.projectType) &&
            (filter.category === '전체' ||
              project.relatedFields?.includes(filter.category)),
        ),
      );
    }
  }, [activeTab, activeProjects, filter]);

  // 페이지 변경 (빌드 오류 방지)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 프로젝트 등록 버튼 클릭 시 로그인 확인
  const handleCreateProject = () => {
    if (activeTab !== 'active') {
      if (typeof window !== 'undefined') {
        alert('준비 중입니다.');
      }
      return;
    }

    if (!isAuthenticated) {
      console.warn('[handleCreateProject] 세션 정보 없음:', session);
      if (typeof window !== 'undefined') {
        alert('로그인이 필요합니다.');
      }
      setTimeout(() => {
        router.push('/signin');
      }, 100);
      return;
    }

    setTimeout(() => {
      router.push('/projects/hire/edit');
    }, 100);
  };

  // 페이지네이션
  const paginatedProjects =
    filteredProjects.length > 0
      ? filteredProjects.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        )
      : [];

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / itemsPerPage),
  );

  return (
    <Suspense fallback={<p>로딩 중...</p>}>
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
            disabled={activeTab !== 'active'}
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
          <FilterBar onFilter={setFilter} />
        </div>

        {/* 프로젝트 리스트 및 페이지네이션 */}
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
            <div className="mx-auto w-full max-w-[1000px]">
              {activeTab === 'active' ? (
                <ProjectCard1 cards={paginatedProjects as ProjectCard1[]} />
              ) : (
                <ProjectCard2 cards={paginatedProjects as ProjectCard2[]} />
              )}
            </div>
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>
    </Suspense>
  );
}
