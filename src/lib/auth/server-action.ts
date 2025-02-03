'use server';

import { auth, signIn, signOut, update } from '@/lib/auth/config';
import type { z } from 'zod';
import { loginSchema } from '@/lib/validation/login-schema';

// 이메일, 비밀번호 사용 로그인
export const signInWithCredentials = async (
  data: z.infer<typeof loginSchema>,
) => {
  console.log('[server-action.ts] 로그인 시도 데이터:', data);

  try {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false, // 서버 액션에서 리다이렉트는 catch에서 처리
    });
    console.log('[server-action.ts] signIn 결과:', result);

    if (result?.error) {
      console.error('[server-action.ts] signIn에서 발생한 에러:', result.error);
    }
  } catch (error) {
    console.error('[server-action.ts] signInWithCredentials 에러 발생:', error);
    throw new Error('로그인에 실패했습니다.'); // 에러 메시지 전달
  }
};

// 로그아웃
export const signOutWithForm = async (data: z.infer<typeof loginSchema>) => {
  await signOut(); // 서버에서 세션 종료
};

export { auth as getSession, update as updateSession };

// 구글 로그인
// export const signInWithGoogle = async () => {
//   await signIn('google', { /* 옵션 */ })
//   // ...
// }

// 깃헙 로그인
// export const signInWithGitHub = async () => {
//   await signIn('github', { /* 옵션 */ })
//   // ...
// }
