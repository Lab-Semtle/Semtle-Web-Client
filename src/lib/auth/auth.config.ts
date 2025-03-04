/** Next-Auth(Auth.js) 인증 설정 */

import NextAuth, { type Session, type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '../validation/login-schema';
import { API_ROUTES } from '@/constants/ApiRoutes';
import type { JWT } from 'next-auth/jwt';

/**
 * handlers : 프로젝트 인증 관리를 위한 API 라우트(GET, POST 함수) 객체
 * signIn   : 사용자 로그인 수행 비동기 함수
 * signOut  : 사용자 로그아웃 수행 비동기 함수
 * auth     : 세션 정보 반환 비동기 함수
 * unstable_update: update : 세션 정보 갱신 비동기 함수
 */
export const {
  auth, // 서버 컴포넌트 세션 확인
  handlers, // api route 핸들러
  signIn, // 로그인 실행
  signOut, // 로그아웃 실행
  unstable_update: update, // 세션 갱신
} = NextAuth({
  pages: {
    signIn: '/signin', // 로그인 페이지 경로
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
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
          const response = await fetch(API_ROUTES.AUTH_USER_SIGNIN, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ email, password }),
          });

          console.log('[authorize] API 응답 : ', response);
          if (!response.ok) {
            console.error(`[authorize] 로그인 실패: ${response.status}`);
            return null;
          }

          const json = await response.json();
          console.log('[authorize] 로그인 성공:', json);

          const userData = json.data;

          // 세션으로 반환
          return {
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken,
            id: userData.uuid,
            username: userData.username ?? 'unknown',
            profileUrl: userData.profileUrl ?? '/images/default-profile.jpg',
          };
        } catch (error) {
          console.error('[authorize] 로그인 처리 중 예외 발생:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 세션 만료 시간 (24시간)
  },
  callbacks: {
    signIn: async () => {
      return true; // 로그인 성공 시
    },
    // JWT 생성 및 업데이트 시 호출
    // updateSession 서버액션 호출 시, trigger, session 속성 정보 전달
    // trigger : 갱신 이벤트, session : 갱신된 세션 정보
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      // 로그인 시
      if (user) {
        token.accessToken = user.accessToken ?? '';
        token.refreshToken = user.refreshToken ?? '';
        token.id = user.id ?? '';
        token.username = user.username ?? '알수없음';
        token.profileUrl = user.profileUrl ?? '/images/default-profile.jpg';
      }
      // console.log('[auth-jwt 콜백] 토큰 값:', token);
      return token;
    },
    // jwt 콜백이 반환하는 token 받아서 세션이 확인될 때마다 호출
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.id = token.id;
      session.user.name = token.username;
      session.user.image = token.profileUrl;

      // console.log('[auth-session 콜백] 세션 업데이트 됨:', session);
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
