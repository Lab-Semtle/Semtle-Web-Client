'use server';
import { auth, signIn, signOut, update } from '@/lib/authClient';

// 커스텀 로그인
export const signInWithCredentials = async (formData: FormData) => {
  await signIn('credentials', {
    email: formData.get('email') || '',
    password: formData.get('password') || '',
    // redirectTo: '/' // 로그인 후 메인 페이지로 이동
  });
  // ...
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
  await signOut();
};

export { auth as getSession, update as updateSession };
