'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 text-center">
      <h3 className="text-2xl font-semibold text-red-600">⚠️ 오류 발생 ⚠️</h3>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        문제가 발생했습니다. 다시 시도해 주세요.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => {
            startTransition(() => {
              router.refresh();
              reset();
            });
          }}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          다시 시도
        </button>
        <button
          onClick={() => window.location.reload()}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          새로고침
        </button>
      </div>
    </div>
  );
}
