import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';

// API 응답 데이터 타입 정의
interface ApiProject {
  projectBoardId: number;
  title: string;
  writerName: string;
  projectTypeCategoryName: string;
  relationFieldCategoryName: string[];
  projectRecruitingEndTime: string;
}

// 변환된 프로젝트 데이터 타입
interface Project {
  id: number;
  title: string;
  writer: string;
  category: string;
  relatedFields: string[];
  deadline: string;
}

export const useFetchMyProjects = (page: number, size: number) => {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [retry, setRetry] = useState<boolean>(false); // 임시 조차(첫 방문시 토큰 X 이슈

  // 프로젝트 목록 불러오기
  const fetchProjects = useCallback(async () => {
    if (status === 'loading') return;
    if (!session?.accessToken) {
      if (!retry) {
        setTimeout(() => setRetry(true), 500); // 세션이 늦게 로딩되는 경우 대비
        return;
      }
      setError(true);
      console.error('액세스 토큰이 없습니다. 로그인 필요');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_ROUTES.GET_MY_PROJECTS(page, size), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const json = await response.json();

      if (json.success && json.data?.content) {
        const transformedProjects = json.data.content.map(
          (item: ApiProject) => ({
            id: item.projectBoardId,
            title: item.title,
            writer: item.writerName,
            category: item.projectTypeCategoryName,
            relatedFields: item.relationFieldCategoryName || [],
            deadline: new Date(item.projectRecruitingEndTime)
              .toISOString()
              .split('T')[0],
          }),
        );

        setProjects(transformedProjects);
        setTotalPages(json.data.totalPages);
      } else {
        setError(true);
        console.error('프로젝트 데이터를 가져오는 중 오류 발생:', json.message);
      }
    } catch (error) {
      setError(true);
      console.error('API 요청 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [page, size, session?.accessToken, status, retry]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, totalPages, refetch: fetchProjects };
};
