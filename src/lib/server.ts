/** 권한 기반 로그인 처리, 세션 정보 반환(토큰, 사용자 정보) */

'use server';

import { auth, signIn } from '../auth';
import type { z } from 'zod';
import type { loginSchema } from '@/widgets/login/config';

export const signInWithCredentials = async (
  data: z.infer<typeof loginSchema>,
) => {
  await signIn('credentials', {
    email: data.email,
    password: data.password,
    redirectTo: '/',
  });
};

export { auth as getSession };
