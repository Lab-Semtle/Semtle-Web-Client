/** 사용자 개인정보 관련 API 호출
 * - 개인정보 조회
 * - 개인정보 수정
 */
/** 사용자 개인정보 관련 API 호출 */
/** 사용자 개인정보 관련 API 호출 */
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import {
  ApiResponseWithMessage,
  ApiResponseWithData,
  isApiResponseError,
} from '@/types/api';

export interface UserSetup {
  name: string;
  birth: string;
  phone: string;
  profileImageUrl?: string;
}

const fetcher = async (url: string, token: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok || isApiResponseError(data)) {
    throw new Error(data.message || 'API 응답 오류');
  }
  return data;
};

export const useUserProfile = () => {
  const { data: session } = useSession();
  const userId = session?.id;
  const token = session?.accessToken;

  const {
    data: user,
    error,
    isValidating,
    mutate,
  } = useSWR(
    userId && token ? [`/api/members/${userId}`, token] : null,
    ([url, token]) => fetcher(url, token),
  );

  const updateUserProfile = async (formData: Partial<UserSetup>) => {
    try {
      const response = await fetch(`/api/members/${userId}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponseWithMessage = await response.json();
      if (!response.ok || isApiResponseError(data)) {
        console.warn('[updateUserProfile] API 응답 오류:', data);
        return data;
      }

      mutate(); // SWR 캐시 갱신
      return data;
    } catch (error) {
      console.error('[updateUserProfile] 오류 발생:', error);
    }
  };

  return { user, isLoading: isValidating, error, updateUserProfile };
};
