import { z } from 'zod';

/** 활동 게시물 API 응답 타입 (백엔드 원본) */
export const ActivityPostResponseSchema = z.object({
  board_id: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  writer: z.string(),
  type: z.string(),
  images: z.array(z.string().nullable()).optional(),
});

/** 활동 게시물 목록 조회 API 응답 타입 */
export const ActivityResponseSchema = z.object({
  total_post: z.number(),
  current_page: z.number(),
  total_pages: z.number(),
  posts: z.array(ActivityPostResponseSchema),
});

/** 활동 게시물 상세 조회 API 응답 타입 */
export const ActivityPostDetailSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ActivityPostResponseSchema.optional(),
  error: z.string().nullable().optional(),
});

/** 프론트에서 사용할 활동 게시물 타입 */
export type ActivityPost = z.infer<typeof ActivityPostResponseSchema>;
