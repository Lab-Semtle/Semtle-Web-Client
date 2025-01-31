/* 미들웨어에서 요청된 경로를 검사하고 세션 유무에 따라 페이지 이동을 결정 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from 'path-to-regexp';
import { getSession } from '@/lib/authServerAction'; // import { auth } from '@/auth'

// 보호 대상
const matchersForAuth = ['/dashboard/*', '/myaccount/*', '/settings/*', '...'];
const matchersForSignIn = ['/signup/*', '/signin/*'];

export async function middleware(request: NextRequest) {
  // 인증이 필요한 페이지 접근 제어 (세션 검사)
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession()) // 세션 정보 확인
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/signin', request.url));
  }

  // 인증 후 회원가입 및 로그인 접근 제어 (로그인된 사용자가 로그인/회원가입 페이지 접근)
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return (await getSession())
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next();
  }
  return NextResponse.next();
}

// 경로 매칭 확인 함수
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}
