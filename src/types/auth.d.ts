/** NextAuth의 기본 User와 Session 타입에 커스텀 필드 확장 */

export declare module 'next-auth' {
  interface User {
    id: string; // uuid
    username: string;
    roles: string[];
    profileImageUrl?: string;
    manageApprovalStatus: boolean;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string; // uuid
      username: string;
      role: string;
      profileImageUrl?: string;
      manageApprovalStatus: boolean;
    };
  }
}

export declare module 'next-auth/jwt' {
  interface JWT {
    id: string; // uuid
    username: string;
    role: string;
    profileImageUrl?: string;
    manageApprovalStatus: boolean;
    accessToken: string;
    refreshToken: string;
  }
}
