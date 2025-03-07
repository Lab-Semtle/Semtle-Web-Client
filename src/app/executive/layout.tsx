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
    <div className="relative min-h-screen">
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
