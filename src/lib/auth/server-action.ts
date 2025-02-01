'use server';

import { auth, signIn, signOut, update } from '@/lib/auth/config';

// 이메일, 비밀번호 사용 로그인
export const signInWithCredentials = async (formData: FormData) => {
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  if (!email || !password) throw new Error('이메일과 비밀번호를 입력해주세요.');

  await signIn('credentials', {
    email,
    password,
    redirect: false, // 서버 액션에서 리다이렉트는 catch에서 처리
  });
};

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

// 로그아웃
export const signOutWithForm = async (formData: FormData) => {
  await signOut(); // 서버에서 세션 종료
};

export { auth as getSession, update as updateSession };
