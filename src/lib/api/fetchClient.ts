/** Fetch API 클라이언트
 * - API 요청을 추상화하여 GET, POST, PUT, DELETE 등의 요청을 간단하고 타입 안전하게 처리
 */

import {
  type ApiResponseError,
  type ApiResponseWithData,
} from '@/types/apiTypes';
import { getSession } from '@/lib/auth/serverActions/auth';
import { auth } from '@/lib/auth/config'; // 서버사이드에서 사용할 인증 메서드

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

// API 요청을 담당하는 유틸리티 클래스
export class FetchClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // 세션 정보를 가져오는 메서드
  private async getSession() {
    if (typeof window === 'undefined') {
      return auth();
    }
    return getSession();
  }

  /**
  request 메소드 오버로드 정의
  TResponse를 지정하는 경우 리턴 타입은 Promise<ApiResponseWithData<TResponse>>
  TResponse를 지정하지 않는 경우 리턴 타입은 Promise<ApiResponseWithData<undefined> | null>
  */
  // API 응답의 타입을 미리 알 때 사용
  private async request<TResponse, TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseWithData<TResponse>>; // 반환: 응답 데이터를 포함한 타입

  // 반환 데이터가 없을 경우에 사용
  private async request<TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseWithData<undefined> | null>; // 반환: 아무 데이터도 반환 X -> null 반환

  private async request<TResponse = undefined, TBody = unknown>(
    url: string,
    options: FetchOptions<TBody>,
  ): Promise<ApiResponseWithData<TResponse> | null> {
    const {
      withAuth = false, // true인 경우 인증 토큰(Authorization 헤더)을 추가, 기본값은 인증 필요 X 상태
      contentType = 'application/json', // 기본 Content-Type
      headers, // 추가적인 커스텀 헤더
      body, // 요청 본문 데이터
      params = {},
      ...restOptions // 나머지 옵션(메서드 등)
    } = options;

    // 사용자의 액세스 토큰 가져옴
    // withAuth가 true일 때만 세션 정보 가져옴, 즉 인증 필요없는 API라면 세션 정보 안 가져옴
    const session = withAuth ? await getSession() : null;

    // 요청 헤더 구성
    const allHeaders = new Headers(
      Object.assign(
        {
          'Content-Type': contentType,
        },
        withAuth && session
          ? {
              Authorization: `Bearer ${session.accessToken}`,
            }
          : {}, // withAuth가 true인 경우 액세스 토큰을 헤더에 추가
        headers,
      ),
    );

    const fetchUrl = `${this.baseUrl}${url}${
      Object.keys(params).length > 0
        ? '?' +
          new URLSearchParams(
            Object.entries(params)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .filter(([_, value]) => value != null)
              .map(([key, value]) => [key, String(value)]),
          ).toString()
        : ''
    }`;

    const response = await fetch(fetchUrl, {
      ...restOptions, // GET, POST 등 요청 메서드
      headers: allHeaders, // 구성된 헤더
      body: body ? JSON.stringify(body) : undefined, // 본문 데이터가 있으면 JSON으로 직렬화하여 추가
    });

    console.log('[FetchClient] API 응답 상태코드:', response.status);

    // 204 응답은 본문이 없으므로 null을 반환
    if (response.status === 204) {
      console.log('[FetchClient] 응답 없음 (204)');
      return null; // No content
    }

    // 응답 데이터를 JSON으로 파싱
    const responseData = await response.json();
    console.log('[FetchClient] 응답 데이터:', responseData);

    // 응답이 정상적이지 않으면 (예: 400, 401, 500 등) 에러를 발생
    if (!response.ok) {
      console.error('[FetchClient] API 요청 실패:', responseData);
      throw responseData as ApiResponseError;
    }
    // 응답이 정상적이면 JSON 데이터를 반환
    return responseData as ApiResponseWithData<TResponse>;
  }

  // HTTP 메서드 별 메서드 정의
  // TResponse :  서버에서 반환될 데이터의 타입 (예: Post[])
  public get<TResponse>(url: string, options?: FetchOptions) {
    console.log('[FetchClient] GET 요청:', url);
    return this.request<TResponse>(url, { method: 'GET', ...options });
  }

  // TResponse, TBody : 응답의 타입, 요청 본문의 타입 (예: ApiResponseWithData<Post>, Post)
  public post<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    console.log('[FetchClient] POST 요청:', url);
    return this.request<TResponse>(url, { method: 'POST', ...options });
  }

  // TResponse, TBody : 응답의 타입, 요청 본문의 타입
  public put<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    console.log('[FetchClient] PUT 요청:', url);
    return this.request<TResponse>(url, { method: 'PUT', ...options });
  }

  // TResponse, TBody : 응답의 타입, 요청 본문의 타입
  public patch<TResponse, TBody>(url: string, options?: FetchOptions<TBody>) {
    console.log('[FetchClient] PATCH 요청:', url);
    return this.request<TResponse>(url, { method: 'PATCH', ...options });
  }

  // TResponse : 서버에서 반환할 응답의 타입
  public delete<TResponse>(url: string, options?: FetchOptions) {
    console.log('[FetchClient] DELETE 요청:', url);
    return this.request<TResponse>(url, { method: 'DELETE', ...options });
  }
}

// 사용 예시
// const response = await apiClient.post<
//   {accessToken: string}, // Response 타입
//   {refreshToken: string} // body 타입 (get과 delete 메소드에서는 작성할 필요 없음)
// >('/auth/refresh', {
//   body: {refreshToken: token.refreshToken},
//   withAuth: true, // 인증이 필요한 API 요청일 경우 추가
// });
