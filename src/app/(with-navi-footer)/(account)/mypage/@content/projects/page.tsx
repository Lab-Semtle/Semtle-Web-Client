'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '@/components/ui/pagination';
import { useFetchMyProjects } from '@/hooks/api/project/useFetchMyProjects';
import { CalendarClock, Tags, User2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { API_ROUTES } from '@/constants/ApiRoutes';
type Project = {
  id: number;
  title: string;
  deadline: string;
  category: string;
  relatedFields: string[];
  writer: string;
};

export default function ProjectsTab() {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { projects, loading, error, totalPages, refetch } = useFetchMyProjects(
    currentPage - 1,
    itemsPerPage,
  );

  // 프로젝트 삭제 함수
  const handleDelete = async (projectId: number) => {
    if (!session?.accessToken) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (!window.confirm('정말로 이 프로젝트 공고를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(API_ROUTES.DELETE_PROJECT(projectId), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) throw new Error('삭제 실패');

      toast.success('프로젝트 공고가 삭제되었습니다.');
      refetch();
    } catch (error) {
      console.error('삭제 오류:', error);
      toast.error('프로젝트 공고 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-grow p-6">
        {loading ? (
          <p className="text-center text-lg font-semibold">로딩 중...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-500">
            데이터를 불러오지 못했습니다.
          </p>
        ) : projects.length === 0 ? (
          <p className="text-center text-lg font-semibold text-gray-500">
            게시물이 없습니다.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {projects.map((project) => (
                <Dialog key={project.id}>
                  <Card
                    key={project.id}
                    className="border-gray-200 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-800"
                  >
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-gray-100">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p className="flex items-center gap-2 font-medium">
                        <CalendarClock className="h-5 w-5 text-gray-500" />
                        {project.deadline}
                      </p>
                      <p className="flex items-center gap-2 font-medium">
                        <Tags className="h-5 w-5 text-green-500" />
                        {project.relatedFields.join(', ') || '미정'}
                      </p>
                      <p className="flex items-center gap-2 font-medium">
                        <User2 className="h-5 w-5 text-purple-500" />
                        {project.writer}
                      </p>
                      <div className="mt-6 flex gap-2">
                        <Button
                          size="sm"
                          className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                          onClick={() =>
                            router.push(`/projects/hire/edit/${project.id}`)
                          }
                        >
                          수정
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                          onClick={() => handleDelete(project.id)}
                        >
                          삭제
                        </Button>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-500 text-gray-700 hover:bg-gray-100 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={() => setSelectedProject(project)}
                          >
                            자세히 보기
                          </Button>
                        </DialogTrigger>
                      </div>
                    </CardContent>
                  </Card>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedProject?.title}</DialogTitle>
                    </DialogHeader>
                    <p>마감일: {selectedProject?.deadline}</p>
                    <p>카테고리: {selectedProject?.category}</p>
                    <p>
                      연관 분야: {selectedProject?.relatedFields.join(', ')}
                    </p>
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      className={`${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      className={`${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>
    </div>
  );
}
