/** 특정 경로에 사용자가 접근하기 전에 서버 측에서 인증 상태를 확인하고, 적절한 페이지로 리다이렉트 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from 'path-to-regexp';
import { getSession } from '@/lib/auth/server-action'; // import { auth } from '@/auth'

// 보호할 경로 설정
const matchersForAuth = ['/dashboard/*']; // 인증이 필요한 경로
const matchersForSignIn = ['/signin/*']; // 로그인 후 접근 X 경로

export async function middleware(request: NextRequest) {
  // 인증이 필요한 경로 접근 시 처리 로직
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession())
      ? NextResponse.next() // 세션이 있으면 그대로 이동
      : NextResponse.redirect(new URL('/signin', request.url)); // 없으면 로그인 페이지로 이동
  }

  // 로그인 후 접근할 필요 없는 경로 처리
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return (await getSession())
      ? NextResponse.redirect(new URL('/', request.url)) // 이미 로그인한 사용자는 메인으로 이동
      : NextResponse.next(); // 세션이 없으면 그대로 이동
  }
  return NextResponse.next();
}

// 요청된 경로(pathname)가 보호된 목록(urls) 중 하나와 일치하는지 확인하는 함수
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}
