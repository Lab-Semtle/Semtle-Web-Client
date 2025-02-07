import { http, HttpResponse } from 'msw';
import { Post, ApiResponseWithData, ApiResponse } from '@/types/api';

/** 목업 데이터베이스 (메모리 저장소)*/
const posts = new Map<string, Post>([
  ['1', { id: '1', title: '첫 번째 게시물', content: '내용입니다.' }],
]);

/** 목업 API */
export const demoHandlers = [
  /**
   * [ GET ] /demo
   * - 모든 게시물 조회 핸들러
   */
  http.get(`/demo`, () => {
    return HttpResponse.json<ApiResponseWithData<Post[]>>({
      status: 200,
      code: 'SUCCESS',
      data: Array.from(posts.values()), // 저장된 모든 게시물 반환
    });
  }),

  /**
   * [ POST ] /demo
   * - 새 게시물 추가 핸들러
   */
  http.post<Post>('/demo', async ({ request }) => {
    const newPost = (await request.json()) as Post; // 빠른 구현을 위해 목업에서는 타입 단언 사용할 것 (as 타입명)
    posts.set(newPost.id, newPost);

    return HttpResponse.json<ApiResponseWithData<Post>>({
      status: 201,
      code: 'SUCCESS',
      data: newPost,
    });
  }),

  /**
   * [ PATCH ] /demo/:id
   * - 특정 게시물 업데이트 핸들러
   */
  http.patch('/demo/:id', async ({ params, request }) => {
    // id를 단일 값으로 변환
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const updates = (await request.json()) as Partial<Post>; // 요청 본문에서 업데이트할 데이터 가져옴

    // 게시물이 존재하는지 확인
    if (!id || !posts.has(id)) {
      return HttpResponse.json(
        {
          status: 404,
          code: 'NOT_FOUND',
          message: '업데이트할 게시물이 존재하지 않습니다.',
        },
        { status: 404 },
      );
    }

    // 기존 게시물을 업데이트 로직
    const existingPost = posts.get(id)!;
    const updatedPost = { ...existingPost, ...updates }; // 기존 데이터에 업데이트 반영
    posts.set(id, updatedPost); // 업데이트된 게시물 저장

    return HttpResponse.json<ApiResponseWithData<Post>>({
      status: 200,
      code: 'UPDATED_SUCCESSFULLY',
      data: updatedPost,
    });
  }),

  /**
   * [ DELETE ] /demo/:id
   * - 특정 게시물 삭제 핸들러
   */
  http.delete('/demo/:id', ({ params }) => {
    // id를 단일 값으로 변환
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    // 게시물이 존재하지 않을 경우
    if (!id || !posts.has(id)) {
      return HttpResponse.json(
        {
          status: 404,
          code: 'NOT_FOUND',
          message: '게시물이 존재하지 않습니다.',
        },
        { status: 404 },
      );
    }

    posts.delete(id); // 게시물 삭제

    return HttpResponse.json<ApiResponse>(
      {
        status: 200,
        code: 'DELETED_SUCCESSFULLY', // 상태 메시지 반환
      },
      { status: 200 },
    );
  }),

  /**
   * 📌 [POST] /demo/secure
   * 인증이 필요한 게시물 추가 핸들러
   */
  http.post('/demo/secure', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // 인증 토큰 확인
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          status: 401,
          code: 'UNAUTHORIZED',
          message: '인증 정보가 누락되었습니다.',
        },
        { status: 401 },
      );
    }

    // 새 게시물 추가
    const newPost = (await request.json()) as Post; // 타입 단언(목업)
    posts.set(newPost.id, newPost);

    return HttpResponse.json<ApiResponseWithData<Post>>({
      status: 201,
      code: 'SECURE_POST_CREATED',
      data: newPost,
    });
  }),
];
