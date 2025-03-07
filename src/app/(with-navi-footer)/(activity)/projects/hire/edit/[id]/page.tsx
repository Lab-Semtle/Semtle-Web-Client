'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProjectHireEditForm from '@/components/form/ProjectHireEditForm';
import { API_ROUTES } from '@/constants/ApiRoutes';

const PROJECT_TYPE_MAP = {
  해커톤: { id: 1, name: '해커톤' },
  경진대회: { id: 2, name: '경진대회' },
  공모전: { id: 3, name: '공모전' },
  사이드프로젝트: { id: 4, name: '사이드프로젝트' },
  기타: { id: 5, name: '기타' },
} as const;

const RELATION_FIELD_MAP = {
  Web: { id: 1, name: 'Web' },
  Mobile: { id: 2, name: 'Mobile' },
  IOS: { id: 3, name: 'IOS' },
  DATA: { id: 4, name: 'DATA' },
  GAME: { id: 5, name: 'GAME' },
  기타: { id: 6, name: '기타' },
} as const;

// API 데이터 타입
interface ProjectData {
  projectTitle: string;
  startDate: string;
  endDate: string;
  contact?: string;
  category: string;
  relatedField: string[];
  content: string;
  images?: string[];
}

const EditProjectPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [initialData, setInitialData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          API_ROUTES.GET_PROJECT_DETAIL(Number(id)),
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.accessToken}`,
            },
          },
        );

        if (!response.ok)
          throw new Error('프로젝트 데이터를 불러오는 데 실패했습니다.');
        const res = await response.json();

        setInitialData({
          projectTitle: res.data.title,
          startDate: res.data.projectStartTime
            ? new Date(res.data.projectStartTime).toISOString()
            : new Date().toISOString(),
          endDate: res.data.projectEndTime
            ? new Date(res.data.projectEndTime).toISOString()
            : new Date().toISOString(),
          contact: res.data.contact || '',
          category: res.data.projectTypeCategory || '',
          relatedField: res.data.relationFieldCategory || [],
          content: res.data.content,
          images: res.data.images || [],
        });
      } catch (error) {
        console.error('데이터 불러오기 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, session]);

  const handleSubmit = async (data: ProjectData) => {
    try {
      if (!session?.accessToken) {
        throw new Error('로그인이 필요합니다.');
      }

      const projectTypeCategory =
        PROJECT_TYPE_MAP[data.category as keyof typeof PROJECT_TYPE_MAP];

      const relationFieldCategories = data.relatedField.map(
        (category) =>
          RELATION_FIELD_MAP[category as keyof typeof RELATION_FIELD_MAP],
      );

      const formattedData = {
        title: data.projectTitle,
        content: data.content,
        contact: data.contact,
        projectTypeCategory,
        relationFieldCategories,
        projectStartTime: new Date(data.startDate).toISOString(),
        projectEndTime: new Date(data.endDate).toISOString(),
        projectRecruitingEndTime: new Date(data.endDate).toISOString(),
      };

      const response = await fetch(API_ROUTES.UPDATE_PROJECT(Number(id)), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) throw new Error('프로젝트 수정 실패');

      router.push(`/mypage/projects`);
    } catch (error) {
      console.error('프로젝트 수정 오류:', error);
    }
  };

  return loading ? (
    <p>로딩 중...</p>
  ) : (
    <ProjectHireEditForm
      initialData={initialData!}
      onSubmit={handleSubmit}
      isEdit
    />
  );
};

export default EditProjectPage;
