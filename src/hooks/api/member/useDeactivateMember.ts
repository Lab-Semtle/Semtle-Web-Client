import { useState } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { useSession } from 'next-auth/react';

export const useDeactivateMember = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const deactivateMember = async (
    uuid: string,
    manageApprovalStatus: boolean,
  ) => {
    setLoading(true);
    try {
      const token = session?.accessToken;
      if (!token) {
        throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');
      }

      const response = await fetch(API_ROUTES.UPDATE_MEMBER_ACTIVE(uuid), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          manageApprovalStatus,
          reason: 'none', // 현재는 "none"으로 고정
        }),
      });

      const responseText = await response.text();
      const result = responseText ? JSON.parse(responseText) : null;

      if (!response.ok) {
        throw new Error(result.message || '회원 승인 상태 변경 실패');
      }

      return result;
    } catch (error) {
      console.error('회원 승인 상태 변경 오류:', error);

      let errorMessage = '알 수 없는 오류가 발생했습니다.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { deactivateMember, loading };
};
