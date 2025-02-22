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
    <>
      <NavigationBar />
      <main>{children}</main>
      {modal}
      <Footer />
      <div id="modal-root"></div>
    </>
  );
}
