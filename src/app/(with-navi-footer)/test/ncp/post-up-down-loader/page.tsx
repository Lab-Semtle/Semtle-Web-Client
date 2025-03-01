'use client';

import React, { useState } from 'react';
import PostFileUploader from '@/components/editor/PostFileUploader';
import PostFileDownloader from '@/components/editor/PostFileDownloader';

export default function PostUpDownLoader() {
  const [postId, setPostId] = useState<string>(''); // 사용자가 입력한 게시물 ID

  return (
    <div className="mx-auto mb-40 mt-40 max-w-2xl rounded-lg border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
        특정 게시물 파일 업로드 & 다운로드 기능 동작 테스트
      </h1>

      {/* 게시물 ID 입력 */}
      <label className="mb-4 block">
        <span className="text-gray-700 dark:text-gray-300">
          게시판(게시물) ID를 입력해주세요 ( 입력 형식 : [게시판ID]/[게시물ID] ,
          양 끝에 &apos;/&apos; 기입 금지 )
        </span>
        <input
          type="text"
          value={postId}
          onChange={(e) => setPostId(e.target.value.trim())} // 공백 방지
          className="mt-1 w-full rounded border border-gray-300 bg-white p-2 text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-600"
          placeholder="Enter a post ID"
        />
      </label>

      {/* 파일 업로드 및 다운로드 컴포넌트 */}
      {postId && postId.length > 0 && (
        <div className="space-y-6">
          <PostFileUploader postId={postId} />
          <PostFileDownloader postId={postId} />
        </div>
      )}
    </div>
  );
}
