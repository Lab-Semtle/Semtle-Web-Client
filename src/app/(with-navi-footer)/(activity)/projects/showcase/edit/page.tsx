'use client';

import { useRouter } from 'next/navigation';
import ProjectShowcaseEditForm from '@/components/form/ProjectShowcaseEditForm';

const CreateProjectPage = () => {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const response = await fetch('/api/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('프로젝트 등록 실패');

      router.push('/projects/showcase');
    } catch (error) {
      alert('등록 중 오류 발생');
    }
  };

  return <ProjectShowcaseEditForm onSubmit={handleSubmit} />;
};

export default CreateProjectPage;
