'use client';
import { useState } from 'react';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import SecretFileUploader from './uploader/SecretFileUploader';
import SecretImageUploader from './uploader/SecretImageUploader';

type FileItem = {
  id?: string;
  name: string;
  size: number | string;
  url?: string;
  file?: File;
};
export type FormValues = {
  title: string;
  content?: string;
  created_at: string;
  initialFiles?: FileItem[];
  initialImages?: FileItem[];
  deletedFiles?: string[];
  deletedImages?: string[];
};

type SecretNoteEditorProps = {
  initialValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
  isEdit?: boolean;
};

export default function SecretNoteEditor({
  initialValues,
  onSubmit,
  isEdit = false,
}: SecretNoteEditorProps) {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const handleRemoveFile = (fileId: string) => {
    setDeletedFileIds((prev) => [...prev, fileId]); // 삭제된 파일 id 추가
  };
  const handleRemoveImage = (imageId: string) => {
    setDeletedImageIds((prev) => [...prev, imageId]);
  };

  const deleteFilesFromServer = async (fileIds: string[]) => {
    try {
      const response = await fetch(`/api/files/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileIds }),
      });

      if (!response.ok) {
        throw new Error('파일 삭제 실패');
      }
    } catch (error) {
      console.error('파일 삭제 중 오류 발생:', error);
    }
  };

  const methods = useForm<FormValues>({
    defaultValues: initialValues || {
      title: '',
      content: '',
      created_at: new Date().toISOString(),
    },
  });

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const title = watch('title') || '';

  const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
    const completeData = {
      ...data,
      deletedFiles: deletedFileIds,
      deletedImages: deletedImageIds,
    };
    setSubmitLoading(true);
    try {
      if (deletedFileIds.length > 0) {
        await deleteFilesFromServer(deletedFileIds);
      }
      if (deletedImageIds.length > 0) {
        await deleteFilesFromServer(deletedImageIds); // 이미지도 같은 API 사용 가능
      }

      await onSubmit(completeData); // props로 전달받은 onSubmit 호출
    } catch (error) {
      console.error('제출 오류:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const MAX_TITLE_LENGTH = 100;

  return (
    <div>
      <h1 className="text-[30px]">{isEdit ? '글 수정' : '글쓰기'}</h1>
      <hr className="mb-2 border-t-2 border-gray-400" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-2 ml-4 flex items-center gap-6">
            <Label htmlFor="title" className="w-auto text-lg font-semibold">
              제목
            </Label>
            <Input
              id="title"
              {...register('title', {
                required: '제목을 입력해주세요.',
                maxLength: {
                  value: MAX_TITLE_LENGTH,
                  message: `최대 ${MAX_TITLE_LENGTH}자까지 입력할 수 있습니다.`,
                },
              })}
              className="h-[40px] flex-1 resize-none border p-2 text-xl"
              placeholder="제목을 입력해주세요."
            />
            {errors.title && (
              <p className="text-sm text-red-500">
                {errors.title.message as string}
              </p>
            )}
            <p className="text-sm text-gray-500">
              {title.length}/{MAX_TITLE_LENGTH} 글자
            </p>
            {title.length > MAX_TITLE_LENGTH && (
              <p className="text-red-500">글자 수가 초과되었습니다.</p>
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
                  {...register('created_at')}
                  className="h-[40px] w-[200px] resize-none"
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <SecretImageUploader
                initialImages={initialValues?.initialImages || []}
                onRemoveImage={handleRemoveImage}
              />
            </div>
          </div>
          <hr className="border-t-1 mb-2 border-gray-300" />

          <div className="mb-2 flex flex-col">
            <Textarea
              {...register('content')}
              className="h-[500px] w-full rounded-lg border p-4"
              rows={8}
              placeholder="글을 작성하세요."
            />
          </div>

          <SecretFileUploader
            initialFiles={initialValues?.initialFiles || []}
            onRemoveFile={handleRemoveFile}
          />
          <hr className="border-t-1 mb-2 mt-2 border-gray-300" />
          <Button type="submit" disabled={submitLoading}>
            {submitLoading ? '업로드 중...' : isEdit ? '수정하기' : '올리기'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
