/** API 라우트 구성 */

import { handlers } from '@/lib/auth/auth.config';

// GET : 세션 정보 반환
// POST : 로그인, 로그아웃 같은 인증 관련 액션 처리
export const { GET, POST } = handlers;
// export const runtime = 'edge' // 선택옵션
