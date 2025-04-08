'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ProjectHireEditForm from '@/components/form/ProjectHireEditForm';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { useSession } from 'next-auth/react';

interface ProjectData {
  projectTitle: string;
  startDate: string;
  endDate: string;
  contact?: string;
  category: string;
  relatedField?: string[];
  content: string;
  images?: string[]; // 이미지 URL 배열
}

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

const CreateProjectPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (data: ProjectData) => {
    try {
      if (!session?.accessToken) {
        toast.error('로그인이 필요합니다.');
        router.push('/signin');
        return;
      }

      if (!data.relatedField || data.relatedField.length === 0) {
        toast.error('연관 분야를 최소 1개 이상 선택해야 합니다.');
        return;
      }

      // 프로젝트 유형
      const projectTypeCategory =
        PROJECT_TYPE_MAP[data.category as keyof typeof PROJECT_TYPE_MAP];

      // 연관 분야
      const relationFieldCategories = data.relatedField?.map(
        (field) => RELATION_FIELD_MAP[field as keyof typeof RELATION_FIELD_MAP],
      );

      const formattedData = {
        title: data.projectTitle,
        content: data.content,
        contact: data.contact || '',
        projectTypeCategory,
        relationFieldCategories,
        projectStartTime: new Date(data.startDate).toISOString().split('T')[0], // YYYY-MM-DD 형식으로 변환
        projectEndTime: new Date(data.endDate).toISOString().split('T')[0],
        projectRecruitingEndTime: new Date(data.endDate)
          .toISOString()
          .split('T')[0],
        projectBoardImages: data.images || [], // 이미지 URL 배열 추가
      };

      const response = await fetch(API_ROUTES.CREATE_PROJECT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('프로젝트 생성 실패');
      }

      const result = await response.json();

      if (result.success) {
        toast.success('프로젝트가 성공적으로 생성되었습니다.');
        router.push('/projects');
      } else {
        throw new Error(result.message || '프로젝트 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('프로젝트 생성 오류:', error);
      toast.error('프로젝트 생성 중 오류가 발생했습니다.');
    }
  };

  return <ProjectHireEditForm onSubmit={handleSubmit} />;
};

export default CreateProjectPage;
