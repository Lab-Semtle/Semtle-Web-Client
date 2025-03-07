import { Toaster } from '@/components/ui/toaster';
import localFont from 'next/font/local';
import '@/app/global.css';
import Script from 'next/script';
import 'react-loading-skeleton/dist/skeleton.css';
import Providers from '@/components/providers';
import '@/styles/prosemirror.css';
import 'katex/dist/katex.min.css';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '아치셈틀',
  description: '국립한국해양대학교 인공지능공학부 아치셈틀 공식 홈페이지',
  openGraph: {
    title: '아치셈틀',
    description: '국립한국해양대학교 인공지능공학부 아치셈틀 공식 홈페이지',
  },
  metadataBase: new URL('https://archisemtle.com'),
};

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
      <head>
        {/* Mixed Content 방지 설정 */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body
        className={`${moneygraphy.variable} ${pretendard.variable} ${yclover.variable} ${suit.variable} font-pretendard antialiased`}
      >
        <Providers>
          <main>{children}</main>
          <Script
            type="text/javascript"
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`}
          ></Script>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
