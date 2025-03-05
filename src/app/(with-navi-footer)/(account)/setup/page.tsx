// /** 개인정보 관리 페이지 */

// 'use client';
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { ImageCropper } from '@/components/common/ImageCropper';
// import { PasswordInput } from '@/components/common/PasswordInput';
// import { FileWithPath, useDropzone } from 'react-dropzone';
// import {
//   useUserProfile,
//   UserProfile,
//   UserUpdateRequest,
// } from '@/hooks/api/useUserProfile';
// import { ProfileSchema } from '@/lib/validation/profile-schema';

// /** `FileWithPreview` 타입 정의 */
// interface FileWithPreview extends FileWithPath {
//   preview: string;
// }

// /** 프로필 이미지 섹션 */
// function ProfileImageSection({ user }: { user: UserProfile }) {
//   const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
//     null,
//   );
//   const [isDialogOpen, setDialogOpen] = useState(false);

//   const onDrop = (acceptedFiles: FileWithPath[]) => {
//     const file = acceptedFiles[0];
//     if (!file) {
//       alert('이미지가 너무 큽니다!');
//       return;
//     }

//     const fileWithPreview: FileWithPreview = Object.assign(file, {
//       preview: URL.createObjectURL(file),
//     });

//     setSelectedFile(fileWithPreview);
//     setDialogOpen(true);
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: { 'image/*': [] },
//   });

//   return (
//     <div className="mb-12 flex items-center space-x-6">
//       <Avatar className="h-28 w-28">
//         <AvatarImage
//           src={user?.profileImageUrl || '/images/default-profile.jpg'}
//           alt="Profile Image"
//         />
//         <AvatarFallback>{user.username}</AvatarFallback>
//       </Avatar>
//       <div {...getRootProps()} className="cursor-pointer">
//         <input {...getInputProps()} />
//         <Button variant="outline">프로필 사진 변경</Button>
//       </div>
//       {selectedFile && (
//         <ImageCropper
//           dialogOpen={isDialogOpen}
//           setDialogOpen={setDialogOpen}
//           selectedFile={selectedFile}
//           setSelectedFile={setSelectedFile}
//         />
//       )}
//     </div>
//   );
// }

// /** 비밀번호 수정 다이얼로그 창 */
// function PasswordChangeDialog() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">비밀번호 변경</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>비밀번호 변경</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-6">
//           <Label htmlFor="current-password">현재 비밀번호</Label>
//           <PasswordInput
//             id="current-password"
//             autoComplete="current-password"
//           />
//           <Label htmlFor="new-password">새 비밀번호</Label>
//           <PasswordInput id="new-password" autoComplete="new-password" />
//           <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
//           <PasswordInput id="confirm-password" autoComplete="new-password" />
//           <Button>변경하기</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// /** 개인정보 수정 폼 */
// import { Badge } from '@/components/ui/badge';

// function ProfileForm({
//   user,
//   updateUserProfile,
// }: {
//   user: UserProfile;
//   updateUserProfile: (data: UserUpdateRequest) => Promise<void>;
// }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm<UserUpdateRequest>({
//     resolver: zodResolver(ProfileSchema),
//     defaultValues: {
//       studentId: user?.studentId ?? '',
//       username: user?.username ?? '',
//       birth: user?.birth ?? '',
//       phone: user?.phone ?? '',
//     },
//   });

//   useEffect(() => {
//     setValue('studentId', user?.studentId ?? '');
//     setValue('username', user?.username ?? '');
//     setValue('birth', user?.birth ?? '');
//     setValue('phone', user?.phone ?? '');
//   }, [user, setValue]);

//   const onSubmit = async (formData: UserUpdateRequest) => {
//     try {
//       await updateUserProfile(formData);
//       alert('개인정보가 성공적으로 수정되었습니다.');
//     } catch (error) {
//       console.error('[onSubmit] 개인정보 수정 오류:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//       <div className="space-y-6">
//         <Label htmlFor="email">이메일</Label>
//         <Input id="email" value={user?.email} disabled />

//         <Label htmlFor="studentId">학번</Label>
//         <Input id="studentId" {...register('studentId')} />
//         {errors.studentId && (
//           <p className="text-red-500">{errors.studentId.message}</p>
//         )}

//         <Label htmlFor="username">이름</Label>
//         <Input id="username" {...register('username')} />
//         {errors.username && (
//           <p className="text-red-500">{errors.username.message}</p>
//         )}

//         <Label htmlFor="birth">생년월일</Label>
//         <Input id="birth" {...register('birth')} placeholder="YYYY-MM-DD" />
//         {errors.birth && <p className="text-red-500">{errors.birth.message}</p>}

//         <Label htmlFor="phone">전화번호</Label>
//         <Input id="phone" {...register('phone')} placeholder="전화번호 입력" />
//         {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

//         {/* 권한 (수정 불가) */}
//         <Label>권한</Label>
//         <Badge
//           variant="outline"
//           className={
//             user.role === 'ADMIN'
//               ? 'bg-red-500 text-white'
//               : 'bg-gray-500 text-white'
//           }
//         >
//           {user.role}
//         </Badge>

//         {/* 승인 여부 (수정 불가) */}
//         <Label>승인 상태</Label>
//         <Badge
//           variant="outline"
//           className={
//             user.manageApprovalStatus
//               ? 'bg-green-500 text-white'
//               : 'bg-yellow-500 text-white'
//           }
//         >
//           {user.manageApprovalStatus ? '승인됨' : '미승인'}
//         </Badge>
//       </div>

//       <Separator className="mb-12" />
//       <PasswordChangeDialog />

//       <div className="flex justify-end gap-4">
//         <Button variant="outline">취소</Button>
//         <Button type="submit">저장</Button>
//       </div>
//     </form>
//   );
// }

// /** 개인정보 설정 페이지 */
// export default function ProfileSettingsPage() {
//   const { user, isLoading, updateUserProfile } = useUserProfile();

//   if (isLoading) return <p>로딩 중...</p>;
//   if (!user) return <p>사용자 정보를 불러올 수 없습니다.</p>;

//   return (
//     <main className="flex min-h-screen flex-col justify-between">
//       <section className="container mx-auto max-w-3xl px-8 py-40">
//         <h1 className="mb-12 text-4xl font-bold leading-tight tracking-tight">
//           개인정보 관리
//         </h1>
//         <ProfileImageSection user={user} />
//         <Separator className="mb-12" />
//         <ProfileForm user={user} updateUserProfile={updateUserProfile} />
//       </section>
//     </main>
//   );
// }

'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
// import { toast } from '@/registry/new-york/hooks/use-toast';
import { toast } from '@/hooks/useToast';

import {
  useUserProfile,
  UserProfile,
  UserUpdateRequest,
} from '@/hooks/api/useUserProfile';
import { ProfileSchema } from '@/lib/validation/profile-schema';

/** Form 타입 설정 */
type ProfileFormValues = z.infer<typeof ProfileSchema>;

function ProfileForm({
  user,
  updateUserProfile,
}: {
  user: UserProfile;
  updateUserProfile: (data: UserUpdateRequest) => Promise<void>;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      studentId: user?.studentId ?? '',
      username: user?.username ?? '',
      birth: user?.birth ?? '',
      phone: user?.phone ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      studentId: user?.studentId ?? '',
      username: user?.username ?? '',
      birth: user?.birth ?? '',
      phone: user?.phone ?? '',
    });
  }, [user, form.reset]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      await updateUserProfile(data);
      toast({
        title: '성공',
        description: '개인정보가 성공적으로 수정되었습니다.',
      });
    } catch (error) {
      console.error('[onSubmit] 개인정보 수정 오류:', error);
      toast({
        title: '오류',
        description: '개인정보 수정 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 이메일 (수정 불가, FormField에서 제거) */}
        <FormItem>
          <Label>이메일</Label>
          <Input value={user?.email} disabled />
        </FormItem>

        {/* 학번 */}
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <Label>학번</Label>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 이름 */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Label>이름</Label>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 생년월일 */}
        <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem>
              <Label>생년월일</Label>
              <FormControl>
                <Input placeholder="YYYY-MM-DD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 전화번호 */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <Label>전화번호</Label>
              <FormControl>
                <Input placeholder="전화번호 입력" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 권한 (수정 불가) */}
        <FormItem>
          <Label>권한</Label>
          <Badge
            variant="outline"
            className={
              user.role === 'ADMIN'
                ? 'bg-red-500 text-white'
                : 'bg-gray-500 text-white'
            }
          >
            {user.role}
          </Badge>
        </FormItem>

        {/* 승인 여부 (수정 불가) */}
        <FormItem>
          <Label>승인 상태</Label>
          <Badge
            variant="outline"
            className={
              user.manageApprovalStatus
                ? 'bg-green-500 text-white'
                : 'bg-yellow-500 text-white'
            }
          >
            {user.manageApprovalStatus ? '승인됨' : '미승인'}
          </Badge>
        </FormItem>

        <Separator className="mb-12" />

        <div className="flex justify-end gap-4">
          <Button variant="outline">취소</Button>
          <Button type="submit">저장</Button>
        </div>
      </form>
    </Form>
  );
}

/** 개인정보 설정 페이지 */
export default function ProfileSettingsPage() {
  const { user, isLoading, updateUserProfile } = useUserProfile();

  if (isLoading) return <p>로딩 중...</p>;
  if (!user) return <p>사용자 정보를 불러올 수 없습니다.</p>;

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <section className="container mx-auto max-w-3xl px-8 py-40">
        <h1 className="mb-12 text-4xl font-bold leading-tight tracking-tight">
          개인정보 관리
        </h1>
        <ProfileForm user={user} updateUserProfile={updateUserProfile} />
      </section>
    </main>
  );
}
