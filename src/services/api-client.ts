/** Fetch Client 인스턴스 생성, Base URL 설정 */

import { FetchClient } from '@/services/fetch-client';

// 환경 변수에서 API Base URL 설정
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_API_BASE_URL_DEV;

// FetchClient 인스턴스 생성
const apiClient = new FetchClient(baseUrl || '');

export default apiClient;
