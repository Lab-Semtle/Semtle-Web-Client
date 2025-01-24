'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import Link from 'next/link';

export default function RecruitmentPostPage() {
  return (
    <div className="container mx-auto p-6">
      {/* 네비게이션 바 */}
      <nav className="flex justify-between py-4 border-b">
        <div className="text-xl font-bold">EvenIF</div>
        <div>
          <Link href="/login" className="mr-4">Login</Link>
          <Link href="/join">Join</Link>
        </div>
      </nav>
      
      {/* 프로젝트 상세 */}
      <div className="mt-8 border p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-bold">프로젝트 제목</h1>
        <p className="text-gray-600">프로젝트 한 줄 설명</p>
        
        {/* 링크 */}
        <div className="mt-4 flex space-x-4">
          <Link href="#" className="text-blue-500">Github 링크</Link>
          <Link href="#" className="text-blue-500">배포 링크</Link>
        </div>
        
        {/* 대표 이미지 */}
        <div className="mt-4 w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          대표 이미지 표시
        </div>
        
        {/* 프로젝트 정보 */}
        <div className="mt-6">
          <p><strong>프로젝트 기간:</strong> 20XX.XX.XX - 20XX.XX.XX</p>
          <p><strong>프로젝트 유형:</strong> <span className="text-blue-600">해커톤</span></p>
          <p><strong>관련 분야:</strong> <span className="text-green-600">Android</span>, <span className="text-green-600">Web</span></p>
          <p><strong>참여 인원:</strong> FE: 000, BE: 000</p>
        </div>
        
        {/* 프로젝트 설명 */}
        <div className="mt-6">
          <p className="font-bold">프로젝트 설명</p>
          <Textarea placeholder="프로젝트 설명을 입력하세요..." className="w-full mt-2" />
        </div>
        
        {/* 버튼 */}
        <div className="mt-6 flex justify-between">
          <Button variant="outline">목록</Button>
          <div>
            <Button variant="outline" className="mr-2">이전</Button>
            <Button>다음</Button>
          </div>
        </div>
      </div>
      
      {/* 푸터 */}
      <footer className="mt-12 border-t py-6 text-center text-sm text-gray-600">
        <p>Contact Semtie | 전화번호 | 문의처</p>
        <p>GitHub: <Link href="#" className="text-blue-500">https://github.com/XXXXXXXXX</Link></p>
        <p>Version 1.0 (2025)</p>
      </footer>
    </div>
  );
}
