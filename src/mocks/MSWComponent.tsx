'use client';

import { useEffect } from 'react';

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    import('./init').then((res) => res.initMsw());
  }, []);

  return <>{children}</>;
};
