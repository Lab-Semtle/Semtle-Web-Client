/** Fetch API 클라이언트
 * - API 요청을 추상화하여 GET, POST, PUT, DELETE 등의 요청을 간단하고 타입 안전하게 처리
 * - 인증 토큰을 자동으로 주입하여 반복 코드 제거
 */
import { getSession } from '@/serverActions/auth'; // 서버에서 세션 가져오기
import { ApiResponseError, ApiResponseWithData } from './type';

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

  private async getSession() {
    // 서버 측에서는 auth(), 클라이언트에서는 getSession() 호출
    if (typeof window === 'undefined') {
      const { auth } = await import('@/shared/util/auth'); // dynamic import for server-side
      return auth();
    }
    const { getSession } = await import('next-auth/react'); // for client-side
    return getSession();
  }

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

    const allHeaders = new Headers({
      'Content-Type': contentType,
      ...(withAuth && session
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {}),
      ...headers,
    });

    const response = await fetch(`${this.baseUrl}${url}`, {
      ...restOptions,
      headers: allHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 204) {
      return null;
    }

    const responseData = await response.json();
    if (!response.ok) {
      throw responseData as ApiResponseError;
    }
    return responseData as ApiResponseWithData<TResponse>;
  }

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
