// Fetch Client 클래스 구현
import { type ApiResponseError, type ApiResponseWithData } from '@/types/api';

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

  // request 메소드 오버로드 정의 (제네릭 사용)
  private async request<TResponse, TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseWithData<TResponse> | null> {
    const {
      withAuth = false,
      contentType = 'application/json',
      headers,
      body,
      ...restOptions
    } = options;
    const session = withAuth ? await this.getSession() : null;

    // 모든 요청에 대한 헤더 구성
    const allHeaders = new Headers({
      'Content-Type': contentType,
      ...(withAuth && session
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {}),
      ...headers,
    });

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
