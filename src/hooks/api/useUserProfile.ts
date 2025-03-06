/** 사용자 개인정보 관련 API 호출
 * - 개인정보 조회
 * - 개인정보 수정
 */

import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { API_ROUTES } from '@/constants/ApiRoutes';

/** 사용자 정보 타입 */
export interface UserProfile {
  uuid: string;
  email: string;
  studentId?: string;
  username: string;
  birth?: string;
  phone?: string;
  role: string;
  manageApprovalStatus: boolean;
  profileImageUrl?: string;
}

/** 사용자 프로필 수정 요청 타입 */
export interface UserUpdateRequest {
  studentId?: string;
  username?: string;
  birth?: string;
  phone?: string;
}

/** API 응답 기본 구조 */
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: {
    code: string;
  };
}

/** Fetcher 함수 (GET 요청) */
const fetcher = async (
  url: string,
  token: string,
): Promise<ApiResponse<UserProfile>> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API 요청 실패');
  }
  return data;
};

/** 사용자 프로필 관리 훅 */
export const useUserProfile = () => {
  const { data: session } = useSession();
  const userId = session?.id;
  const token = session?.accessToken;

  const { data, error, isValidating, mutate } = useSWR(
    userId && token ? [API_ROUTES.GET_MEMBER_DETAIL(userId), token] : null,
    ([url, token]) => fetcher(url, token),
  );

  const user = data?.data;

  /** 사용자 프로필 업데이트 */
  const updateUserProfile = async (
    formData: UserUpdateRequest,
  ): Promise<void> => {
    if (!userId || !token) {
      console.error('사용자 인증 정보가 없습니다.');
      return;
    }

    // birth 값을 ISO 8601 형식으로 변환 (UTC)
    const formattedData = {
      ...formData,
      birth: formData.birth
        ? new Date(formData.birth).toISOString()
        : undefined,
    };

    console.log(formattedData);

    try {
      const response = await fetch(API_ROUTES.UPDATE_MEMBER(userId), {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok || !result.success) {
        console.warn('[updateUserProfile] API 응답 오류:', result);
        throw new Error(result.message || '개인정보 수정 실패');
      }

      mutate(); // SWR 캐시 갱신
    } catch (error) {
      console.error('[updateUserProfile] 오류 발생:', error);
    }
  };

  return { user, isLoading: isValidating, error, updateUserProfile };
};
