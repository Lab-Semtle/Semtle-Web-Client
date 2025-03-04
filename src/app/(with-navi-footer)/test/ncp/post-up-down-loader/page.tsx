'use client';

import React, { useState, useEffect } from 'react';
import PostFileUploader from '@/components/file/PostFileUploader';
import PostFileDownloader from '@/components/file/PostFileDownloader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Folder {
  name: string;
  path: string;
}

export default function PostUpDownLoader() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [postId, setPostId] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  /** 📌 API에서 폴더 목록 불러오기 */
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('/api/folders');
        if (!response.ok) throw new Error('폴더 목록을 불러오지 못했습니다.');

        const data: Folder[] = await response.json();
        console.log('[DEBUG] Folders API Response:', data);
        setFolders(data);
        setSelectedFolder(data.length > 0 ? data[0].path : null); // 기본 선택값 설정
      } catch (error) {
        console.error('폴더 목록 불러오기 실패:', error);
      }
    };

    fetchFolders();
  }, []);

  /** 게시물 ID 입력 검증 */
  const handlePostIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    setPostId(input);
    const regex = /^[a-zA-Z0-9_-]+$/;
    setIsValid(regex.test(input));
  };

  return (
    <div className="mx-auto mb-40 mt-40 max-w-2xl rounded-lg border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
        파일 업로드 & 다운로드 테스트
      </h1>

      {/* 🔹 폴더 선택 */}
      <label className="mb-4 block">
        <span className="text-gray-700 dark:text-gray-300">
          저장할 폴더 선택
        </span>
        <Select value={selectedFolder || ''} onValueChange={setSelectedFolder}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="폴더 선택" />
          </SelectTrigger>
          <SelectContent>
            {folders.map((folder) => (
              <SelectItem key={folder.path} value={folder.path}>
                {folder.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      {/* 🔹 게시물 ID 입력 */}
      <label className="mb-4 block">
        <span className="text-gray-700 dark:text-gray-300">
          게시물 ID를 입력하세요
        </span>
        <input
          type="text"
          value={postId}
          onChange={handlePostIdChange}
          className="mt-1 w-full rounded border border-gray-300 bg-white p-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-600"
          placeholder="예: 12345"
        />
      </label>

      {/* 올바르지 않은 형식 경고 메시지 */}
      {!isValid && postId.length > 0 && (
        <p className="mb-4 text-sm text-red-500">
          ⚠️ 올바른 형식이 아닙니다! (영문, 숫자, `_`, `-`만 허용)
        </p>
      )}

      {/* 🔹 파일 업로드 및 다운로드 컴포넌트 */}
      {isValid && postId.length > 0 && selectedFolder && (
        <div className="space-y-6">
          <PostFileUploader postId={postId} uploadPath={selectedFolder} />
          <PostFileDownloader postId={`${selectedFolder}/${postId}`} />
        </div>
      )}
    </div>
  );
}
