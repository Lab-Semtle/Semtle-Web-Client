'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PostFileUploader from '@/components/file/PostFileUploader';
import { ProjectApplyRequest } from '@/types/project';

interface FileData {
  fileName: string;
  fileUrl: string;
}

interface Props {
  postId: string;
  onClose: () => void;
  onSubmit: (data: ProjectApplyRequest) => Promise<void>;
  isLoading?: boolean;
}

const ProjectApplyForm: React.FC<Props> = ({
  postId,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  if (!postId) {
    throw new Error('postId가 제공되지 않았습니다.');
  }

  const [answers, setAnswers] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [urls, setUrls] = useState<string[]>(['']);
  const [files, setFiles] = useState<FileData[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // 파일 업로드 성공 시 처리
  const handleUploadSuccess = (uploadedFilePath: string) => {
    setFiles((prev) => [
      ...prev,
      { fileName: uploadedFilePath, fileUrl: uploadedFilePath },
    ]);
  };

  /** 신청 제출 핸들러 */
  const handleSubmit = async () => {
    if (!answers.trim()) {
      alert('답변을 입력해야 합니다.');
      return;
    }

    const formData: ProjectApplyRequest = {
      answers: [{ questionId: 0, answer: answers }],
      urls: urls.filter((url) => url.trim() !== ''),
      files,
    };

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('신청 실패:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 답변 입력 */}
      <div className="mb-4">
        <label className="mb-1 block text-lg font-semibold">답변</label>
        <Textarea
          placeholder="답변을 입력하세요."
          value={answers}
          onChange={(e) => setAnswers(e.target.value)}
          rows={10}
          className="w-full rounded-md p-3"
        />
      </div>

      {/* 참고 URL 입력 */}
      <div className="mb-4">
        <label className="mb-1 block text-lg font-semibold">참고 URL</label>
        <Input
          type="text"
          placeholder="참고 URL 입력"
          value={urls[0]}
          onChange={(e) => setUrls([e.target.value])}
          className="w-full rounded-md p-2"
        />
      </div>

      {/* 파일 업로드 */}
      <div className="mb-4">
        <label className="mb-1 block text-lg font-semibold">파일 업로드</label>
        <PostFileUploader
          uploadPath="project-apply"
          onUploadSuccess={handleUploadSuccess}
        />
      </div>

      {/* 버튼 */}
      <div className="flex justify-between gap-4">
        <Button
          className="w-full bg-semtle-lite p-3 text-lg hover:bg-semtle-dark dark:bg-semtle-dark dark:hover:bg-semtle-lite"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? '신청 중...' : '신청 제출'}
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full p-3 text-lg"
          disabled={isLoading}
        >
          닫기
        </Button>
      </div>
    </div>
  );
};

export default ProjectApplyForm;
