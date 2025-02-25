/** 개인정보 관리 페이지 */

'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

import { useUserProfile } from '@/hooks/api/useFetchUserProfile';
import { ProfileSchema } from '@/lib/validation/profile-schema';

/** 프로필 이미지 섹션 */
function ProfileImageSection({ user }: { user: UserProfile }) {
  const [selectedFile, setSelectedFile] = useState<FileWithPath | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert('이미지가 너무 큽니다!');
      return;
    }
    setSelectedFile(
      Object.assign(file, { preview: URL.createObjectURL(file) }),
    );
    setDialogOpen(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  return (
    <div className="mb-12 flex items-center space-x-6">
      <Avatar className="h-28 w-28">
        <AvatarImage
          src={user?.profileImageUrl || '/images/default-profile.jpg'}
          alt="Profile Image"
        />
        <AvatarFallback>User Profile</AvatarFallback>
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
  );
}

/** 비밀번호 수정 다이얼로그 창 */
function PasswordChangeDialog() {
  return (
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
          <PasswordInput id="confirm-password" autoComplete="new-password" />
          <Button>변경하기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** 개인정보 수정 폼 */
function ProfileForm({
  user,
  updateUserProfile,
}: {
  user: UserProfile;
  updateUserProfile: (data: UserProfile) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfile>({ resolver: zodResolver(ProfileSchema) });

  const onSubmit = async (formData: UserProfile) => {
    try {
      await updateUserProfile(formData);
      alert('개인정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('[onSubmit] 개인정보 수정 오류:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <Label htmlFor="name">이름</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <Label htmlFor="birth">생년월일</Label>
        <Input id="birth" {...register('birth')} placeholder="YYYY-MM-DD" />
        {errors.birth && <p className="text-red-500">{errors.birth.message}</p>}

        <Label htmlFor="phone">전화번호</Label>
        <Input id="phone" {...register('phone')} placeholder="전화번호 입력" />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>
      <Separator className="mb-12" />
      <PasswordChangeDialog />
      <div className="flex justify-end gap-4">
        <Button variant="outline">취소</Button>
        <Button type="submit">저장</Button>
      </div>
    </form>
  );
}

/** 개인정보 설정 페이지 */
export default function ProfileSettingsPage() {
  const { user, loading, updateUserProfile } = useUserProfile();

  if (loading) return <p>로딩 중...</p>;
  if (!user) return <p>사용자 정보를 불러올 수 없습니다.</p>;

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <section className="container mx-auto max-w-3xl px-8 py-40">
        <h1 className="mb-12 text-4xl font-bold leading-tight tracking-tight">
          개인정보 관리
        </h1>
        <ProfileImageSection user={user} />
        <Separator className="mb-12" />
        <ProfileForm user={user} updateUserProfile={updateUserProfile} />
      </section>
    </main>
  );
}
