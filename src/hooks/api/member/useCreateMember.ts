import { useState } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { useSession } from 'next-auth/react';

type CreateMemberRequest = {
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
  name: string;
  profileUrl: string;
  manageApprovalStatus: boolean;
};

type CreateMemberResponse = {
  success: boolean;
  message: string;
  data: {
    uuid: string;
    email: string;
    password: string;
    studentId?: string;
    username: string;
    birth: string;
    phone: string;
    role: 'ADMIN' | 'USER';
    manageApprovalStatus: boolean;
  };
  error?: {
    code: string;
  };
};

/** 회원 생성 훅 */
export function useCreateMember() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMember = async (userData: CreateMemberRequest) => {
    if (!accessToken) {
      setError('인증 토큰이 없습니다.');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ROUTES.CREATE_MEMBER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...userData,
          profileUrl: userData.profileUrl || '',
          manageApprovalStatus: userData.manageApprovalStatus ?? false,
        }),
      });

      if (!response.ok) {
        throw new Error(`회원 추가 실패: HTTP ${response.status}`);
      }

      const result: CreateMemberResponse = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류 발생');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createMember, loading, error };
}
