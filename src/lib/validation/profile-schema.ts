import { z } from 'zod';

export const ProfileSchema = z.object({
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
