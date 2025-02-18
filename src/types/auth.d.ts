/** NextAuth의 기본 User와 Session 타입에 커스텀 필드 확장 */

export declare module 'next-auth' {
  interface User {
    uuid: string; // id
    username: string; // 사용자 이름
    roles: string[]; // 역할
    profileImageUrl?: string; // 선택
    manageApprovalStatus: boolean; // 관리자 승인 여부
    accessToken: string; // JWT 액세스 토큰
    refreshToken: string; // JWT 리프레시 토큰
  }

  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      uuid: string;
      username: string;
      role: string; // `roles` 배열의 첫 번째 값 저장
      profileImageUrl?: string;
      manageApprovalStatus: boolean;
    };
  }
}

export declare module 'next-auth/jwt' {
  interface JWT {
    uuid: string;
    username: string;
    role: string; // `roles[0]` 저장
    profileImageUrl?: string;
    manageApprovalStatus: boolean;
    accessToken: string;
    refreshToken: string;
  }
}
