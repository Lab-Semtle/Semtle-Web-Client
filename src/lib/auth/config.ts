/** Next-Auth 설정 파일
 * [ 호출 순서 ]
 * 로그인(회원가입) : signIn - redirect - jwt - session
 * 세션 업데이트 : jwt - session
 * 세션 확인 : session
 */
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import apiClient from '@/lib/api/api-client';
import {
  LoginRequestBody,
  LoginResponse,
  RefreshTokenResponse,
  isApiResponseError,
} from '@/types/api';
import { loginSchema } from '@/lib/validation/login-schema';
import { User } from 'next-auth';
import { CredentialsSignin } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { AdapterUser } from 'next-auth/adapters';

const ACCESS_TOKEN_EXPIRES_IN: number = parseInt(
  process.env.ACCESS_TOKEN_EXPIRES_IN || '3600',
);

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials', // 이 프로바이더의 이름을 'credentials'로 지정 (프론트에서 signIn 호출 시 사용됨)
      credentials: {
        email: { label: 'Email', type: 'email' }, // 사용자로부터 입력받을 이메일 필드
        password: { label: 'Password', type: 'password' }, // 사용자로부터 입력받을 비밀번호 필드
      },
      // 로그인 유효성 검증 로직
      authorize: async (credentials) => {
        console.log('[config] 전달된 credentials:', credentials);

        const validationFields = await loginSchema.safeParseAsync(credentials);

        // 입력값 검증 실패 시 null 반환 → 로그인 실패로 간주됨
        if (!validationFields.success) {
          return null;
        }

        // 검증에 성공하면 유효한 email과 password를 추출
        const { email, password } = validationFields.data;

        try {
          // 로그인 요청을 서버로 보냄 (apiClient는 HTTP 요청을 담당하는 유틸리티)
          const response = await apiClient.post<
            LoginResponse,
            LoginRequestBody
          >(
            '/auth/signin', // 서버의 로그인 엔드포인트
            { body: { email, password } }, // 요청 본문에 이메일과 비밀번호를 포함
          );

          console.log('[config] API 응답:', response);

          // 서버로부터 로그인 성공 응답을 받은 경우 유저 데이터를 반환 (인증 성공)
          const { accessToken, refreshToken, user } = response.data;
          console.log('[config] 로그인 성공 - 반환된 유저 데이터:', user);

          // 응답에서 유저 정보와 토큰을 가져와 User 객체로 변환
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            accessToken,
            refreshToken,
            profileImageUrl:
              user.profileImageUrl ?? 'https://example.com/default-profile.png',
          } as User;
        } catch (error) {
          console.error('[config] API 요청 에러:', error);
          // 에러가 발생한 경우 이를 처리함
          const credentialsSignin = new CredentialsSignin();

          // API 응답 에러인지 확인 (예: 비밀번호 틀림, 유저가 없음 등)
          if (isApiResponseError(error) && error.status === 401) {
            credentialsSignin.code = error.code; // 에러 코드 저장 (401 Unauthorized 등)
            credentialsSignin.message = error.message; // 에러 메시지 저장
          }
          // 에러를 NextAuth에 전달하여 로그인 실패로 처리 (프론트에 전달)
          throw credentialsSignin;
        }
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
    // signIn : 로그인할 때 호출, 로그인 할 수 있는지 여부를 제어
    // async signIn({ user }) {
    //   ...
    // },
    // redirect : 사용자가 리디렉션될 때마다 호출 (로그인/로그아웃)
    // 아래는 특정 URL 경로에서 로그인하면, 해당 위치로 그대로 리다이렉트하는 로직
    async redirect({ url, baseUrl }) {
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
    // jwt : jwt가 생성되거나 업데이트될 때 호출
    // jwt는 암호화되어 쿠키에 저장됨, DB 사용하는 세션에서는 호출 X
    async jwt({ token, user }) {
      console.log('[config] JWT 콜백 - 기존 토큰:', token);

      if (user) {
        console.log('[config] JWT 콜백 - 로그인 성공한 유저 정보:', user);
        token.id = user.id ?? '';
        token.email = user.email ?? '';
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.profileImageUrl = user.profileImageUrl;
        token.accessTokenExpires = Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000;
      }

      // 만료되지 않은 accessToken이 있으면 그대로 사용
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // accessToken이 만료되었을 경우 새로 갱신
      return await refreshAccessToken(token);
    },
    // 클라이언트에서 세션 정보 요청할 때 호출, 보안을 위해 일부정보만 반환
    // jwt 콜백 호출 후 session 콜백 호출됨 -> jwt에 추가한 정보는 session에서 바로 사용가능
    async session({ session, token }) {
      console.log('[config] Session 콜백 - JWT 토큰으로부터 세션 생성:', token);
      session.user = {
        id: token.id as string,
        email: token.email as string,
        role: token.role,
        profileImageUrl: token.profileImageUrl ?? 'https://default-profile.png',
      } as AdapterUser;

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
});

// 만료된 accessToken을 갱신
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await apiClient.post<
      RefreshTokenResponse,
      { refreshToken: string }
    >('/auth/refresh-token', { body: { refreshToken: token.refreshToken } });

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error('Access token refresh failed', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

async function checkAccountStatus(email: string): Promise<boolean> {
  try {
    const response = await apiClient.post<
      { status: string },
      { email: string }
    >(
      '/check-status', // 엔드포인트 경로 (예제)
      {
        body: { email }, // POST 요청에 필요한 body 데이터
      },
    );

    return response.data.status === 'active'; // 상태가 'active'인 경우만 허용
  } catch (error) {
    console.error('Error checking account status:', error);
    return false; // 요청 실패 시 비활성으로 간주
  }
}
