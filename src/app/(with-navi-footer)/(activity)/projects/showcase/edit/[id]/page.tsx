'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

const EditProjectPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/promotions/${id}`);
      const data = await response.json();
      setInitialData(data);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (data: ProjectData) => {
    await fetch(`/api/promotions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    router.push('/projects/showcase');
  };

  return initialData ? (
    <ProjectShowcaseEditForm
      initialData={initialData}
      onSubmit={handleSubmit}
      isEdit
    />
  ) : (
    <p>로딩 중...</p>
  );
};

export default EditProjectPage;
