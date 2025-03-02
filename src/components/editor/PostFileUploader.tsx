'use client';

import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import clsx from 'clsx';

interface UploadedFile {
  name: string;
  key: string;
}

interface FileUploadManagerProps {
  postId: string;
  className?: string;
  onUploadSuccess?: (uploadedImagePath: string) => void;
}

export default function PostFileUploader({
  postId,
  className,
  onUploadSuccess,
}: FileUploadManagerProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: `${postId}/${file.name}`,
          fileType: file.type,
        }),
      });

      const { signedUrl } = await response.json();

      await uploadFileWithProgress(
        file,
        signedUrl,
        abortControllerRef.current.signal,
      );

      alert('파일이 성공적으로 업로드 되었습니다!');

      const uploadedPath = `/banner/${file.name}`; // 저장된 이미지 경로
      setUploadedFiles((prev) => [
        ...prev,
        { name: file.name, key: uploadedPath },
      ]);

      if (onUploadSuccess) {
        onUploadSuccess(uploadedPath); // 업로드 성공 후 콜백 실행
      }

      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      abortControllerRef.current = null;
    }
  };

  const uploadFileWithProgress = (
    file: File,
    signedUrl: string,
    signal: AbortSignal,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('PUT', signedUrl);
      xhr.setRequestHeader('Content-Type', file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new Error(`업로드를 실패했습니다. : ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('업로드 실패'));
      };

      xhr.send(file);

      signal.addEventListener('abort', () => {
        xhr.abort();
        reject(new Error('업로드 취소'));
      });
    });
  };

  return (
    <div
      className={clsx(
        'mb-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900',
        className,
      )}
    >
      <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
        파일을 선택해주세요
      </h2>
      <form onSubmit={handleUpload} className="mb-4">
        <div className="flex items-center space-x-3">
          <label className="flex-1">
            <input
              type="file"
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
              id="file-upload"
            />
            <div className="cursor-pointer rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-blue-500 transition duration-300 hover:bg-blue-100 dark:border-blue-500 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">
              {file ? file.name : '여기를 클릭하여 파일을 선택해주세요'}
            </div>
          </label>
          <button
            type="submit"
            disabled={!file || isUploading}
            className="rounded-md bg-blue-500 px-6 py-2 text-white transition duration-300 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {isUploading ? '업로드 중...' : '업로드'}
          </button>
        </div>
      </form>

      {/* 업로드 진행률 표시 */}
      {isUploading && (
        <div className="mb-4">
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2.5 rounded-full bg-blue-600 dark:bg-blue-500"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {uploadProgress.toFixed(2)}% uploaded
          </p>
        </div>
      )}

      {/* 업로드된 파일 목록 표시 */}
      <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
        업로드된 파일 목록
      </h2>
      {uploadedFiles.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          파일이 선택되지 않았습니다.
        </p>
      ) : (
        <ul className="space-y-2">
          {uploadedFiles.map((file) => (
            <li
              key={file.key}
              className="flex justify-between rounded-md border border-gray-200 bg-gray-50 p-2 text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <span className="truncate">{file.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
