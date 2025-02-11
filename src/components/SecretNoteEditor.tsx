'use client';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';

import SecretFileUploader from './SecretFileUploader';
import SecretImageUploader from './SecretImageUploader';

export default function SecretNoteEditor() {
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');

  const MAX_TITLE_LENGTH = 100;

  return (
    <div>
      <h1 className="text-[30px]">글쓰기</h1>
      <hr className="mb-2 border-t-2 border-gray-400" />
      <form action="/archives" method="POST">
        <div className="mb-2 ml-4 flex items-center gap-6">
          <Label htmlFor="title" className="w-auto text-lg font-semibold">
            제목
          </Label>
          <Input
            id="title"
            className="h-[40px] flex-1 resize-none border p-2 text-xl"
            placeholder="제목을 입력해주세요."
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            {title.length}/{MAX_TITLE_LENGTH} 글자
          </p>
          {title.length > MAX_TITLE_LENGTH && (
            <p className="text-red-500">
              글자 수가 초과되었습니다. 내용을 줄여주세요.
            </p>
          )}
        </div>
        <hr className="border-t-1 mb-2 border-gray-300" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div className="ml-2 flex items-center gap-2">
              <Label className="text-lg">대표 이미지</Label>
              <Label className="text-sm text-gray-500">
                ※ 대표 이미지는 목록 썸네일 및 게시글 캐러셀에 사용됩니다.
              </Label>
            </div>
            <div className="ml-6 flex items-center gap-2">
              <Label className="text-lg font-semibold">작성일자</Label>
              <Input
                placeholder={new Date().toISOString().split('T')[0]}
                className="h-[40px] w-[200px] resize-none"
                disabled
              />
            </div>
          </div>

          <div className="flex flex-wrap">
            {/* 이미지 업로드 */}
            <SecretImageUploader images={images} setImages={setImages} />
          </div>
        </div>
        <hr className="border-t-1 mb-2 border-gray-300" />

        <div className="mb-2 flex flex-col">
          <Textarea
            className="h-[500px] w-full rounded-lg border p-4"
            rows={8}
            placeholder="글을 작성하세요."
          />
        </div>

        {/* 파일 업로드 */}
        <SecretFileUploader files={files} setFiles={setFiles} />
        <hr className="border-t-1 mb-2 mt-2 border-gray-300" />
        <Button
          type="submit"
          className="w-[100px] rounded-lg p-2 text-white transition-all"
        >
          올리기
        </Button>
      </form>
    </div>
  );
}
