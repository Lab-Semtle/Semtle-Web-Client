'use client';

import { useRouter } from 'next/navigation';
import ProjectHireEditForm from '@/components/form/ProjectHireEditForm';

// 프로젝트 데이터 타입 정의
interface ProjectData {
  projectTitle: string;
  startDate: Date;
  endDate: Date;
  contact?: string;
  projectType: string;
  categories?: string[];
  content: string;
  images?: string[];
}

const CreateProjectPage = () => {
  const router = useRouter();

  const handleSubmit = async (data: ProjectData) => {
    try {
      // 날짜 데이터를 ISO 문자열로 변환
      const formattedData = {
        ...data,
        categories: data.categories || [],
        images: data.images || [],
        contact: data.contact || '',
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('프로젝트 생성 실패');
      }

      const result = await response.json();
      console.log('🚀 프로젝트 생성 성공:', result);

      // 프로젝트 목록 페이지로 이동
      router.push('/projects');
    } catch (error) {
      console.error('프로젝트 생성 오류:', error);
      alert('프로젝트 생성 중 오류가 발생했습니다.');
    }
  };

  return <ProjectHireEditForm onSubmit={handleSubmit} />;
};

export default CreateProjectPage;
