import { useState, useEffect } from 'react';
import { getSession } from '@/lib/auth/server-action';
import { Session } from 'next-auth';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };
    fetchSession();
  }, []);

  return session;
};
