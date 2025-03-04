import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { useSession } from 'next-auth/react';
import { ActivityPost, mapActivityPost } from '@/types/activity';

/** 게시물 생성 요청 타입 */
interface CreateActivityPost {
  title: string;
  content: string;
  writer: string;
  image_url: string;
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
  data?: ActivityPost | null;
  error?: string | null;
}

// 게시물 생성 훅 (CREATE)
export function useCreateActivity() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (
      postData: CreateActivityPost,
    ): Promise<ActivityMutationResponse> => {
      console.log('[CREATE_ACTIVITY] 요청 시작:', postData);

      // 토큰 가져오기 (세션에서 가져오고, 없으면 localStorage에서 가져옴)
      const accessToken = session?.accessToken || localStorage.getItem('token');
      if (!accessToken) {
        console.error('[CREATE_ACTIVITY] 인증 실패: 로그인 필요');
        throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');
      }

      console.log(postData.image_url);
      const enrichedPostData = {
        ...postData,
        // uuid: session?.id ?? '', // 세션에서 UUID 가져오기
        createdAt: new Date().toISOString(), // 현재 시간 추가
        images: [postData.image_url],
      };

      const response = await fetch(API_ROUTES.CREATE_ACTIVITY, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(enrichedPostData),
      });

      if (!response.ok) {
        console.error(
          `[CREATE_ACTIVITY] 요청 실패: ${response.status} ${response.statusText}`,
        );
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('[CREATE_ACTIVITY] 응답 데이터:', result);

      if (!result.success) {
        throw new Error(result.error || '게시물 생성 실패');
      }

      return {
        ...result,
        data: result.data ? mapActivityPost(result.data) : null,
      };
    },
    onSuccess: () => {
      console.log('[CREATE_ACTIVITY] 게시물 생성 성공! 데이터 갱신 중...');
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error) => {
      console.error('[CREATE_ACTIVITY] API 요청 실패:', error);
    },
  });
}

// 게시물 수정 훅 (UPDATE)
export function useUpdateActivity() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (
      updateData: UpdateActivityPost,
    ): Promise<ActivityMutationResponse> => {
      if (!updateData.post_id) throw new Error('post_id가 없습니다.');

      console.log('[UPDATE_ACTIVITY] 요청 시작:', updateData);

      const accessToken = session?.accessToken || localStorage.getItem('token');
      if (!accessToken) {
        console.error('[UPDATE_ACTIVITY] 인증 실패: 로그인 필요');
        throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');
      }

      // image_url을 포함하여 업데이트 요청
      const updatedPostData = {
        ...updateData,
        image_url: updateData.images || undefined,
      };

      const response = await fetch(
        API_ROUTES.UPDATE_ACTIVITY(updateData.post_id),
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedPostData),
        },
      );

      if (!response.ok) {
        console.error(
          `[UPDATE_ACTIVITY] 요청 실패: ${response.status} ${response.statusText}`,
        );
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('[UPDATE_ACTIVITY] 응답 데이터:', result);

      if (!result.success) {
        throw new Error(result.error || '게시물 수정 실패');
      }

      return {
        ...result,
        data: result.data ? mapActivityPost(result.data) : null,
      };
    },
    onSuccess: () => {
      console.log('[UPDATE_ACTIVITY] 게시물 수정 성공! 데이터 갱신 중...');
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error) => {
      console.error('[UPDATE_ACTIVITY] API 요청 실패:', error);
    },
  });
}

// 게시물 삭제 훅 (DELETE)
export function useDeleteActivity() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (
      deleteData: DeleteActivityPost,
    ): Promise<ActivityMutationResponse> => {
      console.log('[DELETE_ACTIVITY] 요청 시작:', deleteData);

      const accessToken = session?.accessToken || localStorage.getItem('token');
      if (!accessToken) {
        console.error('[DELETE_ACTIVITY] 인증 실패: 로그인 필요');
        throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');
      }

      const response = await fetch(
        API_ROUTES.DELETE_ACTIVITY(deleteData.board_id),
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        console.error(
          `[DELETE_ACTIVITY] 요청 실패: ${response.status} ${response.statusText}`,
        );
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('[DELETE_ACTIVITY] 응답 데이터:', result);

      if (!result.success) {
        throw new Error(result.error || '게시물 삭제 실패');
      }

      return result;
    },
    onSuccess: () => {
      console.log('[DELETE_ACTIVITY] 게시물 삭제 성공! 데이터 갱신 중...');
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error) => {
      console.error('[DELETE_ACTIVITY] API 요청 실패:', error);
    },
  });
}
