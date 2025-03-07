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
  projectType?: string, // 프로젝트 타입(카테고리) 필터 추가
  relationType?: string, // 관련 분야 필터 추가
) {
  const [projects, setProjects] = useState<ProjectCard1[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

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
