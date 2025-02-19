import { useState, useEffect } from 'react';
import { getSession } from '@/lib/auth/auth.server';
import { Session } from 'next-auth';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession(); // 서버에서 세션 정보 가져옴
      setSession(sessionData); // 상태 업데이트
    };
    fetchSession();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return session; // 현재 세션 반환
};
