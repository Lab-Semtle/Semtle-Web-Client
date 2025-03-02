'use server';

import { auth, signIn, signOut, update } from '@/lib/auth/auth.config';
import { loginSchema } from '@/lib/validation/login-schema';
import { revalidatePath } from 'next/cache';
import type { z } from 'zod';

/** 로그인 */
export const signInWithCredentials = async (
  formData: z.infer<typeof loginSchema>,
) => {
  try {
    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false, // 리디렉트 방지 (서버에서 직접 핸들링)
    });

    if (result?.error) {
      console.error('[signInWithCredentials] 로그인 실패:', result.error);
      throw new Error(result.error);
    }

    // await update();

    console.log('[signInWithCredentials] 로그인 성공');
    return result;
  } catch (error) {
    console.error('[signInWithCredentials] 로그인 중 오류 발생:', error);
    throw new Error(error as string);
  }
};

/** 로그아웃 */
export const signOutWithForm = async () => {
  await signOut();

  revalidatePath('/');
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
