/**
 * API 요청을 위한 FetchClient 클래스
 * - Base URL을 기반으로 API 요청을 수행
 * - GET 요청 → `ApiResponseWithData<TResponse>` 반환 (data 필수)
 * - POST, PATCH, PUT, DELETE 요청 → `ApiResponseWithMessage<TResponse>` 반환 (message 필수, data 선택)
 * - 실패 시 `ApiResponseError` 예외 처리
 */
import {
  type ApiResponseError,
  type ApiResponseWithData,
  type ApiResponseWithMessage,
} from '@/types/api';
import { auth } from '@/lib/auth/auth.config';
import { getSession } from '@/lib/auth/auth.server';

type Params<T = unknown> = {
  [K in keyof T]?: string | number | boolean | null | undefined;
};

type FetchOptions<TBody = unknown, TParams = unknown> = Omit<
  RequestInit,
  'headers' | 'body'
> & {
  headers?: Record<string, string>;
  body?: TBody;
  withAuth?: boolean;
  contentType?: string;
  params?: Params<TParams>;
};

export class FetchClient {
  private baseUrl: string;

  // 생성자
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getSession() {
    if (typeof window == 'undefined') {
      return auth();
    }
    return getSession();
  }

  /**
   * API 요청을 처리하는 메서드
   * - GET 요청: `ApiResponseWithData<TResponse>` 반환
   * - POST, PATCH, PUT, DELETE 요청: `ApiResponseWithMessage<TResponse>` 반환
   * - 실패 시 `ApiResponseError` 반환
   */
  private async request<TResponse, TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<
    ApiResponseWithData<TResponse> | ApiResponseWithMessage<TResponse>
  >;

  // request 오버로드 2 : 실패 응답 처리
  private async request<TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseError>;

  // request 구현부
  private async request<TResponse = undefined, TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<
    | ApiResponseWithData<TResponse>
    | ApiResponseWithMessage<TResponse>
    | ApiResponseError
  > {
    const {
      withAuth = false,
      contentType = 'application/json',
      headers,
      body,
      params,
      ...restOptions
    } = options;
    const session = withAuth ? await getSession() : null;

    // 요청 헤더 설정
    const allHeaders = new Headers(
      Object.assign(
        {
          'Content-Type': contentType,
        },
        withAuth && session
          ? {
              Authorization: `Bearer ${session?.accessToken}`,
            }
          : {},
        headers,
      ),
    );

    // URL 파라미터가 존재할 경우, 쿼리 문자열로 변환하여 추가
    const queryString = params
      ? '?' +
        new URLSearchParams(
          Object.entries(params)
            // 아래 주석 추가 시, eslint 규칙 무시됨.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => value != null) // null/undefined 제거
            .map(([key, value]) => [key, String(value)]),
        ).toString()
      : '';

    // 최종 요청 URL
    const fetchUrl = `${this.baseUrl}${url}${queryString}`;

    // Fetch 요청 실행
    const response = await fetch(fetchUrl, {
      ...restOptions,
      headers: allHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    // No Content(204) 응답 처리 → `message`만 반환
    if (response.status === 204) {
      return {
        status: 204,
        message: 'No Content',
      } as ApiResponseWithMessage<TResponse>;
    }

    // JSON 파싱 실패 시 예외 처리
    const responseData = await response.json().catch(() => {
      throw { status: response.status } as ApiResponseError;
    });

    // HTTP 오류 응답 처리 (400 이상이면 에러 발생)
    if (!response.ok) {
      throw responseData as ApiResponseError;
    }

    // 응답 타입 판별 로직
    if ('data' in responseData && 'message' in responseData) {
      // `data`와 `message`가 모두 존재 (POST, PATCH, PUT, DELETE 요청 가능)
      return responseData as ApiResponseWithMessage<TResponse>;
    } else if ('data' in responseData) {
      // `data`만 존재 (GET 요청)
      return responseData as ApiResponseWithData<TResponse>;
    } else if ('message' in responseData) {
      // `message`만 존재 (POST, PATCH, PUT, DELETE 요청 가능)
      return responseData as ApiResponseWithMessage<TResponse>;
    }

    // 기본 응답 (이상한 응답이 올 경우 대비)
    return responseData as ApiResponseWithMessage<TResponse>;
  }

  // GET 요청
  public get<TResponse>(url: string, options?: FetchOptions) {
    return this.request<TResponse>(url, {
      method: 'GET',
      ...options,
    });
  }

  // POST 요청
  public post<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    return this.request<TResponse>(url, {
      method: 'POST',
      ...options,
    });
  }

  // PUT 요청
  public put<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    return this.request<TResponse>(url, {
      method: 'PUT',
      ...options,
    });
  }

  // PATCH 요청
  public patch<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    return this.request<TResponse>(url, {
      method: 'PATCH',
      ...options,
    });
  }

  // DELETE 요청
  public delete<TResponse, TBody = undefined>(
    url: string,
    options?: FetchOptions<TBody>,
  ) {
    return this.request<TResponse>(url, {
      method: 'DELETE',
      ...options,
    });
  }
}
