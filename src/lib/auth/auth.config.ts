/** Next-Auth(Auth.js) 인증 설정 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import apiClient from '@/services/apiClient';
import { API_ROUTES } from '@/constants/api';
import { isApiResponseError } from '@/types/api';
import { loginSchema } from '../validation/login-schema';
import { CredentialsSignin } from 'next-auth';

// 로그인 API 요청 타입
interface SigninRequest {
  email: string;
  password: string;
}

// 로그인 API 응답 타입
interface SigninResponse {
  accessToken: string;
  refreshToken: string;
  id: string; // uuid
  username: string;
  role: string;
  manageApprovalStatus: boolean;
  profileImageUrl?: string;
}

/**
 * handlers : 프로젝트 인증 관리를 위한 API 라우트(GET, POST 함수) 객체
 * signIn   : 사용자 로그인 수행 비동기 함수
 * signOut  : 사용자 로그아웃 수행 비동기 함수
 * auth     : 세션 정보 반환 비동기 함수
 * unstable_update: update : 세션 정보 갱신 비동기 함수
 */
export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        console.log('[authorize] Credentials 인증 요청');

        // Zod 비동기 검증 (런타임 에러 방지)
        const validationFields = await loginSchema.safeParseAsync(credentials);
        if (!validationFields.success) return null;

        const { email, password } = validationFields.data;

        try {
          // 로그인 API 요청
          const response = await apiClient.post<SigninResponse, SigninRequest>(
            API_ROUTES.SIGN_IN,
            { body: { email, password } },
          );

          if (
            !response.data ||
            !response.data.accessToken ||
            !response.data.id
          ) {
            throw new Error('로그인 실패: 유효한 응답이 아닙니다.');
          }

          return {
            accessToken: response.data?.accessToken,
            refreshToken: response.data?.refreshToken,
            id: response.data?.id,
            username: response.data?.username,
            role: response.data?.role,
            manageApprovalStatus: response.data?.manageApprovalStatus,
            profileImageUrl:
              response.data?.profileImageUrl ?? '/images/default-profile.png',
          };
        } catch (error) {
          if (isApiResponseError(error)) {
            const statusCode = error.status || 500;
            return Promise.reject(new Error(statusCode.toString()));
          }

          return Promise.reject(new Error('500')); // 기본적으로 500 처리
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 세션 만료 시간 (24시간)
  },
  pages: {
    signIn: '/signin', // 로그인 페이지 경로
  },
  callbacks: {
    signIn: async () => {
      return true; // 로그인 성공 시
    },
    // JWT 생성 및 업데이트 시 호출
    // updateSession 서버액션 호출 시, trigger, session 속성 정보 전달
    // trigger : 갱신 이벤트, session : 갱신된 세션 정보
    jwt: async ({ token, user, trigger, session }) => {
      // 로그인 시
      if (user) {
        console.log('[jwt] 토큰 정보 저장 :');
        Object.assign(token, user);
      }
      // 세션 업데이트 시
      if (trigger === 'update' && session) {
        console.log('[jwt] 세션 업데이트 :', session);
        Object.assign(token, session.user);
      }
      return token;
    },
    // jwt 콜백이 반환하는 token 받아서 세션이 확인될 때마다 호출
    session: async ({ session, token }) => {
      Object.assign(session, token); // 세션 정보와 토큰 병합
      return session;
    },
    // 로그인 이후, 원래 위치한 페이지로 리다이렉트
    // redirect사용 시, signIn(공급자, 옵션) 함수를 호출할 때 redirectTo 옵션 사용 X
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (url) {
        const { search, origin } = new URL(url);
        const callbackUrl = new URLSearchParams(search).get('callbackUrl');
        if (callbackUrl)
          return callbackUrl.startsWith('/')
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl;
        if (origin === baseUrl) return url;
      }
      return baseUrl;
    },
  },
});
