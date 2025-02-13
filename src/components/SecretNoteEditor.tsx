'use client';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import SecretFileUploader from './SecretFileUploader';
import SecretImageUploader from './SecretImageUploader';

type FormValues = {
  title: string;
  content?: string;
  created_at: string;
};
export default function SecretNoteEditor() {
  const methods = useForm<FormValues>();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const router = useRouter();
  const title = watch('title') || '';

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const completeData = {
      ...data,
      created_at: new Date().toISOString(),
    };
    try {
      const response = await fetch('/archives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeData),
      });

      if (!response.ok) {
        throw new Error(`서버 요청 실패: ${response.status}`);
      }

      const result = await response.json();
      if (!result.post_id) {
        throw new Error('post_id가 반환되지 않았습니다.');
      }

      router.push(`/secret/${result.post_id}`);
    } catch (error) {
      console.error('제출 오류:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const MAX_TITLE_LENGTH = 100;

  return (
    <div>
      <h1 className="text-[30px]">글쓰기</h1>
      <hr className="mb-2 border-t-2 border-gray-400" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <p className="text-red-500">
                글자 수가 초과되었습니다.
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
              <SecretImageUploader />
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

          {/* 파일 업로드 */}
          <SecretFileUploader />
          <hr className="border-t-1 mb-2 mt-2 border-gray-300" />
          <Button type="submit">올리기</Button>
        </form>
      </FormProvider>
    </div>
  );
}
