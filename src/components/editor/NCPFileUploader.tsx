'use client';

import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';

interface UploadedFile {
  name: string;
  key: string;
}

export default function NCPFileUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 파일 선택 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // 파일 업로드 핸들러
  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    abortControllerRef.current = new AbortController();

    try {
      // 서명된 URL 요청
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      const { signedUrl } = await response.json();

      // 파일 업로드 요청
      await uploadFileWithProgress(
        file,
        signedUrl,
        abortControllerRef.current.signal,
      );

      alert('File uploaded successfully!');
      setUploadedFiles((prev) => [
        ...prev,
        { name: file.name, key: file.name },
      ]);
      setFile(null); // 파일 선택 초기화
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Upload cancelled');
      } else {
        console.error('Error uploading file:', error);
        alert('Error uploading file');
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      abortControllerRef.current = null;
    }
  };

  // 업로드 진행률을 추적하는 함수
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
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Upload failed'));
      };

      xhr.send(file);

      signal.addEventListener('abort', () => {
        xhr.abort();
        reject(new Error('Upload cancelled'));
      });
    });
  };

  // 업로드 취소 핸들러
  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // 파일 삭제 핸들러
  const handleDelete = async (key: string) => {
    try {
      await fetch('/api/files', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });
      alert('File deleted successfully!');
      setUploadedFiles((prev) => prev.filter((file) => file.key !== key));
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Error deleting file');
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-lg rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Upload Files</h2>
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
            <div className="cursor-pointer rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-blue-500 transition duration-300 hover:bg-blue-100">
              {file ? file.name : 'Choose a file'}
            </div>
          </label>
          <button
            type="submit"
            disabled={!file || isUploading}
            className="rounded-lg bg-blue-500 px-6 py-2 text-white transition duration-300 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>

      {isUploading && (
        <div className="mb-4">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {uploadProgress.toFixed(2)}% uploaded
            </p>
            <button
              onClick={handleCancelUpload}
              className="text-red-500 transition duration-300 hover:text-red-600"
            >
              Cancel Upload
            </button>
          </div>
        </div>
      )}

      <h2 className="mb-2 text-lg font-semibold text-gray-800">
        Uploaded Files
      </h2>
      {uploadedFiles.length === 0 ? (
        <p className="italic text-gray-500">No files uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {uploadedFiles.map((file) => (
            <li
              key={file.key}
              className="flex items-center justify-between rounded-lg bg-gray-100 p-3"
            >
              <span className="truncate text-gray-700">{file.name}</span>
              <button
                onClick={() => handleDelete(file.key)}
                className="text-red-500 transition duration-300 hover:text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
