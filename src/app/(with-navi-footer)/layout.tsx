import React from 'react';
// import GlobalLayout from '@/components/GlobalLayout';
import Footer from '@/components/Footer';
import NavigationBar from '@/components/Navigation';

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
