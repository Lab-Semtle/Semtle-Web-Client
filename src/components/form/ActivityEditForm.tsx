'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import PostFileUploader from '@/components/file/PostFileUploader';

interface PostFormProps {
  mode: 'create' | 'update';
  initialData?: {
    postId?: string;
    title: string;
    category: string;
    content: string;
    imageUrl?: string;
  };
  onSubmit: (formData: FormData) => Promise<void>;
}

export default function ActivityEditForm({
  mode,
  initialData,
  onSubmit,
}: PostFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || '',
    content: initialData?.content || '',
  });

  const [imagePath, setImagePath] = useState(initialData?.imageUrl || '');

  /** 파일 업로드 후 경로 설정 */
  const handleImageUpload = (uploadedImagePath: string) => {
    setImagePath(uploadedImagePath);
  };

  const handleSubmit = async () => {
    console.log('[handleSubmit] 현재 저장된 이미지 경로:', imagePath);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('content', formData.content);
    if (imagePath) {
      console.log('[handleSubmit] 이미지 경로 추가:', imagePath);
      formDataToSend.append('imagePath', imagePath);
    } else {
      console.warn('[handleSubmit] imagePath가 존재하지 않음');
    }

    await onSubmit(formDataToSend);
  };

  return (
    <form className="space-y-6">
      {/* 제목 입력 */}
      <div>
        <Label htmlFor="title" className="text-lg font-bold">
          제목
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="제목을 입력하세요"
        />
      </div>

      {/* 유형 선택 */}
      <div>
        <Label className="text-lg font-bold">게시물 유형</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="게시물 유형 선택하기" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="공지">공지</SelectItem>
            <SelectItem value="세미나">세미나</SelectItem>
            <SelectItem value="행사">행사</SelectItem>
            <SelectItem value="기타">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 대표 이미지 업로드 */}
      <div>
        <Label className="text-lg font-bold">대표 이미지</Label>
        {/* 파일 업로더 추가 (activity/postId 경로) */}
        <PostFileUploader
          uploadPath="activity"
          onUploadSuccess={handleImageUpload}
        />
      </div>

      {/* 내용 입력 */}
      <div>
        <Label className="text-lg font-bold">내용</Label>
        <Textarea
          value={formData.content}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="내용을 입력하세요..."
          className="h-40"
        />
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-2">
        <Button onClick={handleSubmit}>
          {mode === 'update' ? '수정하기' : '업로드'}
        </Button>
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="hover:bg-red-500"
        >
          <X className="mr-2 h-4 w-4" />
          취소
        </Button>
      </div>
    </form>
  );
}
