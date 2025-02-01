import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    role: string;
    accessToken: string;
    profileImageUrl?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      profileImageUrl?: string;
    } & DefaultSession['user'];
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    role: string;
    accessToken: string;
    profileImageUrl?: string;
  }
}
