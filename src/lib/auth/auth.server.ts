/** 서버사이드에서 인증 처리 */

'use server';
import { auth, signIn, signOut, update } from '@/lib/auth/auth.config';
import type { z } from 'zod';
import { loginSchema } from '@/lib/validation/login-schema';

// 이메일, 비밀번호 사용 로그인
export const signInWithCredentials = async (
  formData: z.infer<typeof loginSchema>,
) => {
  console.log('[signInWithCredentials] 로그인 요청');

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

    console.log('[signInWithCredentials] 로그인 성공');
    return result;
  } catch (error) {
    console.error('[signInWithCredentials] 로그인 중 오류 발생:', error);
    throw new Error(
      (error as Error).message || '알 수 없는 오류가 발생했습니다.',
    );
  }
};

// 로그아웃
export const signOutWithForm = async () => {
  console.log('🚀 [signOutWithForm] 로그아웃 요청');
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
