// /** Next-Auth 설정 파일
//  * [ 호출 순서 ]
//  * 로그인(회원가입) : signIn - redirect - jwt - session
//  * 세션 업데이트 : jwt - session
//  * 세션 확인 : session
//  */
// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// import apiClient from '@/lib/api/apiClient';
// import { isApiResponseError } from '@/types/apiTypes';
// import { LoginRequestBody, LoginResponse } from '@/types/loginTypes';
// import { loginSchema } from '@/lib/validation/login-schema';
// import { User } from 'next-auth';
// import { CredentialsSignin } from 'next-auth';
// import { JWT } from 'next-auth/jwt';
// import { AdapterUser } from 'next-auth/adapters';

// const ACCESS_TOKEN_EXPIRES_IN: number = parseInt(
//   process.env.ACCESS_TOKEN_EXPIRES_IN || '3600',
// );

// export const {
//   handlers,
//   signIn,
//   signOut,
//   auth,
//   unstable_update: update,
// } = NextAuth({
//   providers: [
//     Credentials({
//       name: 'Credentials', // 이 프로바이더의 이름을 'credentials'로 지정 (프론트에서 signIn 호출 시 사용됨)
//       credentials: {
//         email: { label: 'Email', type: 'email' }, // 사용자로부터 입력받을 이메일 필드
//         password: { label: 'Password', type: 'password' }, // 사용자로부터 입력받을 비밀번호 필드
//       },
//       // 로그인 유효성 검증 로직
//       authorize: async (credentials) => {
//         console.log('[authorize] 전달된 로그인 데이터:', credentials);

//         // 입력값 검증
//         const validationFields = await loginSchema.safeParseAsync(credentials);
//         if (!validationFields.success) {
//           console.error('[authorize] 입력 검증 실패:', validationFields.error);
//           return null;
//         }

//         // 검증에 성공하면 유효한 email과 password를 추출
//         const { email, password } = validationFields.data;
//         console.log('[authorize] 검증된 입력값:', { email, password });

//         // 계정 활성화 상태 확인
//         const isActive = await checkAccountStatus(email);
//         if (!isActive) {
//           console.error('[authorize] 계정이 비활성화되었습니다.');
//           throw new Error('계정이 비활성화되어 있습니다.');
//         }

//         // 로그인 시도
//         try {
//           const response = await apiClient.post<
//             LoginResponse,
//             LoginRequestBody
//           >(
//             '/auth/signin', // 서버의 로그인 엔드포인트
//             { body: { email, password } }, // 요청 본문에 이메일과 비밀번호를 포함
//           );
//           console.log('[authorize] API 응답:', response);

//           if (!response.data) {
//             throw new Error('로그인 응답이 유효하지 않습니다.');
//           }

//           // 서버로부터 로그인 성공 응답을 받은 경우 유저 데이터를 반환 (인증 성공)
//           const { accessToken, refreshToken, user } = response.data;
//           console.log('[authorize] 로그인 성공 - 유저 데이터:', user);

//           // 응답에서 유저 정보와 토큰을 가져와 User 객체로 변환
//           return {
//             id: user.id,
//             email: user.email,
//             role: user.role,
//             accessToken,
//             refreshToken,
//             profileImageUrl:
//               user.profileImageUrl ?? 'https://example.com/default-profile.png',
//           } as User;
//         } catch (error) {
//           console.error('[authorize] 로그인 에러 발생:', error);
//           // 에러가 발생한 경우 이를 처리함
//           const credentialsSignin = new CredentialsSignin();

//           // API 응답 에러인지 확인 (예: 비밀번호 틀림, 유저가 없음 등)
//           if (isApiResponseError(error) && error.status === 401) {
//             credentialsSignin.code = error.code; // 에러 코드 저장 (401 Unauthorized 등)
//             credentialsSignin.message = error.message; // 에러 메시지 저장
//           }
//           // 에러를 NextAuth에 전달하여 로그인 실패로 처리 (프론트에 전달)
//           throw credentialsSignin;
//         }
//       },
//     }),
//   ],
//   // 세션 관리 방식 지정
//   session: {
//     strategy: 'jwt',
//     maxAge: 60 * 60 * 24, // 세션 만료 시간: 24시간
//   },
//   // 로그인 페이지 경로 지정
//   pages: {
//     signIn: '/auth/signin', // 기본값: '/auth/signin'
//   },
//   // 인증 및 세션 관리 중 호출되는 핸들러
//   callbacks: {
//     // signIn : 로그인할 때 호출, 로그인 할 수 있는지 여부를 제어
//     // async signIn({ user }) {
//     //   ...
//     // },
//     // redirect : 사용자가 리디렉션될 때마다 호출 (로그인/로그아웃)
//     // 아래는 특정 URL 경로에서 로그인하면, 해당 위치로 그대로 리다이렉트하는 로직
//     async redirect({ url, baseUrl }) {
//       if (url.startsWith('/')) return `${baseUrl}${url}`;
//       if (url) {
//         const { search, origin } = new URL(url);
//         const callbackUrl = new URLSearchParams(search).get('callbackUrl');
//         if (callbackUrl)
//           return callbackUrl.startsWith('/')
//             ? `${baseUrl}${callbackUrl}`
//             : callbackUrl;
//         if (origin === baseUrl) return url;
//       }
//       return baseUrl;
//     },
//     // jwt : jwt가 생성되거나 업데이트될 때 호출
//     // jwt는 암호화되어 쿠키에 저장됨, DB 사용하는 세션에서는 호출 X
//     async jwt({ token, user }) {
//       console.log('[config] JWT 콜백 - 기존 토큰:', token);

//       if (user) {
//         console.log('[config] JWT 콜백 - 로그인 성공한 유저 정보:', user);
//         token.id = user.id ?? '';
//         token.email = user.email ?? '';
//         token.role = user.role;
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//         token.profileImageUrl = user.profileImageUrl;
//         token.accessTokenExpires = Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000;
//       }

//       // 만료되지 않은 accessToken이 있으면 그대로 사용
//       if (Date.now() < token.accessTokenExpires) {
//         return token;
//       }

//       // accessToken이 만료되었을 경우 새로 갱신
//       return await refreshAccessToken(token);
//     },
//     // 클라이언트에서 세션 정보 요청할 때 호출, 보안을 위해 일부정보만 반환
//     // jwt 콜백 호출 후 session 콜백 호출됨 -> jwt에 추가한 정보는 session에서 바로 사용가능
//     async session({ session, token }) {
//       console.log('[config] Session 콜백 - JWT 토큰으로부터 세션 생성:', token);
//       session.user = {
//         id: token.id as string,
//         email: token.email as string,
//         role: token.role,
//         profileImageUrl: token.profileImageUrl ?? 'https://default-profile.png',
//         name: token.name ?? undefined,
//       } as AdapterUser & {
//         id: string;
//         email: string;
//         role: 'admin' | 'user' | 'guest';
//         profileImageUrl?: string;
//         name?: string;
//       };

//       session.accessToken = token.accessToken;
//       session.refreshToken = token.refreshToken;
//       return session;
//     },
//   },
// });

// // 만료된 accessToken을 갱신
// async function refreshAccessToken(token: JWT): Promise<JWT> {
//   try {
//     const response = await apiClient.post<
//       RefreshTokenResponse,
//       { refreshToken: string }
//     >('/auth/refresh-token', { body: { refreshToken: token.refreshToken } });

//     const refreshedTokens = response.data;

//     return {
//       ...token,
//       accessToken: refreshedTokens.accessToken,
//       accessTokenExpires: Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000,
//       refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
//     };
//   } catch (error) {
//     console.error('Access token refresh failed', error);
//     return {
//       ...token,
//       error: 'RefreshAccessTokenError',
//     };
//   }
// }

// // 계정 활성 여부 확인
// async function checkAccountStatus(email: string): Promise<boolean> {
//   try {
//     const response = await apiClient.post<
//       { status: string },
//       { email: string }
//     >(
//       '/check-status', // 엔드포인트 경로 (예제)
//       {
//         body: { email },
//       },
//     );

//     return response.data.status === 'active'; // 상태가 'active'인 경우만 허용
//   } catch (error) {
//     console.error('Error checking account status:', error);
//     return false; // 요청 실패 시 비활성으로 간주
//   }
// }
/** Next-Auth(Auth.js) 기본 설정 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// 사용자 정보 interface (수정 필요)
interface UserInfo {
  displayName?: string; // 회원가입 시 필요한 정보 (로그인 시 생략)
  email: string; // 로그인 시 필요한 정보
  password: string;
}

// api 응답 타입 정의
interface ResponseValue {
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  accessToken: string;
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
  // providers : 인증 공급자 (인증 방법)
  providers: [
    Credentials({
      // credentials 파라미터 : 서버액션에서 호출한 signIn의 두 번째 인수(사용자 정보)임
      // (반환 -> 로그인 성공 시, callbacks.jwt 의 user 변수로 전달)
      authorize: async (credentials) => {
        const userInfo = credentials as unknown as UserInfo; // 사용자 입력 정보(폼 데이터로 전달받은)
        // const { displayName, email, password } = credentials;
        // let user = { id: '', name: '', email: '', image: '' }; // 내부적으로 정해진 속성

        // 회원가입 또는 로그인 처리
        try {
          // 사용자 이름(계정)이 있는 경우, 회원가입 처리
          if (userInfo.displayName) {
            return _signIn('signup', userInfo); // 회원가입
          }

          // 로그인
          return _signIn('signin', userInfo); // 로그인
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  // session : 세션 관리 방식
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  // pages : 로그인 페이지 경로
  pages: {
    signIn: '/signin',
  },
  // callbacks : 인증 및 세션 관리 중 호출되는 핸들러
  callbacks: {
    // signIn : 로그인 시도 시 호출 (반환 -> true: 로그인 성공, false: 로그인 실패)
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
      }
      // 반환되는 토큰 정보에 갱신된 사용자 정보를 추가
      if (trigger === 'update' && session) {
        Object.assign(token, session.user);
        token.profileImage = session.user.profileImage; // 프로필 사진을 변경했을 때 반영!
      }
      return token;
    },
    // session : 바로 위의 jwt 콜백이 반환하는 token 받아서 세션이 확인될 때마다 호출
    // (반환 -> 세션 정보, 각 페이지에서 사용 가능)
    session: async ({ session, token }) => {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

/** 회원가입 및 로그인 처리 */
async function _signIn(
  type: 'signup' | 'signin',
  body: { displayName?: string; email: string; password: string },
) {
  // API 요청
  const res = await fetch(`${process.env.HEROPY_API_URL}/auth/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.HEROPY_API_KEY,
      username: process.env.HEROPY_API_USERNAME,
    },
    body: JSON.stringify(body),
  });

  // API 응답 데이터
  const data = (await res.json()) as ResponseValue | string;

  // 요청 성공 시 세션에 저장
  if (res.ok && typeof data !== 'string') {
    const { user, accessToken } = data;
    return {
      id: user.email, // 고유 ID
      email: user.email, // 이메일
      name: user.displayName, // 이름
      image: user.profileImg, // 프로필 이미지
      accessToken, // 엑세스 토큰
    };
  }

  // 요청 실패 시 에러메세지 반환(UI 에 활용 가능)
  throw new Error(
    (data || '문제가 발생했습니다, 잠시 후 다시 시도하세요.') as string,
  );
}
