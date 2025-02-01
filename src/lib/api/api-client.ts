/*
 * API Fetch Client URL 설정 - API Client 인스턴스 생성
 */

import { FetchClient } from '@/shared/api/fetchClient';

// 환경 변수로 baseUrl 설정
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_SERVER_URL_PROD
    : process.env.NEXT_PUBLIC_API_SERVER_URL_DEV;

// FetchClient 인스턴스 생성
const apiClient = new FetchClient(baseUrl || '');

export default apiClient;
