// /hooks/api/project/useFetchProjects.ts

import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';

interface ApiProject {
  projectBoardId: number;
  title: string;
  writerName: string;
  projectTypeCategoryName: string;
  relationFieldCategoryName: string[];
  projectRecruitingEndTime: string;
}

interface ProjectCard1 {
  id: number;
  title: string;
  author: string;
  category: string;
  relatedFields?: string[];
  deadline: string;
  image?: string;
}

export function useFetchProjects(
  page: number = 0,
  size: number = 10,
  projectType?: string,
  relationType?: string,
) {
  const [projects, setProjects] = useState<ProjectCard1[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        // ✅ 로컬 개발환경: 목데이터 12개
        if (process.env.NODE_ENV === 'development') {
          const mockProjects: ProjectCard1[] = Array.from(
            { length: 24 },
            (_, i) => ({
              id: i + 1,
              title: `예시 프로젝트 ${i + 1}`,
              author: `작성자 ${i + 1}`,
              category: i % 2 === 0 ? '프론트엔드' : '백엔드',
              relatedFields:
                i % 3 === 0 ? ['React', 'Next.js'] : ['Node.js', 'Express'],
              deadline: '2025-04-01',
              image: '/logo/semtle-logo-bg-square-v2022.png',
            }),
          );

          setProjects(mockProjects);
          return;
        }

        // 🔁 실제 API 호출
        const apiUrl = API_ROUTES.GET_PROJECT_LIST(
          page,
          size,
          projectType,
          relationType,
        );
        const response = await fetch(apiUrl);
        const json = await response.json();

        if (json.success && json.data?.content) {
          const transformedProjects = json.data.content.map(
            (item: ApiProject) => ({
              id: item.projectBoardId,
              title: item.title,
              author: item.writerName,
              category: item.projectTypeCategoryName,
              relatedFields:
                item.relationFieldCategoryName.length > 0
                  ? item.relationFieldCategoryName
                  : undefined,
              deadline: new Date(item.projectRecruitingEndTime)
                .toISOString()
                .split('T')[0],
              image: '/logo/semtle-logo-bg-square-v2022.png',
            }),
          );

          setProjects(transformedProjects);
        } else {
          setError(true);
          console.error(
            '프로젝트 데이터를 가져오는 중 오류 발생:',
            json.message,
          );
        }
      } catch (error) {
        setError(true);
        console.error('API 요청 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, size, projectType, relationType]);

  return { projects, loading, error };
}
