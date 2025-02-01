/** Next-Auth 설정 파일
 * [ 호출 순서 ]
 * 로그인(회원가입) : signIn - redirect - jwt - session
 * 세션 업데이트 : jwt - session
 * 세션 확인 : session
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginApi } from '@/services/auth';

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update, // unstable_update는 Beta 버전 update로 변경될 수 있음.
} = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials ?? {};

        if (!email || !password) throw new Error('잘못된 자격 증명');

        // 로그인 API 호출
        const response = await loginApi(email, password);
        const userData = response.data.user; // 서버에서 반환된 유저 데이터

        if (!response.data.success) {
          throw new Error(response.data.message || '로그인 실패');
        }

        // 반환할 사용자 정보, 세션 관리 및 JWT 생성 시 필수로 사용됨.
        return {
          id: userData.uuid, // 식별자
          name: userData.name, // 이름
          email: userData.email, // 이메일
          role: userData.role, // 유저 권한
          profileImageUrl: userData.profile_image_url || '', // 자주변경X, 네비바에 아바타로 표시함 (세션에 저장)
          accessToken: userData.accessToken, // JWT 인증 방식 사용시, 세션에 포함시켜 프론트가 관리
        };
      },
    }),
  ],
  // 세션 관리 방식 지정
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 세션 만료 시간: 24시간
  },
  // 로그인 페이지 경로 지정
  pages: {
    signIn: '/auth/signin', // 기본값: '/auth/signin'
  },
  // 인증 및 세션 관리 중 호출되는 핸들러
  callbacks: {
    // 로그인 시도 후 호출, true 반환(로그인 성공), false 반환(로그인 실패)
    signIn: async () => {
      return true;
    },
    // 페이지 이동 시 호츨, 리다이렉션될 URL 반환
    // 특정 URL 경로에서 로그인하면, 해당 위치로 그대로 리다이렉트
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
    // JWT 토큰 생성 및 업데이트 될 때 호출
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id || '';
        token.email = user.email || '';
        token.role = user.role || 'user';
        token.accessToken = user.accessToken || '';
        token.profileImageUrl = user.profileImageUrl || '/default-profile.png';
      }
      return token;
    },

    // JWT 콜백이 반환하는 token을 받아, 세션 확인할 때마다 호출, 반환 값은 클라이언트에서 확인 가능
    session: async ({ session, token }) => {
      session.user = {
        id: token.id ?? '',
        email: token.email ?? '',
        role: token.role ?? 'user',
        profileImageUrl: '/default-profile.png',
      };
      session.accessToken = token.accessToken ?? '';
      return session;
    },
  },
});
