import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginSchema } from '../validation/login-schema';
import { API_ROUTES } from '@/constants/ApiRoutes';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@kmou.ac.kr',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validationFields = await loginSchema.safeParseAsync(credentials);
        if (!validationFields.success) {
          return null;
        }
        const { email, password } = validationFields.data;

        try {
          const response = await fetch(API_ROUTES.AUTH_USER_SIGNIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) return null;

          const json = await response.json();
          const userData = json.data;

          return {
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken,
            id: userData.uuid,
            username: userData.username ?? 'unknown',
            profileUrl: userData.profileUrl ?? '/images/default-profile.jpg',
          };
        } catch (error) {
          console.error('[authorize] 로그인 처리 중 오류 발생:', error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.username = user.username;
        token.profileUrl = user.profileUrl;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.id = token.id;
      session.user.name = token.username;
      session.user.image = token.profileUrl;
      return session;
    },
  },
};

export default authOptions;
