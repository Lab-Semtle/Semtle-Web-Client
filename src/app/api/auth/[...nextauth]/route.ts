/** API 라우트 핸들러 : 백엔드 구성에 따라 삭제될 수 있음 */

import { handlers } from '@/lib/auth/config';

// handlers는 GET, POST 요청에 대해 Auth.js의 핸들러를 그대로 사용함.
// GET : 세션 정보 반환
// POST : 로그인, 로그아웃 같은 인증 관련 액션 처리
export const { GET, POST } = handlers;
// export const runtime = 'edge' // 선택옵션
