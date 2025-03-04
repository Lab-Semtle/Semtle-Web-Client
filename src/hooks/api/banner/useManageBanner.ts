import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { useSession } from 'next-auth/react';
import { Banner } from '@/types/banner';

/** 배너 추가 & 삭제 관련 훅 */
export function useManageBanner() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  /** 배너 추가 */
  const createBanner = useMutation({
    mutationFn: async (
      bannerData: Omit<Banner, 'bannerId' | 'createdAt' | 'imageUrl'>,
    ) => {
      if (!session?.accessToken)
        throw new Error('인증이 필요합니다. 다시 로그인해주세요.');

      const cleanedImagePath = bannerData.imagePath.replace(/^\/+/, ''); // 경로 정리

      const response = await fetch(API_ROUTES.CREATE_BANNERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          ...bannerData,
          imagePath: cleanedImagePath,
        }),
      });

      if (!response.ok) throw new Error('배너 추가에 실패했습니다.');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['banners'],
      }); // 배너 목록 갱신
    },
  });

  /** 배너 삭제 */
  const deleteBanners = useMutation({
    mutationFn: async (bannersToDelete: Banner[]) => {
      if (!session?.accessToken)
        throw new Error('인증이 필요합니다. 다시 로그인해주세요.');

      await Promise.all(
        bannersToDelete.map(async (banner) => {
          // DB에서 삭제
          const response = await fetch(
            API_ROUTES.DELETE_BANNERS(banner.bannerId),
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.accessToken}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error(`삭제 실패: ${banner.postTitle}`);
          }

          // 동작안함 확인필요함 !!
          if (banner.imagePath) {
            await fetch('api/files', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              mode: 'cors',
              body: JSON.stringify({ key: banner.imagePath }), // NCP 파일 경로
            });
          }
        }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['banners'],
      }); // 배너 목록 갱신
    },
  });

  return { createBanner, deleteBanners };
}
