import React from 'react';
import Footer from '@/components/layouts/Footer';
import NavigationBar from '@/components/navigation/NavigationBar';

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
