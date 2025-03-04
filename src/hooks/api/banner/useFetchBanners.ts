import { useQuery } from '@tanstack/react-query';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';
import { Banner } from '@/types/banner';

async function fetchBanners(): Promise<Banner[]> {
  console.log('[GET_BANNERS] API 요청');
  const response = await fetch(API_ROUTES.GET_BANNERS, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  });
  console.log('[GET_BANNERS] API 응답 : ', response);
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

  // NCP Object Storage에서 Presigned URL 가져오기
  return await Promise.all(
    bannersData.map(async (banner) => ({
      ...banner,
      altText: banner.altText || '이미지 설명 없음',
      imageUrl: (await fetchNcpPresignedUrl(banner.imagePath)) || undefined, // null → undefined 변환
    })),
  );
}

export function useFetchBanners() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: fetchBanners,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return { banners: data ?? [], loading: isLoading, error };
}
