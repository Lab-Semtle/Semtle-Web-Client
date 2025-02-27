import React from 'react';
import Footer from '@/components/layouts/Footer';
import NavigationBar from '@/components/layouts/NavigationBar';

export default function GlobalLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />
      <main className="flex-1">{children}</main>
      {modal}
      <Footer />
      <div id="modal-root"></div>
    </div>
  );
}
