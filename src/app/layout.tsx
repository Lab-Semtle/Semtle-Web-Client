import { Toaster } from '@/components/ui/toaster';
import localFont from 'next/font/local';
import '@/app/global.css';
import { ThemeProvider } from 'next-themes';
import { MSWProviders } from '@/components/msw/MSWProvider';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';
import 'react-loading-skeleton/dist/skeleton.css';
import Providers from '@/components/providers';
import '@/styles/prosemirror.css';
import 'katex/dist/katex.min.css'; // Novel Editor 수학식 스타일 적용
import { Metadata, Viewport } from 'next';

// 메타데이터 설정
export const metadata: Metadata = {
  title: '아치셈틀(Archi Semtle)',
  description: '국립한국해양대학교 인공지능공학부 아치셈틀 공식 홈페이지',
  openGraph: {
    title: '아치셈틀(Archi Semtle)',
    description: '국립한국해양대학교 인공지능공학부 아치셈틀 공식 홈페이지',
  },
  metadataBase: new URL('https://semtle.com'), // 실제 서비스 URL 로 변경 필요
};

// 뷰포트 메타데이터 설정 (다크 모드 대응)
export const viewport: Viewport = {
  themeColor: '#ffffff',
};

const suit = localFont({
  src: './fonts/SUIT-Variable.woff2',
  display: 'swap',
  variable: '--font-suit',
});

const yclover = localFont({
  src: './fonts/YClover-Bold.woff2',
  display: 'swap',
  variable: '--font-yclover',
});

const moneygraphy = localFont({
  src: './fonts/Moneygraphy-Rounded.woff2',
  display: 'swap',
  variable: '--font-moneygraphy',
});

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${moneygraphy.variable} ${pretendard.variable} ${yclover.variable} ${suit.variable} font-pretendard antialiased`}
      >
        <Providers>
          <MSWProviders>
            <ThemeProvider attribute="class" defaultTheme="system">
              <SessionProvider>
                <main>{children}</main>
                <Script
                  type="text/javascript"
                  src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`}
                ></Script>
              </SessionProvider>
            </ThemeProvider>
          </MSWProviders>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
