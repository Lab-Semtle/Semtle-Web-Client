'use client';

import { useState } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
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
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import NovelEditor from '@/components/editor/NovelEditor';

interface PostFormProps {
  mode: 'create' | 'update'; // create: 생성, update: 수정
  initialData?: {
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

  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || '');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];
      if (!validImageTypes.includes(file.type)) {
        alert('지원되지 않는 이미지 형식입니다. JPEG, PNG, GIF, WebP만 가능');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('content', formData.content);
    if (imageFile) formDataToSend.append('image', imageFile);

    await onSubmit(formDataToSend);
  };

  return (
    <div className="container mx-auto mt-[70px] max-w-4xl pb-32 pt-16">
      <Card className="rounded-lg shadow-lg">
        <CardContent className="space-y-6 p-6">
          {/* 게시물 제목 */}
          <div className="space-y-2">
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
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* 이미지 */}
          <div className="space-y-2">
            <Label className="text-lg font-bold">대표 이미지</Label>
            <div className="flex items-start gap-4">
              <div className="relative aspect-video flex-1 overflow-hidden rounded-lg bg-gray-100">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full rounded-lg object-contain shadow-lg"
                    width={500}
                    height={500}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="relative text-base font-semibold hover:bg-semtleColor"
                >
                  <input
                    type="file"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  <Upload className="mr-2 h-4 w-4" />
                  업로드
                </Button>
                {imagePreview && (
                  <Button
                    variant="outline"
                    onClick={handleImageRemove}
                    className="text-base font-semibold hover:bg-red-500"
                  >
                    <X className="mr-2 h-4 w-4" />
                    삭제
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* 유형 선택 */}
          <div className="space-y-2">
            <Label className="text-lg font-bold">게시물 유형</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="rounded-lg shadow-lg">
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

          <div className="space-y-2">
            <NovelEditor />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 px-4 pb-8 pt-4">
          <Button onClick={handleSubmit}>
            {mode === 'update' ? '수정하기' : '업로드'}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()} // 이전 페이지로 이동
            className="text-base font-semibold hover:bg-red-500"
          >
            <X className="mr-2 h-4 w-4" />
            취소
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
