import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchPresignedUrl } from './useFetchPresignedUrls';

interface Banner {
  bannerId: number;
  imagePath: string;
  targetPath: string;
  altText?: string;
  postTitle: string;
  createdAt: string;
  imageUrl?: string;
}

export function useFetchBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBanners() {
      setLoading(true);
      try {
        console.log('[GET_BANNERS] API 요청');
        const response = await fetch(API_ROUTES.GET_BANNERS, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('[GET_BANNERS] API 응답 데이터:', responseData);

        if (!responseData.success) {
          throw new Error(`API 요청 실패: ${responseData.message}`);
        }

        if (!Array.isArray(responseData.data?.banners)) {
          console.error('API 응답 형식이 올바르지 않음:', responseData);
          throw new Error('API 응답 형식이 올바르지 않습니다.');
        }

        const bannersData: Banner[] = responseData.data.banners;

        if (bannersData.length === 0) {
          console.warn('bannersData가 빈 배열입니다.');
        }

        // Cloudflare R2에서 Presigned URL 가져오기 (공통 함수 활용)
        const updatedBanners = await Promise.all(
          bannersData.map(async (banner: Banner) => ({
            ...banner,
            imageUrl: await fetchPresignedUrl(banner.imagePath),
          })),
        );

        setBanners(updatedBanners);
      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchBanners();
  }, []);

  return { banners, loading, error };
}
