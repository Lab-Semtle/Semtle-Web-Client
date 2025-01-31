import React from 'react';
// import GlobalLayout from '@/components/GlobalLayout';
import Footer from '@/components/layouts/Footer';
import NavigationBar from '@/components/layouts/Navigation';

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      {children}
      <Footer />
    </>
  );
}
