'use client';

import { useState } from 'react';
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import PostFileUploader from '@/components/file/PostFileUploader';

export type FormValues = {
  title: string;
  content?: string;
  created_at: string;
  imagePath?: string;
  filePaths?: string[];
};

type SecretNoteEditorProps = {
  mode: 'create' | 'update';
  initialValues?: FormValues;
  onSubmit: (formData: FormData) => Promise<void>;
};

export default function SecretNoteEditor({
  mode,
  initialValues,
  onSubmit,
}: SecretNoteEditorProps) {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string | undefined>(undefined);
  const [filePaths, setFilePaths] = useState<string[]>([]);

  const methods = useForm<FormValues>({
    defaultValues: initialValues || {
      title: '',
      content: '',
      created_at: new Date().toISOString(),
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  /** 파일 업로드 성공 시 파일 경로 저장 */
  const handleFileUploadSuccess = (uploadedFilePath: string) => {
    setFilePaths((prev) => [...prev, uploadedFilePath]);
  };

  /** 이미지 업로드 성공 시 이미지 경로 저장 */
  const handleImageUploadSuccess = (uploadedImagePath: string) => {
    setImagePath(uploadedImagePath);
  };

  /** 취소 버튼 클릭 시 초기화 */
  const handleCancel = () => {
    reset();
    setImagePath(undefined);
    setFilePaths([]);
    window.history.back();
  };

  /** 폼 제출 핸들러 */
  const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('📌 현재 업로드된 이미지 경로:', imagePath);
    console.log('📌 현재 업로드된 파일 경로 리스트:', filePaths);

    const formDataToSend = new FormData();
    formDataToSend.append('title', data.title);
    formDataToSend.append('content', data.content || '');
    formDataToSend.append('created_at', data.created_at);
    if (imagePath) {
      formDataToSend.append('imagePath', imagePath);
    } else {
      console.warn('⚠️ imagePath가 존재하지 않음');
    }
    filePaths.forEach((filePath, index) => {
      console.log(`📌 추가되는 파일 경로 [${index}]:`, filePath);
      formDataToSend.append('filePaths', filePath);
    });

    console.log(
      '📌 최종 FormData 데이터:',
      Object.fromEntries(formDataToSend.entries()),
    );

    setSubmitLoading(true);
    try {
      await onSubmit(formDataToSend);
    } catch (error) {
      console.error('제출 오류:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-4 max-w-4xl bg-transparent pb-32">
      <Card className="rounded-lg shadow-md dark:border-zinc-800 dark:bg-zinc-800">
        <CardContent className="space-y-6 p-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {/* 제목 입력 */}
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-lg font-semibold text-zinc-900 dark:text-white"
                >
                  제목
                </Label>
                <Input
                  id="title"
                  {...register('title', { required: '제목을 입력해주세요.' })}
                  className="h-12 w-full border-gray-300 text-lg font-medium text-zinc-900 dark:border-zinc-600 dark:bg-gray-900 dark:text-white"
                  placeholder="제목을 입력하세요."
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* 작성일 */}
              <div className="mt-4 space-y-2">
                <Label className="text-lg font-semibold text-zinc-900 dark:text-white">
                  작성일
                </Label>
                <Input
                  {...register('created_at')}
                  className="h-12 w-full border-zinc-300 text-lg font-medium text-gray-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
                  disabled
                />
              </div>

              {/* 대표 이미지 업로드 */}
              <div className="mt-4 space-y-2">
                <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                  대표 이미지
                </Label>
                <PostFileUploader
                  uploadPath="secret"
                  onUploadSuccess={handleImageUploadSuccess}
                />
              </div>

              {/* 내용 입력 */}
              <div className="mt-4 space-y-2">
                <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                  내용
                </Label>
                <Textarea
                  {...register('content')}
                  className="h-48 w-full rounded-lg border-zinc-300 p-4 text-lg font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  placeholder="글을 작성하세요."
                />
              </div>

              {/* 첨부 파일 업로드 */}
              <div className="mt-4 space-y-2">
                <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                  첨부 파일
                </Label>
                <PostFileUploader
                  uploadPath="secret"
                  onUploadSuccess={handleFileUploadSuccess}
                />
              </div>

              {/* 제출 및 취소 버튼 */}
              <CardFooter className="mt-14 flex justify-end gap-3">
                <Button
                  type="submit"
                  disabled={submitLoading}
                  className="text-base font-semibold dark:bg-semtle-dark dark:text-gray-800 dark:hover:bg-semtle-lite"
                >
                  {submitLoading
                    ? '업로드 중...'
                    : mode === 'update'
                      ? '수정하기'
                      : '업로드'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="text-base font-semibold hover:bg-red-500 dark:border-gray-500 dark:text-white dark:hover:bg-red-700"
                >
                  <X className="mr-2 h-4 w-4" /> 취소
                </Button>
              </CardFooter>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
