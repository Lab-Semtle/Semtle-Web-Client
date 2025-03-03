import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { useSession } from 'next-auth/react';

/** 게시물 생성 요청 타입 */
interface CreateActivityPost {
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  uuid: string;
  images?: string[];
  type: string;
}

/** 게시물 수정 요청 타입 */
interface UpdateActivityPost extends Partial<CreateActivityPost> {
  post_id: number;
}

/** 게시물 삭제 요청 타입 */
interface DeleteActivityPost {
  board_id: number;
}

/** API 응답 타입 */
interface ActivityMutationResponse {
  success: boolean;
  message: string;
  data: null;
  error?: string | null;
}

// 게시물 생성 훅
export function useCreateActivity() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (
      postData: Omit<CreateActivityPost, 'uuid' | 'createdAt'>,
    ): Promise<ActivityMutationResponse> => {
      const enrichedPostData = {
        ...postData,
        uuid: session?.id ?? '', // 세션에서 UUID 가져오기 (없으면 빈 문자열)
        createdAt: new Date().toISOString(), // 현재 시간 추가
      };

      const response = await fetch(API_ROUTES.CREATE_ACTIVITY, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰 필요
        },
        body: JSON.stringify(enrichedPostData),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error) => {
      console.error('[CREATE_ACTIVITY] API 요청 실패:', error);
    },
  });
}

// 게시물 수정 훅
export function useUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      updateData: UpdateActivityPost,
    ): Promise<ActivityMutationResponse> => {
      if (!updateData.post_id) throw new Error('post_id가 없습니다.');

      const response = await fetch(
        API_ROUTES.UPDATE_ACTIVITY(updateData.post_id),
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰 필요
          },
          body: JSON.stringify(updateData),
        },
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error) => {
      console.error('[UPDATE_ACTIVITY] API 요청 실패:', error);
    },
  });
}

// 게시물 삭제 훅
export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      deleteData: DeleteActivityPost,
    ): Promise<ActivityMutationResponse> => {
      const response = await fetch(
        API_ROUTES.DELETE_ACTIVITY(deleteData.board_id),
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰 필요
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error) => {
      console.error('[DELETE_ACTIVITY] API 요청 실패:', error);
    },
  });
}
