import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { ProjectApplyRequest, ProjectApplyResponse } from '@/types/project';

interface UseProjectApplyReturn {
  applyProject: (
    postId: number,
    data: ProjectApplyRequest,
  ) => Promise<ProjectApplyResponse>;
  loading: boolean;
  error: string | null;
}

export const useProjectApply = (): UseProjectApplyReturn => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyProject = async (
    postId: number,
    data: ProjectApplyRequest,
  ): Promise<ProjectApplyResponse> => {
    if (!session?.id) {
      throw new Error('사용자 인증이 필요합니다.');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        API_ROUTES.APPLY_PROJECT(postId, session.id),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify(data),
        },
      );
      console.log('response', response);

      const result: ProjectApplyResponse = await response.json();

      if (!result.success) {
        const errorMessage = getErrorMessage(result.error.code);
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : '프로젝트 신청 중 오류가 발생했습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { applyProject, loading, error };
};

const getErrorMessage = (code: string): string => {
  switch (code) {
    case 'WRONG_PARAM':
      return '필수 입력값이 누락되었습니다.';
    case 'DUPLICATE_APPLICATION':
      return '이미 신청한 프로젝트입니다.';
    case 'RECRUTTING_ALREADY_ENDED':
      return '모집이 마감된 프로젝트입니다.';
    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
};
