import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { API_ROUTES } from '@/constants/ApiRoutes';

export const useBulkSignup = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const bulkSignup = async (file: File) => {
    setLoading(true);
    try {
      if (!session?.accessToken) {
        throw new Error('인증 정보가 없습니다. 다시 로그인 해주세요.');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(API_ROUTES.SIGNUP_MEMBERS, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '일괄 회원가입 실패');
      }

      return result;
    } catch (error) {
      console.error('일괄 회원가입 오류:', error);

      let errorMessage = '알 수 없는 오류가 발생했습니다.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { bulkSignup, loading };
};
