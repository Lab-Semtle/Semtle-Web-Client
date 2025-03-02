/** NextAuth의 기본 User와 Session 타입에 커스텀 필드 확장 */

export declare module 'next-auth' {
  // 로그인 직후 authorize() 함수에서 반환되는 사용자 정보
  // signIn() 성공 후, jwt 콜백에서 토큰 생성 시 사용
  interface User {
    accessToken: string;
    refreshToken: string;
    id: string;
    username: string;
    profileUrl: string;
  }

  // 클라이언트에서 현재 로그인된 사용자 정보 확인 시 사용
  // JWT 토큰에서 Session으로 변환되어 클라이언트에 전달
  // UI에서 로그인 상태 유지할 때 사용
  interface Session {
    accessToken: string;
    refreshToken: string;
    id: string;
    user: {
      name: string;
      email: string; // 기본값?
      image: string;
    };
  }
}

export declare module 'next-auth/jwt' {
  // 로그인 성공 후 JWT 토큰에 저장되는 정보
  // 세션을 사용할 때마다 클라이언트에서 서버로 전달되는 정보
  // session 콜백에서 Session 타입으로 변환
  interface JWT {
    accessToken: string;
    refreshToken: string;
    id: string;
    username: string;
    profileUrl: string;
  }
}
