/** Next-Auth(Auth.js) 인증 설정 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '../validation/login-schema';
// import { fetchSignIn } from '@/services/api/auth.signin';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_API_BASE_URL_DEV;

/**
 * handlers : 프로젝트 인증 관리를 위한 API 라우트(GET, POST 함수) 객체
 * signIn   : 사용자 로그인 수행 비동기 함수
 * signOut  : 사용자 로그아웃 수행 비동기 함수
 * auth     : 세션 정보 반환 비동기 함수
 * unstable_update: update : 세션 정보 갱신 비동기 함수
 */
export const {
  auth,
  handlers,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        console.log('[authorize] Credentials 인증 요청');

        // Zod 비동기 검증 (런타임 에러 방지)
        const validationFields = await loginSchema.safeParseAsync(credentials);
        if (!validationFields.success) {
          console.error(
            '[authorize] 유효성 검사 실패:',
            validationFields.error,
          );
          return null;
        }
        const { email, password } = validationFields.data;

        try {
          if (!API_BASE_URL) {
            console.error('[authorize] API_BASE_URL이 설정되지 않았습니다.');
            throw new Error('API_BASE_URL is not defined.');
          }

          console.log('[authorize] 현재 API_BASE_URL:', API_BASE_URL);
          const SIGN_IN_URL = `${API_BASE_URL}/auth/signin`;

          // 백엔드 로그인 API 호출
          const response = await fetch(SIGN_IN_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          console.log('[authorize] 로그인 API 응답 :', response);

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData?.message || `HTTP Error ${response.status}`,
            );
          }

          const responseData = await response.json();
          console.log('[authorize] 로그인 성공:', responseData);

          return {
            accessToken: responseData.accessToken,
            refreshToken: responseData.refreshToken,
            id: responseData.id,
            username: responseData.username,
            role: responseData.role,
            manageApprovalStatus: responseData.manageApprovalStatus,
            profileImageUrl:
              responseData.profileImageUrl ?? '/images/default-profile.png',
          };
        } catch (error) {
          // if (isApiResponseError(error)) {
          //   const statusCode = error.status || 500;
          //   return Promise.reject(new Error(statusCode.toString()));
          // }
          console.error('[authorize] 로그인 처리 중 예외 발생:', error);
          return Promise.reject(new Error('401')); // 인증 실패 처리
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
  },
});

// redirect: async ({ url, baseUrl }) => {
//   if (url.startsWith('/')) return `${baseUrl}${url}`;
//   if (url) {
//     const { search, origin } = new URL(url);
//     const callbackUrl = new URLSearchParams(search).get('callbackUrl');
//     if (callbackUrl)
//       return callbackUrl.startsWith('/')
//         ? `${baseUrl}${callbackUrl}`
//         : callbackUrl;
//     if (origin === baseUrl) return url;
//   }
//   return baseUrl;
// },
