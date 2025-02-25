'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

// 📌 업로드된 족보 데이터 (예제)
const uploadedSecrets = [
  {
    id: 1,
    title: '자료구조 족보',
    uploadDate: '2025-02-20',
    files: 2,
  },
  {
    id: 2,
    title: '알고리즘 족보',
    uploadDate: '2025-02-18',
    files: 5,
  },
];

export default function SecretTab() {
  const [secrets, setSecrets] = useState(uploadedSecrets);

  // 족보 삭제 함수
  const deleteSecret = (id: number) => {
    setSecrets((prev) => prev.filter((secret) => secret.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 📌 메인 컨텐츠 (푸터를 아래 고정하기 위해 flex-grow 적용) */}
      <main className="container mx-auto flex-grow p-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
          업로드한 족보 목록
        </h1>

        {/* 📌 업로드된 족보 목록 (카드형 UI) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {secrets.map((secret) => (
            <Card
              key={secret.id}
              className="border-gray-200 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-800"
            >
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  <Link
                    href={`/secrets/${secret.id}`}
                    className="hover:underline"
                  >
                    {secret.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                <p>📅 업로드 날짜: {secret.uploadDate}</p>
                <p>📂 파일 개수: {secret.files}개</p>
                <div className="mt-4 flex gap-2">
                  {/* 삭제 버튼 */}
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                    onClick={() => deleteSecret(secret.id)}
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
