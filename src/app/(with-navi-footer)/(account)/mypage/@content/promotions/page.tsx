'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { SHOWCASE_DATA, ShowcaseDetail } from '@/constants/showcaseData';
import ProjectCard2 from '@/components/common/ProjectCard2';

export default function PromotionsTab() {
  const [promotions, setPromotions] = useState<ShowcaseDetail[]>(SHOWCASE_DATA);

  // 홍보 게시물 삭제 함수
  const deletePromotion = (id: number) => {
    setPromotions((prev) => prev.filter((promo) => promo.id !== id));
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="container relative mx-auto flex-grow p-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
          내 프로젝트 성과
        </h1>

        {/* 기능 준비중 문구 */}
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <p className="text-3xl font-semibold text-white">
            🚧 기능 준비중입니다...
          </p>
        </div>

        {/* 프로젝트 목록 */}
        <div className="relative z-10 mt-10">
          <ProjectCard2
            cards={promotions}
            renderActions={(id) => (
              <div className="mt-4 flex justify-end">
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  onClick={() => deletePromotion(id)}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  삭제
                </Button>
              </div>
            )}
          />
        </div>
      </main>
    </div>
  );
}
