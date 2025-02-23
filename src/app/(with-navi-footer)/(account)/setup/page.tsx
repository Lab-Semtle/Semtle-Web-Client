'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ImageCropper } from '@/components/common/ImageCropper';
import { PasswordInput } from '@/components/common/PasswordInput';
import { FileWithPath, useDropzone } from 'react-dropzone';

// 📌 API 요청 타입 정의
interface UserProfile {
  name: string;
  birth: string;
  phone: string;
  profileImageUrl?: string;
}

// 📌 Zod 유효성 검사 스키마
const ProfileSchema = z.object({
  name: z.string().min(2, '이름은 최소 2자 이상 입력해야 합니다.'),
  birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다.'),
  phone: z
    .string()
    .min(10, '전화번호는 최소 10자리여야 합니다.')
    .regex(/^\d+$/, '숫자만 입력 가능합니다.'),
  profileImageUrl: z.string().optional(),
});

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export default function ProfileSettingsPage() {
  const userId = 'test-uuid-12345';

  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null,
  );
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfile>({
    resolver: zodResolver(ProfileSchema),
  });

  useEffect(() => {
    if (!userId) return;

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/members/${userId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        setUser(data);

        setValue('name', data.name);
        setValue('birth', data.birth);
        setValue('phone', data.phone);
        setValue('profileImageUrl', data.profileImageUrl || '');
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, setValue]);

  const onSubmit = async (formData: UserProfile) => {
    try {
      setLoading(true);
      const response = await fetch(`/members/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('개인정보 수정 중 오류 발생');
      }

      const updatedData = await response.json();
      setUser(updatedData);
      alert('개인정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert('이미지가 너무 큽니다!');
      return;
    }

    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    setSelectedFile(fileWithPreview);
    setDialogOpen(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <section className="container mx-auto max-w-3xl px-8 py-40">
        {/* 📌 페이지 타이틀 */}
        <h1 className="mb-12 text-4xl font-bold leading-tight tracking-tight">
          개인정보 수정
        </h1>

        {/* 📌 프로필 이미지 수정 */}
        <div className="mb-12 flex items-center space-x-6">
          <Avatar className="h-28 w-28">
            <AvatarImage
              src={user?.profileImageUrl || '/images/default-profile.png'}
              alt="Profile Image"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <Button variant="outline">프로필 사진 변경</Button>
          </div>

          {selectedFile && (
            <ImageCropper
              dialogOpen={isDialogOpen}
              setDialogOpen={setDialogOpen}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          )}
        </div>

        <Separator className="mb-12" />

        {/* 📌 기본 정보 수정 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <Label htmlFor="name">이름</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <Label htmlFor="birth">생년월일</Label>
            <Input id="birth" {...register('birth')} placeholder="YYYY-MM-DD" />
            {errors.birth && (
              <p className="text-red-500">{errors.birth.message}</p>
            )}

            <Label htmlFor="phone">전화번호</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="전화번호 입력"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <Separator className="mb-12" />

          {/* 📌 비밀번호 변경 */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">비밀번호 변경</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>비밀번호 변경</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <Label htmlFor="current-password">현재 비밀번호</Label>
                <PasswordInput
                  id="current-password"
                  autoComplete="current-password"
                />

                <Label htmlFor="new-password">새 비밀번호</Label>
                <PasswordInput id="new-password" autoComplete="new-password" />

                <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
                <PasswordInput
                  id="confirm-password"
                  autoComplete="new-password"
                />

                <Button>변경하기</Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex justify-end gap-4">
            <Button variant="outline">취소</Button>
            <Button type="submit" disabled={loading}>
              {loading ? '저장 중...' : '저장'}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
