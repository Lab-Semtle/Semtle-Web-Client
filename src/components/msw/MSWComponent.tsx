/** MSW Provider 구성 */

'use client';
import { useEffect } from 'react';

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    import('@/mocks/init').then((res) => res.initMSW());
  }, []);

  return <>{children}</>;
};
