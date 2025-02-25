/** 사용자 개인정보 관련 API 호출
 * - 개인정보 조회
 * - 개인정보 수정
 */
/** 사용자 개인정보 관련 API 호출 */
/** 사용자 개인정보 관련 API 호출 */

import { useEffect, useState } from 'react';
import apiClient from '@/services/api-client';
import { useSession } from 'next-auth/react';
import {
  ApiResponseWithMessage,
  ApiResponseWithData,
  isApiResponseError,
} from '@/types/api';
import { User } from '@/types/data';

// 개인정보 조회 반환 타입
interface MemberResponse {
  name: string;
  birth: string;
  phone: string;
}

export const useUserProfile = () => {
  const { data: session } = useSession();
  const userId = session?.id;
  const [user, setUser] = useState<MemberResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    apiClient
      .get<ApiResponseWithData<MemberResponse>>(`/api/members/${userId}`)
      .then((response) => {
        console.log('[fetchUserProfile] 응답 데이터:', response);

        // API 응답이 오류인지 확인
        if (isApiResponseError(response)) {
          console.warn('[fetchUserProfile] API 응답 오류:', response);
          return;
        }

        // `response.data`가 `undefined`일 가능성 처리
        setUser(response.data ?? null);
      })
      .catch((error) => {
        console.error('[fetchUserProfile] 오류 발생:', error);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const updateUserProfile = async (formData: Partial<User>) => {
    setLoading(true);
    return apiClient
      .patch<ApiResponseWithMessage, Partial<User>>(`/api/members/${userId}`, {
        body: formData,
      })
      .then((response) => {
        console.log('[onSubmit] 응답 데이터:', response);

        if (isApiResponseError(response) || response.status !== 200) {
          console.warn('[updateUserProfile] API 응답 오류:', response);
          return response;
        }

        // ✅ PATCH 응답에는 `data`가 없으므로 기존 `user` 상태를 직접 업데이트
        setUser((prev) => (prev ? { ...prev, ...formData } : null));

        return response;
      })
      .finally(() => setLoading(false));
  };

  return { user, loading, updateUserProfile };
};
