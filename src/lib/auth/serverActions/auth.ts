/** 서버사이드에서 인증 처리 */

'use server';
import { auth, signIn, signOut, update } from '@/lib/auth/config';
import type { z } from 'zod';
import { loginSchema } from '@/lib/validation/login-schema';

// 이메일, 비밀번호 사용 로그인
export const signInWithCredentials = async (
  // initialState: { message: string },
  formData: z.infer<typeof loginSchema>,
) => {
  try {
    await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      // redirectTo: '/' // 로그인 후 메인 페이지로 이동
      // auth.js 기본 설정에서(config.ts) redirect callbacks를 설정한 경우, 해당 옵션 주석 처리할 것
      // 주의, redirectTo는 try 문 안에서 동작 X
    });
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: '알 수 없는 오류가 발생했습니다.' };
  }
};

// 로그아웃
export const signOutWithForm = async () => {
  await signOut();
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
