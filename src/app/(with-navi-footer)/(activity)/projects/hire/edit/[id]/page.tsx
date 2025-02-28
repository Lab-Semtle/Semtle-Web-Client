'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProjectHireEditForm from '@/components/form/ProjectHireEditForm';

// ✅ 모든 날짜 타입을 `string`으로 변경
interface ProjectData {
  projectTitle: string;
  startDate: string;
  endDate: string;
  contact: string;
  projectType: string;
  categories: string[];
  content: string;
  images: string[];
}

const EditProjectPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok)
          throw new Error('프로젝트 데이터를 불러오는 데 실패했습니다.');

        const data: ProjectData = await response.json();

        // ✅ 기존 데이터를 유지하면서 날짜를 `string`으로 저장
        const formattedData: ProjectData = {
          ...data,
          startDate: data.startDate || new Date().toISOString(),
          endDate: data.endDate || new Date().toISOString(),
        };

        setInitialData(formattedData);
      } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        alert('프로젝트 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (data: ProjectData) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('프로젝트 수정 실패');
      }

      const result = await response.json();
      console.log('✏️ 프로젝트 수정 성공:', result);

      // 프로젝트 상세 페이지로 이동
      router.push(`/projects/showcase/${id}`);
    } catch (error) {
      console.error('프로젝트 수정 오류:', error);
      alert('프로젝트 수정 중 오류가 발생했습니다.');
    }
  };

  return loading ? (
    <p>로딩 중...</p>
  ) : (
    <ProjectHireEditForm
      initialData={initialData!} // ✅ string 타입 데이터 전달
      onSubmit={handleSubmit}
      isEdit
    />
  );
};

export default EditProjectPage;
