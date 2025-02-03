import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해야 합니다.')
    .email('유효한 이메일 형식이 아닙니다.')
    .refine((email) => !/\s/.test(email), {
      message: '공백이 포함된 이메일은 입력할 수 없습니다.',
    }),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상 입력해야 합니다.')
    .refine((password) => /[a-z]/.test(password), {
      message: '비밀번호에 최소 1개의 영문 소문자(a-z)가 포함되어야 합니다.',
    })
    .refine((password) => /\d/.test(password), {
      message: '비밀번호에 최소 1개의 숫자(0-9)가 포함되어야 합니다.',
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message:
        '비밀번호에 최소 1개의 특수 문자( !,@,#,%,^,&,* )가 포함되어야 합니다.',
    })
    .refine((password) => !/[(){}[\]<>]/.test(password), {
      message: '비밀번호에 괄호( (,),[,],{,},<,> )를 사용할 수 없습니다.',
    })
    .refine((password) => !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password), {
      message: '비밀번호에 한글을 포함할 수 없습니다.',
    }),
});
