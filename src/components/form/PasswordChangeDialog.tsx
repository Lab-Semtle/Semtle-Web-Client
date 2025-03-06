'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/useToast';
import { API_ROUTES } from '@/constants/ApiRoutes';

/** 비밀번호 변경 폼 스키마 */
const PasswordSchema = z
  .object({
    verificationCode: z.string().min(4, '인증번호를 입력하세요.'),
    currentPassword: z.string().min(6, '현재 비밀번호를 입력하세요.'),
    newPassword: z.string().min(6, '새 비밀번호는 최소 6자 이상이어야 합니다.'),
    confirmNewPassword: z.string().min(6, '새 비밀번호 확인을 입력하세요.'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: ['confirmNewPassword'],
  });

export default function PasswordChangeDialog({
  isOpen,
  onClose,
  userEmail,
}: {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}) {
  const { data: session } = useSession();
  const token = session?.accessToken || '';

  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 모달 상태 유지 (새로고침해도 유지됨)
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem('passwordModalOpen', 'true');
    } else {
      localStorage.removeItem('passwordModalOpen');
    }
  }, [isOpen]);

  const form = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      verificationCode: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  /** 인증번호 요청 */
  const sendVerificationCode = async () => {
    setIsSendingCode(true);
    try {
      console.log(
        '🔹 인증번호 요청 시작:',
        API_ROUTES.AUTH_USER_PASSWORD_EMAIL,
      );
      console.log('요청 이메일:', userEmail);

      const response = await fetch(API_ROUTES.AUTH_USER_PASSWORD_EMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: userEmail }),
      });

      console.log('서버 응답 상태 코드:', response.status);

      const responseText = await response.text();
      const result = responseText ? JSON.parse(responseText) : {};

      console.log('파싱된 응답:', result);

      if (!response.ok || !result.success) {
        console.error('인증번호 발송 실패:', result);
        throw new Error(result.message || '인증번호 발송 실패');
      }

      toast({
        title: '인증번호 발송',
        description: '이메일로 인증번호가 발송되었습니다!',
      });
    } catch (error) {
      console.error('인증번호 요청 실패:', error);
      toast({
        title: '오류',
        description: error.message || '인증번호 요청 중 문제가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingCode(false);
    }
  };

  /** 비밀번호 변경 요청 */
  const onSubmit = async (data: z.infer<typeof PasswordSchema>) => {
    setIsSubmitting(true);
    try {
      console.log(
        '비밀번호 변경 요청 시작:',
        API_ROUTES.AUTH_USER_PASSWORD_RESET,
      );

      const response = await fetch(API_ROUTES.AUTH_USER_PASSWORD_RESET, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token: data.verificationCode,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
        }),
      });

      console.log('서버 응답 상태 코드:', response.status);

      const responseText = await response.text();
      const result = responseText ? JSON.parse(responseText) : {};

      console.log('파싱된 응답:', result);

      if (!response.ok || !result.success) {
        console.error('비밀번호 변경 실패:', result);
        throw new Error(result.message || '비밀번호 변경 실패');
      }

      toast({
        title: '비밀번호 변경 완료',
        description: '비밀번호가 성공적으로 변경되었습니다!',
      });

      onClose(); // 모달 닫기
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      toast({
        title: '오류',
        description: error.message || '비밀번호 변경 중 문제가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>비밀번호 변경</DialogTitle>
          <DialogDescription>
            비밀번호를 변경하려면 인증번호를 입력하세요. 인증번호 요청 버튼을
            클릭하면 본인 계정 이메일로 인증번호가 발송됩니다.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* 인증번호 요청 */}
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <Label>인증번호</Label>
                  <div className="flex space-x-2">
                    <FormControl>
                      <Input
                        {...field}
                        className="flex-1"
                        placeholder="인증번호 입력"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={sendVerificationCode}
                      disabled={isSendingCode}
                    >
                      {isSendingCode ? '발송 중...' : '인증번호 요청'}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 현재 비밀번호 */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>현재 비밀번호</Label>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        {...field}
                        placeholder="현재 비밀번호 입력"
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-3"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* 새 비밀번호 */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>새 비밀번호</Label>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        placeholder="새 비밀번호 입력"
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 새 비밀번호 확인 */}
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <Label>새 비밀번호 확인</Label>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...field}
                        placeholder="새 비밀번호 재입력"
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 버튼 */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '변경 중...' : '변경하기'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
