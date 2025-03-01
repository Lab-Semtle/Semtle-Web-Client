'use client';
import { useHealthCheck } from '@/hooks/useHealthCheck';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HealthTestPage() {
  const { status, loading, error, refetch } = useHealthCheck();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <CardContent className="space-y-4">
          <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            서버 상태 테스트
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">서버 상태 확인 중...</p>
          ) : error ? (
            <p className="text-center text-red-500">오류: {error}</p>
          ) : (
            <p className="text-center text-lg font-semibold text-green-600">
              {status || '서버 상태 확인 실패'}
            </p>
          )}

          <div className="flex justify-center">
            <Button onClick={refetch}>다시 확인</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
