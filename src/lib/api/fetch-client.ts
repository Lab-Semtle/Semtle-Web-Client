/** Fetch API 클라이언트
 * - API 요청을 추상화하여 GET, POST, PUT, DELETE 등의 요청을 간단하고 타입 안전하게 처리
 */
import { type ApiResponseError, type ApiResponseWithData } from '@/types/api';
import { getSession } from '@/lib/auth/server-action';
import { auth } from '@/lib/auth/config'; // 서버사이드에서 사용할 인증 메서드

type FetchOptions<TBody = unknown> = Omit<RequestInit, 'headers' | 'body'> & {
  headers?: Record<string, string>;
  body?: TBody;
  withAuth?: boolean;
  contentType?: string;
};

// API 요청을 담당하는 유틸리티 클래스
export class FetchClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // 세션 정보를 가져오는 메서드
  private async getSession() {
    // 서버사이드 환경에서는 auth() 메서드를 호출하여 세션 정보를 가져옴
    if (typeof window === 'undefined') {
      return auth();
    }
    // 클라이언트사이드 환경에서는 next-auth의 getSession() 메서드를 호출하여 세션 정보를 가져옴
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
    options: FetchOptions<TBody> = {},
  ): Promise<ApiResponseWithData<TResponse> | null> {
    const {
      withAuth = false, // true인 경우 인증 토큰(Authorization 헤더)을 추가, 기본값은 인증 필요 X 상태
      contentType = 'application/json', // 기본 Content-Type
      headers, // 추가적인 커스텀 헤더
      body, // 요청 본문 데이터
      ...restOptions // 나머지 옵션(메서드 등)
    } = options;

    // 사용자의 액세스 토큰 가져옴
    // withAuth가 true일 때만 세션 정보 가져옴, 즉 인증 필요없는 API라면 세션 정보 안 가져옴
    const session = withAuth ? await this.getSession() : null;

    // 요청 헤더 구성
    const allHeaders = new Headers(
      Object.assign(
        { 'Content-Type': contentType }, // JSON, 기본 Content-Type 설정
        withAuth && session
          ? { Authorization: `Bearer ${session?.accessToken}` }
          : {}, // withAuth가 true인 경우 액세스 토큰을 헤더에 추가
        headers,
      ),
    );

    // Fetch API를 사용하여 요청을 전송
    // 요청 본문이 있는 경우 JSON으로 변환하여 전송
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...restOptions, // GET, POST 등 요청 메서드
      headers: allHeaders, // 구성된 헤더
      body: body ? JSON.stringify(body) : undefined, // 본문 데이터가 있으면 JSON으로 직렬화하여 추가
    });

    // 응답 처리
    // 204 응답은 본문이 없으므로 null을 반환
    if (response.status === 204) {
      return null; // No content
    }

    // 응답 데이터를 JSON으로 파싱
    const responseData = await response.json();

    // 응답이 정상적이지 않으면 (예: 400, 401, 500 등) 에러를 발생
    if (!response.ok) {
      throw responseData as ApiResponseError;
    }
    // 응답이 정상적이면 JSON 데이터를 반환
    return responseData as ApiResponseWithData<TResponse>;
  }

  // HTTP 메서드 별 메서드 정의
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
