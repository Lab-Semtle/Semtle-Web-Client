'use client';

import { useRouter } from 'next/navigation';
import ProjectShowcaseEditForm from '@/components/form/ProjectShowcaseEditForm';

interface ProjectData {
  title: string;
  subtitle?: string;
  writer: string;
  result_link: string;
  image_url?: string[];
  create_date: string;
  due_date: string;
  recruiting_end_time?: string;
  project_type: string;
  relate_field: string[];
  member: string;
  contents: string;
}
const CreateProjectPage = () => {
  const router = useRouter();

  const handleSubmit = async (data: ProjectData) => {
    try {
      const response = await fetch('/api/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('프로젝트 등록 실패');

      router.push('/projects/showcase');
    } catch (error) {
      console.error('프로젝트 등록 오류:', error);
      alert('등록 중 오류 발생');
    }
  };

  return <ProjectShowcaseEditForm onSubmit={handleSubmit} />;
};

export default CreateProjectPage;
