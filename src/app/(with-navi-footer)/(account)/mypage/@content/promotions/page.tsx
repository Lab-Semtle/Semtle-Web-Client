'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

// 📌 홍보한 프로젝트 데이터 (예제)
const promotedProjects = [
  {
    id: 1,
    title: 'AI 프로젝트 홍보',
    promotedDate: '2025-02-20',
  },
  {
    id: 2,
    title: '웹 서비스 개발 홍보',
    promotedDate: '2025-02-18',
  },
  {
    id: 3,
    title: '모바일 앱 개발 홍보',
    promotedDate: '2025-02-15',
  },
];

export default function PromotionsTab() {
  const [promotions, setPromotions] = useState(promotedProjects);

  // 홍보 게시물 삭제 함수
  const deletePromotion = (id: number) => {
    setPromotions((prev) => prev.filter((promo) => promo.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 📌 메인 컨텐츠 (푸터를 아래 고정하기 위해 flex-grow 적용) */}
      <main className="container mx-auto flex-grow p-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
          프로젝트 홍보 목록
        </h1>

        {/* 📌 프로젝트 홍보 목록 (카드형) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {promotions.map((project) => (
            <Card
              key={project.id}
              className="border-gray-200 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-800"
            >
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  <Link
                    href={`/promotions/${project.id}`}
                    className="hover:underline"
                  >
                    {project.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                <p>📅 홍보 날짜: {project.promotedDate}</p>
                <div className="mt-4 flex gap-2">
                  {/* 삭제 버튼 */}
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                    onClick={() => deletePromotion(project.id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    삭제
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
