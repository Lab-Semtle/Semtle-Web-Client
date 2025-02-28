/** Home(Index) 페이지 배너 관련 API Fetch
 * - 배너 목록 조회
 *
 */

import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';

interface Banner {
  bannerId: number;
  imagePath: string; // DB에 저장된 Cloudflare R2 파일 경로 (예: "uploads/banner1.jpg")
  targetPath: string;
  altText?: string;
  postTitle: string;
  createdAt: string;
}

export function useFetchBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBanners() {
      setLoading(true);
      console.log('api 요청 : ', API_ROUTES.GET_BANNERS);
      try {
        const response = await fetch(API_ROUTES.GET_BANNERS, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('배너데이터 api response : ', response);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data.banners)) {
          setBanners(data.banners);
        } else {
          throw new Error('API 응답 형식이 잘못되었습니다.');
        }
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
