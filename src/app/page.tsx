'use client';
import Image from 'next/image';
// pages/index.tsx
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

export default function Page() {
  return (
    <div>
      {/* 헤더 */}
      <Header />
      {/* 내비게이션 */}
      <Navigation />
      {/* 본문 */}

    </div>
  );
}
