import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { useSession } from 'next-auth/react';
import { ActivityPostResponseSchema } from '@/types/activity';

/** 게시물 생성 요청 타입 */
interface CreateActivityPost {
  title: string;
  content: string;
  writer: string;
  images?: string[];
  type: string;
}
//createdAt
//uuid

/** 게시물 수정 요청 타입 */
interface UpdateActivityPost {
  board_id: number;
  title: string;
  content: string;
  writer: string;
  images?: string[];
  type: string;
  createdAt?: string;
}

/** 게시물 삭제 요청 타입 */
interface DeleteActivityPost {
  board_id: number;
}

/** API 응답 타입 */
interface ActivityMutationResponse {
  success: boolean;
  message: string;
  data?: unknown;
  error?: string | null;
}

/** 게시물 생성 훅 (CREATE) */
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
      console.log('[CREATE_ACTIVITY] accessToken 확인:', accessToken);

      if (!accessToken) {
        console.error('[CREATE_ACTIVITY] 인증 실패: 로그인 필요');
        throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');
      }

      // const enrichedPostData = {
      //   ...postData,
      //   uuid: session?.id, // 세션에서 UUID 가져오기
      //   createdAt: new Date().toISOString(), // 현재 시간 추가
      //   images: [postData.images],
      // };

      const response = await fetch(API_ROUTES.CREATE_ACTIVITY, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });

      console.log('[CREATE_ACTIVITY] 응답 상태 코드:', response.status);
      if (!response.ok) {
        const errorMessage = `Error ${response.status}: ${response.statusText}`;
        console.error('[CREATE_ACTIVITY] API 요청 실패:', errorMessage);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('[CREATE_ACTIVITY] 응답 데이터:', result);

      if (!result.success) {
        throw new Error(result.error || '게시물 생성 실패');
      }

      // 데이터가 null이면 기본값 할당
      const validatedData = result.data
        ? ActivityPostResponseSchema.parse(result.data)
        : null; // <- null을 허용하도록 수정
      return { ...result, data: validatedData };
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

/** 게시물 수정 훅 (UPDATE) */
export function useUpdateActivity() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (
      updateData: UpdateActivityPost,
    ): Promise<ActivityMutationResponse> => {
      if (!updateData.board_id) throw new Error('board_id가 없습니다.');

      console.log('[UPDATE_ACTIVITY] 요청 시작:', updateData);

      const accessToken = session?.accessToken || localStorage.getItem('token');
      if (!accessToken) {
        console.error('[UPDATE_ACTIVITY] 인증 실패: 로그인 필요');
        throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');
      }

      console.log('[UPDATE_ACTIVITY] session ID:', session?.id);

      // 자동 생성 필드 제거 후 전송
      const updatedPostData: Partial<UpdateActivityPost> = {
        title: updateData.title ?? '',
        content: updateData.content ?? '',
        writer: session?.user?.name ?? '관리자',
        images: updateData.images ?? [],
        type: updateData.type ?? '기타',
        createdAt: updateData.createdAt ?? new Date().toISOString(),
      };

      console.log('[UPDATE_ACTIVITY] 최종 전송 데이터:', updatedPostData);

      const response = await fetch(
        API_ROUTES.UPDATE_ACTIVITY(updateData.board_id),
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

      // success 값이 true면 data가 null이더라도 오류를 던지지 않도록 수정
      if (!result.success) {
        throw new Error(result.error || '게시물 수정 실패');
      }

      return { success: true, message: result.message, data: null };
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

/** 게시물 삭제 훅 (DELETE) */
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
