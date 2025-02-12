/** NextAuth의 기본 User와 Session 타입에 커스텀 필드 확장 */

// export declare module 'next-auth' {
//   // 로그인 시 반환되는 유저 정보 (authorize(), 로그인 API 응답에서 사용자 정보 반환)
//   interface User {
//     id: string;
//     email: string;
//     role: 'admin' | 'user' | 'guest'; // 역할 기반 접근 제어에 필요
//     profileImageUrl?: string; // 네비게이션 바에 표시
//     accessToken: string; // API 호출 시 사용
//     refreshToken: string;
//     name?: string; // 네비게이션 바에 표시
//     emailVerified?: Date | null;
//   }

//   // 클라이언트에서 접근 가능한 세션 정보 (UI 반영 및 API 호출 시 사용)
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       role: 'admin' | 'user' | 'guest';
//       profileImageUrl?: string;
//       name?: string;
//     };
//     accessToken: string;
//     refreshToken: string;
//   }
// }

// // JWT 생성 및 업데이트 시 사용
// export declare module 'next-auth/jwt' {
//   interface JWT {
//     id: string;
//     email: string;
//     role: 'admin' | 'user' | 'guest';
//     accessToken: string;
//     refreshToken: string;
//     accessTokenExpires: number; // 토큰 만료 시간
//     profileImageUrl?: string; // 프로필 이미지를 JWT에서 가져와 세션에 반영할 때 사용
//   }
// }

export declare module 'next-auth' {
  interface User {
    // id: string;
    // email: string;
    // role: 'admin' | 'user' | 'guest';
    // profileImageUrl?: string;
    accessToken: string;
  }

  interface Session {
    // user: User;
    accessToken: string;
    // refreshToken: string;
  }
}

export declare module 'next-auth/jwt' {
  interface JWT {
    // id: string;
    // email: string;
    // role: 'admin' | 'user' | 'guest';
    // profileImageUrl?: string;
    accessToken: string;
    // refreshToken: string;
    // accessTokenExpires: number;
  }
}
