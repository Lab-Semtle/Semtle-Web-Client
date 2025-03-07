'use client';

import React, { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';

interface FileItem {
  name: string;
  key: string;
}

interface NCPPathDownloaderProps {
  directory: string; // 특정 경로 (폴더) 지정
  className?: string;
}

/** NCP 특정 경로의 파일 목록을 렌더링하고 다운로드할 수 있는 컴포넌트 */
export default function NCPPathDownloader({
  directory,
  className,
}: NCPPathDownloaderProps) {
  const [files, setFiles] = useState<FileItem[]>([]);

  // 특정 경로의 파일 목록을 가져오는 함수
  const fetchFiles = useCallback(async () => {
    if (!directory) return;

    try {
      const response = await fetch(`/api/path?directory=${directory}`); // API 엔드포인트 변경
      const data = await response.json();

      const formattedFiles = Array.isArray(data)
        ? data
            .filter((file) => file.Key && file.Key !== directory)
            .map((file) => ({
              key: file.Key!,
              name: file.Key!.split('/').pop() ?? 'Unnamed File',
            }))
        : [];

      setFiles(formattedFiles);
    } catch (error) {
      console.error('파일 목록을 불러오는 중 오류 발생:', error);
      setFiles([]);
    }
  }, [directory]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // 파일 다운로드 핸들러
  const handleDownload = async (key: string) => {
    try {
      const response = await fetch('/api/files/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      // JSON 응답이 아닌 경우 예외 처리
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('서버에서 올바른 JSON 응답을 받지 못했습니다.');
      }

      if (data.signedUrl) {
        window.open(data.signedUrl, '_blank');
      } else {
        alert('다운로드 URL을 가져올 수 없습니다.');
      }
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);

      let errorMessage = '파일 다운로드에 실패했습니다.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    }
  };

  return (
    <div
      className={clsx(
        'mt-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900',
        className,
      )}
    >
      <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
        파일 목록
      </h2>

      {files.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          해당 경로에 파일이 없습니다.
        </p>
      ) : (
        <ul className="space-y-2">
          {files.map((file) => (
            <li
              key={file.key}
              className="flex justify-between rounded-md border border-gray-200 bg-gray-50 p-2 text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <span className="truncate">{file.name}</span>
              <button
                onClick={() => handleDownload(file.key)}
                className="rounded-md bg-blue-500 px-3 py-1 text-white transition duration-300 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                다운로드
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
