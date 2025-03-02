'use client';

import NovelEditor from '@/components/editor/NovelEditor';

export default function TestEditorPage() {
  return (
    <div className="container mx-auto mt-10 max-w-4xl pb-20 pt-40">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Novel Editor 테스트
      </h1>
      <NovelEditor />
    </div>
  );
}
