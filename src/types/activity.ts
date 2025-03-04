import { z } from 'zod';

/** 활동 게시물 API 응답 타입 (백엔드 원본) */
const ActivityPostResponseSchema = z.object({
  board_id: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  writer: z.string(),
  type: z.string(),
  images: z.array(z.string().nullable()).optional(),
});

/** 활동 게시물 목록 조회 API 응답 타입 */
const ActivityResponseSchema = z.object({
  total_post: z.number(),
  current_page: z.number(),
  total_pages: z.number(),
  posts: z.array(ActivityPostResponseSchema),
});

/** 활동 게시물 상세 조회 API 응답 타입 */
const ActivityPostDetailSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: ActivityPostResponseSchema.optional(),
  error: z.string().nullable().optional(),
});

/** 프론트에서 사용할 활동 게시물 타입 */
export interface ActivityPost {
  id: number; // board_id → id 로 변경
  title: string;
  content: string;
  created_at: string; // createdAt → created_at
  writer: string;
  type: string;
  image_url?: string; // images 배열에서 첫 번째 이미지만 사용
}

/** 백엔드 응답을 프론트에서 사용할 형식으로 변환하는 함수 */
export function mapActivityPost(
  apiResponse: z.infer<typeof ActivityPostResponseSchema>,
): ActivityPost {
  return {
    id: apiResponse.board_id, // board_id → id
    title: apiResponse.title,
    content: apiResponse.content,
    created_at: apiResponse.createdAt, // createdAt → created_at
    writer: apiResponse.writer,
    type: apiResponse.type,
    image_url: apiResponse.images?.[0] ?? undefined, // 첫 번째 이미지만 사용
  };
}

/** 활동 게시물 목록을 변환하는 함수 */
export function mapActivityList(
  apiResponse: z.infer<typeof ActivityResponseSchema>,
) {
  return {
    total_posts: apiResponse.total_post,
    current_page: apiResponse.current_page,
    total_pages: apiResponse.total_pages,
    posts: apiResponse.posts.map(mapActivityPost),
  };
}

/** 활동 게시물 상세 변환 함수 */
export function mapActivityDetail(
  apiResponse: z.infer<typeof ActivityPostDetailSchema>,
) {
  if (!apiResponse.data) {
    throw new Error(
      apiResponse.error ?? '상세 게시물 정보를 가져올 수 없습니다.',
    );
  }

  return {
    ...mapActivityPost(apiResponse.data),
    images: apiResponse.data.images?.filter((img) => img !== null) ?? [],
  };
}
