/** 프로젝트 전체에 MSW 적용 */

import { MSWComponent } from '@/components/msw/MSWComponent';

export function Providers({ children }: { children: React.ReactNode }) {
  return <MSWComponent>{children}</MSWComponent>;
}
