/** 유저 인증 여부에 따른 URL 경로 매칭 미들웨어 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from 'path-to-regexp';
import { getSession } from '@/lib/auth/auth.server';

// 보호할 경로 설정, 배포 전 확인 필요
const matchersForAuth = ['/setup/*', '/mypage/*', '/executive/*']; // 로그인 이후 접근 가능
const matchersForSignIn = ['/signin/*', '/recruit/*']; // 로그인 후 접근 불가능

export async function middleware(request: NextRequest) {
  // 인증이 필요한 경로 접근 시
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession())
      ? NextResponse.next() // 로그인 O -> 이동하려는 페이지로 이동
      : NextResponse.redirect(new URL('/signin', request.url)); // 로그인 X -> 로그인 페이지로 이동
  }

  // 로그인 후(인증 후) 접근할 필요 없는 경로 접근 시
  if (isMatch(request.nextUrl.pathname, matchersForSignIn)) {
    return (await getSession())
      ? NextResponse.redirect(new URL('/', request.url)) // 로그인 O -> '/'으로 이동
      : NextResponse.next(); // 로그인 X -> 이동하려는 페이지로 이동
  }
  return NextResponse.next();
}

// 요청된 경로(pathname)가 보호된 목록(urls) 중 하나와 일치하는지 확인
function isMatch(pathname: string, urls: string[]) {
  return urls.some((url) => !!match(url)(pathname));
}
