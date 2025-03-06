import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';

// API에서 받아올 프로젝트 데이터 타입 정의
interface ApiProject {
  projectBoardId: number;
  title: string;
  writerName: string;
  projectTypeCategoryName: string;
  relationFieldCategoryName: string[];
  projectRecruitingEndTime: string;
}

// 변환된 프로젝트 데이터 타입 정의 (UI에서 사용)
interface ProjectCard1 {
  id: number;
  title: string;
  author: string;
  category: string;
  relatedFields?: string[];
  deadline: string;
  image?: string;
}

// API 호출 및 데이터 변환
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

        // API 엔드포인트 가져오기 (쿼리 파라미터 포함)
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
  }, [page, size, projectType, relationType]); // 필터 값이 변경될 때 다시 요청

  return { projects, loading, error };
}
