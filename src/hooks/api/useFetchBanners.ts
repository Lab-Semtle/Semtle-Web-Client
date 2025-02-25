/** Home(Index) 페이지 배너 관련 API Fetch hooks */

import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';

interface Banner {
  bannerId: number;
  imagePath: string;
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

      try {
        const response = await fetch(API_ROUTES.GET_BANNERS, {
          headers: { Accept: 'application/json' },
        });

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
