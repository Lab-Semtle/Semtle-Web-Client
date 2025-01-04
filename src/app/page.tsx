'use client';
import Image from 'next/image';
// pages/index.tsx
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div>
      {/* 내비게이션 */}
      <Navigation />
      {/* 본문 */}

      <Footer />
    </div>
  );
}
