//       {/* 페이지네이션 */}
//       {totalPages > 1 && (
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 onClick={() => {
//                   if (currentPage > 1) handlePageChange(currentPage - 1);
//                 }}
//                 aria-disabled={currentPage === 1}
//                 className={
//                   currentPage === 1
//                     ? 'pointer-events-none cursor-not-allowed opacity-50'
//                     : ''
//                 }
//               />
//             </PaginationItem>
//             {Array.from({ length: totalPages }, (_, index) => (
//               <PaginationItem key={index}>
//                 <PaginationLink
//                   isActive={currentPage === index + 1}
//                   onClick={() => handlePageChange(index + 1)}
//                 >
//                   {index + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}
//             <PaginationItem>
//               <PaginationNext
//                 onClick={() => {
//                   if (currentPage < totalPages)
//                     handlePageChange(currentPage + 1);
//                 }}
//                 aria-disabled={currentPage === totalPages}
//                 className={
//                   currentPage === totalPages
//                     ? 'pointer-events-none cursor-not-allowed opacity-50'
//                     : ''
//                 }
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       )}
//     </main>
//   );
// }

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
import CardListA from '@/components/common/CardListA';
import CardListC from '@/components/common/CardListC';
import PageHeading from '@/components/common/PageHeading';
import { API_ROUTES } from '@/constants/ApiRoutes';

type ProjectCard = {
  id: number;
  title: string;
  writer: string;
  projectType: string;
  categories: string[];
  endTime: string;
};

type Filter = {
  searchTerm: string;
};

export default function ProjectBoardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession(); // 로그인 세션 확인

  const defaultTab =
    searchParams.get('tab') === 'showcase' ? 'completed' : 'active';

  const [activeTab, setActiveTab] = useState<'active' | 'completed'>(
    defaultTab,
  );

  const [activeProjects, setActiveProjects] = useState<ProjectCard[]>([]);
  const [completedProjects, setCompletedProjects] = useState<ProjectCard[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // 모집 중인 프로젝트 API 호출
  useEffect(() => {
    const fetchActiveProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ROUTES.GET_PROJECT_LIST(1, 50)); // 페이지 1, 50개 요청
        const json = await response.json();

        if (json.success && json.data?.content) {
          const projects = json.data.content.map((item: any) => ({
            id: item.projectBoardId,
            title: item.title,
            writer: item.writerName,
            projectType: item.projectTypeCategoryName,
            categories: item.relationFieldCategoryName || [],
            endTime: item.projectRecruitingEndTime,
          }));
          setActiveProjects(projects);
          if (activeTab === 'active') setFilteredProjects(projects);
        } else {
          setError(true);
          console.error('Error loading active projects:', json.message);
        }
      } catch (error) {
        setError(true);
        console.error('Failed to fetch active projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveProjects();
  }, []);

  // 완료된 프로젝트 API 호출
  useEffect(() => {
    const fetchCompletedProjects = async () => {
      try {
        const response = await fetch(API_ROUTES.GET_PROMOTION_LIST('', 1, 50));
        const json = await response.json();

        if (json.success && json.data?.content) {
          const projects = json.data.content.map((item: any) => ({
            id: item.projectBoardId,
            title: item.title,
            writer: item.writerName,
            projectType: item.projectTypeCategoryName,
            categories: item.relationFieldCategoryName || [],
            endTime: item.projectRecruitingEndTime,
          }));
          setCompletedProjects(projects);
          if (activeTab === 'completed') setFilteredProjects(projects);
        } else {
          setError(true);
          console.error('Error loading completed projects:', json.message);
        }
      } catch (error) {
        setError(true);
        console.error('Failed to fetch completed projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompletedProjects();
  }, []);

  // 필터 적용
  const handleFilter = (filter: Filter) => {
    const sourceProjects =
      activeTab === 'active' ? activeProjects : completedProjects;
    const filtered = sourceProjects.filter((project) =>
      project.title.includes(filter.searchTerm),
    );
    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 프로젝트 등록 버튼 클릭 시 로그인 확인
  const handleCreateProject = () => {
    if (status !== 'authenticated' || !session?.id) {
      alert('로그인이 필요합니다.');
      router.push('/signin');
      return;
    }

    const path =
      activeTab === 'active'
        ? '/projects/hire/edit'
        : '/projects/showcase/edit';
    router.push(path);
  };

  // 프로젝트 삭제 (완료된 프로젝트에서만 가능)
  const handleDelete = (selectedCardIds: number[]) => {
    setCompletedProjects((prev) =>
      prev.filter((project) => !selectedCardIds.includes(project.id)),
    );
    setFilteredProjects((prev) =>
      prev.filter((project) => !selectedCardIds.includes(project.id)),
    );
  };

  // 현재 페이지에 보여줄 데이터
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
            onClick={() => {
              setActiveTab('active');
              setFilteredProjects(activeProjects);
              setCurrentPage(1);
            }}
          >
            모집 중인 프로젝트 공고
          </button>
          <button
            className={`px-6 py-3 text-lg font-semibold transition-colors ${
              activeTab === 'completed'
                ? 'border-b-4 border-blue-500 text-black dark:text-white'
                : 'text-gray-500 hover:text-black dark:hover:text-white'
            }`}
            onClick={() => {
              setActiveTab('completed');
              setFilteredProjects(completedProjects);
              setCurrentPage(1);
            }}
          >
            종료된 프로젝트
          </button>
        </div>
      </div>

      {/* 필터 + 버튼 */}
      <div className="mx-auto flex w-full max-w-[1000px] items-center justify-between gap-4 p-4 pb-0 pt-0">
        <Button onClick={handleCreateProject}>
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
              <CardListA cards={paginatedProjects} />
            ) : (
              <CardListC cards={paginatedProjects} onDelete={handleDelete} />
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
                    <PaginationLink onClick={() => handlePageChange(index + 1)}>
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
