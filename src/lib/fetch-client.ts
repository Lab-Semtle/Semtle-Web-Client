/*
 * Fetch API 클라이언트
 * - 공통 API 요청 로직을 캡슐화하여 중복 코드 제거
 * - GET, POST, PUT, PATCH, DELETE 등 다양한 HTTP 메서드 지원
 * - withAuth 옵션을 통해 인증 헤더 자동 추가
 * - 서버 및 클라이언트 환경에서 세션 정보 처리 지원 (서버 액션)
 */

import { auth } from '../util/auth'; // next-auth 라이브러리
//import { getSession } from 'next-auth/react';
import { getSession } from '../util/auth/server';
import {
  type ApiResponseError,
  type ApiResponseWithData,
} from '@/types/api-response';

type FetchOptions<TBody = unknown> = Omit<RequestInit, 'headers' | 'body'> & {
  headers?: Record<string, string>;
  body?: TBody;
  withAuth?: boolean;
  contentType?: string;
};

export class FetchClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // 함수 오버로드로 반환 타입 명확화
  private async request<TResponse, TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseWithData<TResponse>>;

  private async request<TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseWithData<undefined> | null>;

  private async getSession() {
    if (typeof window === 'undefined') {
      return auth();
    }
    return getSession();
  }

  private async request<TResponse = undefined, TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseWithData<TResponse>> {
    const {
      withAuth = false,
      contentType = 'application/json',
      headers,
      body,
      ...restOptions
    } = options;
    const session = withAuth ? await this.getSession() : null;

    // 모든 요청에 대한 헤더 구성
    const allHeaders = new Headers(
      Object.assign(
        {
          'Content-Type': contentType,
        },
        withAuth && session
          ? {
              Authorization: `Bearer ${session.accessToken}`,
            }
          : {},
        headers,
      ),
    );

    // fetch 요청 보내기
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...restOptions,
      headers: allHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    // 204 (No Content)일 경우 null 반환
    if (response.status === 204) return null;

    const responseData = await response.json();

    if (!response.ok) {
      throw responseData as ApiResponseError;
    }

    return responseData as ApiResponseWithData<TResponse>;
  }

  // CRUD 메서드 정의
  public get<TResponse>(url: string, options?: FetchOptions) {
    return this.request<TResponse>(url, { method: 'GET', ...options });
  }

  public post<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    return this.request<TResponse>(url, { method: 'POST', ...options });
  }

  public put<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    return this.request<TResponse>(url, { method: 'PUT', ...options });
  }

  public patch<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    return this.request<TResponse>(url, { method: 'PATCH', ...options });
  }

  public delete<TResponse>(url: string, options?: FetchOptions) {
    return this.request<TResponse>(url, { method: 'DELETE', ...options });
  }
}
