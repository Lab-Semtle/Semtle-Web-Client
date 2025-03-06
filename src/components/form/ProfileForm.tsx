'use client';

import { useEffect, useState } from 'react';
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
import { toast } from '@/hooks/useToast';

import { UserProfile, UserUpdateRequest } from '@/hooks/api/useUserProfile';
import { ProfileSchema } from '@/lib/validation/profile-schema';
import PasswordChangeDialog from '@/components/form/PasswordChangeDialog';

/** Form 타입 설정 */
type ProfileFormValues = z.infer<typeof ProfileSchema>;

export default function ProfileForm({
  user,
  updateUserProfile,
  onPasswordChange,
}: {
  user: UserProfile;
  updateUserProfile: (data: UserUpdateRequest) => Promise<void>;
  onPasswordChange: () => void;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      studentId: user?.studentId ?? '',
      username: user?.username ?? '',
      birth: user?.birth ? user.birth.split('T')[0] : '', // YYYY-MM-DD 형식 유지
      phone: user?.phone ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      studentId: user?.studentId ?? '',
      username: user?.username ?? '',
      birth: user?.birth ? user.birth.split('T')[0] : '',
      phone: user?.phone ?? '',
    });
  }, [user, form.reset]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      await updateUserProfile({
        ...data,
        birth: data.birth ? new Date(data.birth).toISOString() : undefined,
      });

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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 권한 & 승인 여부 (최상단 배치) */}
          <div className="flex flex-row space-x-4">
            <Badge
              variant="outline"
              className={
                user.role === 'ADMIN'
                  ? 'bg-red-500 px-4 py-1 text-base text-white'
                  : 'bg-gray-500 px-4 py-1 text-base text-white'
              }
            >
              {user.role}
            </Badge>
            <Badge
              variant="outline"
              className={
                user.manageApprovalStatus
                  ? 'bg-green-500 px-4 py-1 text-base text-white'
                  : 'bg-yellow-500 px-4 py-1 text-base text-white'
              }
            >
              {user.manageApprovalStatus ? '승인됨' : '미승인'}
            </Badge>
          </div>

          <Separator className="mb-6" />

          {/* 이름 */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-semibold">이름</Label>
                <FormControl>
                  <Input className="p-5 text-lg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 학번 */}
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-semibold">학번</Label>
                <FormControl>
                  <Input className="p-5 text-lg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 이메일 (수정 불가) */}
          <FormItem>
            <Label className="text-lg font-semibold">이메일</Label>
            <Input
              className="bg-gray-200 p-5 text-lg dark:bg-gray-800"
              value={user?.email}
              disabled
            />
          </FormItem>

          {/* 생년월일 */}
          <FormField
            control={form.control}
            name="birth"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-semibold">생년월일</Label>
                <FormControl>
                  <Input
                    className="p-5 text-lg"
                    placeholder="YYYY-MM-DD"
                    {...field}
                  />
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
                <Label className="text-lg font-semibold">전화번호</Label>
                <FormControl>
                  <Input
                    className="p-5 text-lg"
                    placeholder="전화번호 입력"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="mb-12" />

          {/* 버튼 그룹 */}
          <div className="flex justify-end gap-4">
            {/* 저장 & 취소 버튼 (오른쪽) */}
            <Button
              type="submit"
              className="px-6 py-3 text-lg hover:bg-semtle-lite dark:hover:bg-semtle-dark"
            >
              수정하기
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="bg-zinc-200 px-6 py-3 text-lg hover:bg-semtle-lite dark:bg-zinc-800 dark:hover:bg-semtle-dark dark:hover:text-black"
              onClick={onPasswordChange}
            >
              비밀번호 변경하기
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
