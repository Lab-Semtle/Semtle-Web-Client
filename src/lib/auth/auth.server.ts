'use server';

import { getServerSession } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import authOptions from '@/lib/auth/auth.config';
import { loginSchema } from '@/lib/validation/login-schema';
import { revalidatePath } from 'next/cache';
import type { z } from 'zod';

/** 세션 가져오기 */
export const getSession = async () => {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error('[getSession] 세션 가져오기 실패:', error);
    return null;
  }
};

/** 세션 업데이트 */
export const updateSession = async () => {
  await revalidatePath('/');
};

/** 로그인 수행 (Zod 검증 추가) */
export const signInWithCredentials = async (
  formData: z.infer<typeof loginSchema>,
) => {
  try {
    // 입력 데이터 검증
    const validationResult = await loginSchema.safeParseAsync(formData);
    if (!validationResult.success) {
      console.error(
        '[signInWithCredentials] 유효성 검사 실패:',
        validationResult.error,
      );
      throw new Error('입력한 이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    // 로그인 요청
    const { email, password } = validationResult.data;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // 리디렉트 방지
    });

    if (!result || result.error) {
      console.error('[signInWithCredentials] 로그인 실패:', result?.error);
      throw new Error(result?.error || '로그인 실패');
    }

    return result;
  } catch (error) {
    console.error('[signInWithCredentials] 로그인 중 오류 발생:', error);
    throw new Error(error as string);
  }
};

/** 로그아웃 */
export const signOutWithForm = async () => {
  await signOut();
  await revalidatePath('/');
};
