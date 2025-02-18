/** Next-Auth(Auth.js) 기본 설정 */

import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import apiClient from '@/lib/api/apiClient';

// 로그인 요청 타입
interface SigninRequest {
  email: string;
  password: string;
}

// API 응답 타입 정의
interface SigninResponse {
  uuid: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  roles: string[];
  manageApprovalStatus: boolean;
  profileImageUrl?: string;
}

// NextAuth User 인터페이스 확장
interface AuthUser extends User {
  id: string;
  email: string;
  username: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
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
      // credentials 파라미터 : 서버액션에서 호출한 signIn의 두 번째 인수(사용자 정보)
      // (로그인 성공 시 callbacks.jwt 의 user 변수로 전달)
      authorize: async (credentials, req): Promise<AuthUser | null> => {
        const signinInfo = credentials as unknown as SigninRequest; // 사용자 입력 정보(폼 데이터로 전달받은)
        console.log('🚀 [authorize] Credentials 인증 요청', signinInfo);

        try {
          const user = await _signIn(signinInfo);
          return user;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(
              JSON.stringify({
                message: error.message || '로그인 실패',
                code: 'AUTH_ERROR',
              }),
            );
          }
          throw new Error(
            JSON.stringify({
              message: '알 수 없는 오류가 발생했습니다.',
              code: 'UNKNOWN_ERROR',
            }),
          );
        }
      },
    }),
  ],
  // session : 세션 관리 방식
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 세션 만료 시간 (24시간)
  },
  // pages : 로그인 페이지 경로
  pages: {
    signIn: '/signin',
  },
  // callbacks : 인증 및 세션 관리 중 호출되는 핸들러
  callbacks: {
    // signIn : 로그인 시도 시 호출
    // - 특정 사용자 차단, 로그 저장, 체크
    // - true: 로그인 성공, false: 로그인 실패
    signIn: async () => {
      return true;
    },
    // redirect : 로그인 성공 시, 리다이렉트 될 경로 지정
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
    // JWT : 생성 및 업데이트 시 호출 (반환 -> 암호화되어 쿠키에 저장)
    // updateSession 서버액션 호출 시, trigger, session 속성 정보가 전달됨.
    // trigger : 갱신 이벤트, session : 갱신된 세션 정보
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        console.log('✅ [jwt] 토큰 저장:', user);
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.roles = user.roles;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.manageApprovalStatus = user.manageApprovalStatus;
        token.profileImageUrl = user.profileImageUrl;
      }

      // 세션 업데이트 시 추가 정보 갱신
      if (trigger === 'update' && session) {
        console.log('🔄 [jwt] 세션 업데이트:', session);
        Object.assign(token, session.user);
      }
      return token;
    },

    // session : 바로 위의 jwt 콜백이 반환하는 token 받아서 세션이 확인될 때마다 호출
    // (반환 -> 세션 정보, 각 페이지에서 사용 가능)
    session: async ({ session, token }) => {
      console.log('[session] 세션 데이터 반환:', session);
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user = {
        ...session.user, // 기본 AdapterUser 필드?
        id: token.id as string, // uuid
        email: token.email as string,
        emailVerified: null,
        username: token.username as string,
        role: (token.roles as string[])[0],
        profileImageUrl: token.profileImageUrl as string | undefined,
        manageApprovalStatus: token.manageApprovalStatus as boolean,
      };
      return session;
    },
  },
});

/** 로그인 처리 */
async function _signIn(body: {
  email: string;
  password: string;
}): Promise<AuthUser> {
  console.log(`🚀 [_signIn] API 요청`, body);

  try {
    const res = await apiClient.post<SigninResponse, SigninRequest>(
      '/auth/signin',
      {
        body,
      },
    );

    // 응답이 유효한지 검증
    if (!res || !res.data || !res.data.accessToken || !res.data.uuid) {
      throw new Error('로그인 실패, 서버 응답이 유효하지 않습니다.');
    }

    return {
      id: res.data.uuid, // uuid
      email: body.email,
      username: res.data.username,
      roles: res.data.roles,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      manageApprovalStatus: res.data.manageApprovalStatus,
      profileImageUrl:
        res.data.profileImageUrl || '/images/default-profile.png',
    };
  } catch (error) {
    console.error(`❌ 로그인 실패:`, error);

    // ✅ 해결 코드 적용
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('로그인 중 문제가 발생했습니다.');
  }
}
