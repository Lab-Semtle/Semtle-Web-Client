'use client';

import React, { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';

interface FileItem {
  name: string;
  key: string;
}

interface FileListProps {
  postId: string;
  className?: string;
}

export default function PostFileDownloader({
  postId,
  className,
}: FileListProps) {
  const [files, setFiles] = useState<FileItem[]>([]);

  // 파일 목록을 가져오는 함수
  const fetchFiles = useCallback(async () => {
    if (!postId) return;

    try {
      const response = await fetch(`/api/files-id?postId=${postId}`);
      const data = await response.json();
      const formattedFiles = Array.isArray(data)
        ? data.map((file) => ({
            key: file.Key,
            name: file.Key.split('/').pop(),
          }))
        : [];

      setFiles(formattedFiles);
    } catch (error) {
      console.error('Error fetching files:', error);
      setFiles([]);
    }
  }, [postId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // 파일 다운로드 핸들러
  const handleDownload = async (key: string) => {
    try {
      const response = await fetch('/api/files-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });

      const { signedUrl } = await response.json();
      if (signedUrl) {
        window.open(signedUrl, '_blank');
      } else {
        alert('Error: Unable to fetch signed URL');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file');
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
          No files uploaded for this post.
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
