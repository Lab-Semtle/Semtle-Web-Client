/** 관리자 페이지 레이아웃 */
// import localFont from 'next/font/local';
import '@/app/global.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { BaseLayout } from './base-layout';
import { ThemeProvider } from '@/components/admin/theme-provider';

export default function ExecutiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <BaseLayout>{children}</BaseLayout>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
