// Fetch Client를 초기화
import { FetchClient } from '@/lib/api-fetch-client';

// 환경 변수로 baseUrl 설정
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_API_BASE_URL_DEV;

// FetchClient 인스턴스 생성
const apiClient = new FetchClient(baseUrl || '');

export default apiClient;
