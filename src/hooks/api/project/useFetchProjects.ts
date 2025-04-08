import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';

interface ApiProject {
  projectBoardId: number;
  title: string;
  writerName: string;
  projectTypeCategoryName: string;
  relationFieldCategoryName: string[];
  projectRecruitingEndTime: string;
  projectBoardImage?: string; // 문자열로 변경
}

interface ProjectCard1 {
  id: number;
  title: string;
  author: string;
  category: string;
  relatedFields?: string[];
  deadline: string;
  image: string | undefined;
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
          // 각 프로젝트에 대해 이미지 URL을 가져오는 Promise 배열 생성
          const projectPromises = json.data.content.map(
            async (item: ApiProject) => {
              try {
                const image = item.projectBoardImage;

                if (image) {
                  const presignedUrl = await fetchNcpPresignedUrl(image);
                  console.log('Presigned URL:', presignedUrl);
                  return {
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
                    image:
                      presignedUrl || '/logo/semtle-logo-bg-square-v2022.png',
                  };
                }
                return {
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
                };
              } catch (error) {
                console.error('이미지 URL 가져오기 실패:', error);
                return {
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
                };
              }
            },
          );

          // 모든 프로젝트의 이미지 URL을 동시에 가져오기
          const transformedProjects = await Promise.all(projectPromises);
          console.log('처리된 프로젝트 데이터:', transformedProjects);
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
