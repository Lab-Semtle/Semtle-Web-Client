/*
 * Mock Service Worker 설정 제공자
 * - MSW를 사용하여 API 요청을 목킹(mocking)하고 테스트 환경 지원
 */

import { MSWComponent } from '@/mocks/MSWComponent';

export function Providers({ children }: { children: React.ReactNode }) {
  return <MSWComponent>{children}</MSWComponent>;
}
