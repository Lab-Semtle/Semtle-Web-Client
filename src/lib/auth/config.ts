/** Next-Auth(Auth.js) 기본 설정 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import apiClient from '@/lib/api/apiClient';

// 사용자 인터페이스
interface SigninInfo {
  email: string; // 로그인 시 필요한 정보
  password: string;
}

// api 응답 타입 정의
interface LoginResponse {
  uuid: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  roles: string[];
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
      // credentials 파라미터 : 서버액션에서 호출한 signIn의 두 번째 인수(사용자 정보)임
      // (반환 -> 로그인 성공 시, callbacks.jwt 의 user 변수로 전달)
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const signinInfo = credentials as unknown as SigninInfo; // 사용자 입력 정보(폼 데이터로 전달받은)

        try {
          const user = await _signIn(signinInfo); // 로그인
          return user;
        } catch (error) {
          throw new Error('로그인 실패:' error);
        }
      },
    }),
  ],
  // session : 세션 관리 방식
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 24시간
  },
  // pages : 로그인 페이지 경로
  pages: {
    signIn: '/signin',
  },
  // callbacks : 인증 및 세션 관리 중 호출되는 핸들러
  callbacks: {
    // signIn : 로그인 성공 시 호출 (반환 -> true: 로그인 성공, false: 로그인 실패)
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
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.username = user.username;
        token.roles = user.roles;
        token.manageApprovalStatus = user.manageApprovalStatus;
        token.profileImageUrl = user.profileImageUrl;
      }
      // 세션 업데이트 시 추가 정보 갱신
      if (trigger === 'update' && session) {
        Object.assign(token, session.user);
        token.profileImage = session.user.profileImage; // 프로필 사진을 변경했을 때 반영!
      }
      return token;
    },
    // session : 바로 위의 jwt 콜백이 반환하는 token 받아서 세션이 확인될 때마다 호출
    // (반환 -> 세션 정보, 각 페이지에서 사용 가능)
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = {
        uuid: token.id,
        username: token.username,
        roles: token.roles,
        manageApprovalStatus: token.manageApprovalStatus,
        profileImageUrl: token.profileImageUrl,
      };
      return session;
    },
  },
});

/** 로그인 처리 */
async function _signIn(body: SigninInfo) {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/signin', {
      body,
    });

    if (!response || !response.accessToken) {
      throw new Error('로그인 실패, 서버 응답이 유효하지 않습니다.');
    }

    return {
      id: response.uuid,
      email: body.email,
      username: response.username,
      roles: response.roles,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      manageApprovalStatus: response.manageApprovalStatus,
      profileImageUrl:
        response.profileImageUrl || '/images/default-profile.png',
    };
  } catch (error) {
    throw new Error(error.message || '로그인 중 문제가 발생했습니다.');
  }
}
