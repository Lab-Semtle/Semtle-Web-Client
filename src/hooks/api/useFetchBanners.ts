import { useEffect, useState } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';

interface Banner {
  bannerId: number;
  imagePath: string; // DB에 저장된 Cloudflare R2 파일 경로
  targetPath: string;
  altText?: string;
  postTitle: string;
  createdAt: string;
  imageUrl?: string; // Presigned URL 저장할 필드
}

export function useFetchBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBanners() {
      setLoading(true);
      try {
        console.log('🚀 API 호출 시작: ', API_ROUTES.GET_BANNERS);
        const response = await fetch(API_ROUTES.GET_BANNERS, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
        });

        console.log('🔄 API 응답 수신:', response);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('✅ API 응답 데이터:', responseData);

        if (!responseData.success) {
          throw new Error(`❌ API 요청 실패: ${responseData.message}`);
        }

        console.log('📌 API 응답 데이터 구조 확인:', responseData);

        if (!Array.isArray(responseData.data?.banners)) {
          console.error('❌ API 응답 형식이 올바르지 않음:', responseData);
          throw new Error('API 응답 형식이 올바르지 않습니다.');
        }

        const bannersData: Banner[] = responseData.data.banners;
        console.log('📌 bannersData:', bannersData);

        console.log('🔍 bannersData 배열 길이:', bannersData.length);
        if (bannersData.length === 0) {
          console.error('❌ bannersData가 빈 배열입니다.');
        }

        // 🚀 Cloudflare R2에서 Presigned URL 가져오기 (기존 방식 개선)
        const updatedBanners = await Promise.all(
          bannersData.map(async (banner: Banner) => {
            console.log(`📡 Presigned URL 요청: ${banner.imagePath}`);

            try {
              const fileUrlRes = await fetch('/api/files', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: banner.imagePath }),
              });
              console.log(
                `✅ fetch 응답 수신 (${banner.imagePath}):`,
                fileUrlRes,
              );
              if (!fileUrlRes.ok) {
                throw new Error(`❌ 요청 실패: ${fileUrlRes.status}`);
              }

              const fileData = await fileUrlRes.json();
              console.log(
                `🔗 Presigned URL 응답 (${banner.imagePath}):`,
                fileData,
              );

              return {
                ...banner,
                imageUrl: fileData.signedUrl ?? '/images/kmou_2022.jpg',
              };
            } catch (error) {
              console.error('Persigned URL 가져오기 실패: ', error);
              return {
                ...banner,
                imageUrl: '/images/kmou_2022.jpg',
              };
            }
          }),
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
