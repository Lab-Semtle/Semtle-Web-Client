import { MSWComponent } from '@/components/msw/MSWComponent';

export function MSWProviders({ children }: { children: React.ReactNode }) {
  return <MSWComponent>{children}</MSWComponent>;
}
