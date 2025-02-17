/** 세션 정보 갱신 */
'use server';

import { redirect } from 'next/navigation';
import { getSession, updateSession } from '@/lib/auth/serverActions/auth';

export async function updateUser(formData: FormData) {
  const session = await getSession();

  // 수정 필요
  const res = await fetch(`${process.env.HEROPY_API_URL}/auth/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.HEROPY_API_KEY as string,
      username: 'HEROPY',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      displayName: formData.get('displayName'),
    }),
  });

  // 다음과 같이 사용 가능
  const updatedUser = await res.json();
  await updateSession({
    user: {
      name: updatedUser.displayName,
    },
  });
  redirect('/setup'); // 브라우저에 출력되는 화면 갱신 (업데이트할 경로)
}
