import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginApi } from '@/services/authAPI';

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update, // Beta 버전
} = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials;

        // 로그인 API 호출
        const response = await loginApi(email, password);
        const userData = response.data.user; // 서버에서 반환된 유저 데이터

        if (!response.data.success) {
          throw new Error(response.data.message || '로그인 실패');
        }

        // 성공 시 필요한 유저 정보 반환 (JWT에 저장됨)
        return {
          id: userData.uuid,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          accessToken: userData.accessToken, // 필요시 토큰 저장
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 세션 만료 시간 (24시간)
  },
  pages: {
    signIn: '/auth/signin', // 기본값: '/auth/signin'
  },
  callbacks: {
    // 로그인 시도 후 호출
    signIn: async () => {
      return true;
    },
    // JWT 토큰 생성/ 업데이트 될 때 호출
    jwt: async ({ token, user }) => {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    // 세션 확인할 때 호출
    session: async ({ session, token }) => {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    // 로그인 후 리다이렉션
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
});
