import { NextResponse } from 'next/server';

const mockPosts = [
  {
    post_id: 10,
    title: '족보 게시물 제목 1',
    writer: '작성자 1',
    content: '이것은 첫 번째 족보 게시물입니다.',
    created_at: '2025-02-27T05:48:03.917Z',
    images: [
      {
        image_id: 'img-1',
        image_url: '/temp-server/sample-1.jpg',
        image_name: 'sample-1.jpg',
      },
    ],
    attachments: [
      {
        file_id: 101,
        file_url: 'https://example.com/sample-file-1.pdf',
        file_name: 'sample-file-1.pdf',
        file_type: 'pdf',
        file_size: '2MB',
      },
    ],
  },
  {
    post_id: 2,
    title: '족보 게시물 제목 2',
    writer: '작성자 2',
    content: '이것은 두 번째 족보 게시물입니다.',
    created_at: '2025-02-28T12:34:56.789Z',
    images: [],
    attachments: [],
  },
];

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    console.log(`📢 GET 요청 수신됨: /api/archives/${params.id}`);

    const postId = parseInt(params.id, 10);
    if (isNaN(postId)) {
      return NextResponse.json(
        {
          success: false,
          message: '유효하지 않은 게시물 ID',
          error: 'Invalid Request',
        },
        { status: 400 },
      );
    }

    const post = mockPosts.find((p) => p.post_id === postId);
    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: '게시물을 찾을 수 없습니다.',
          error: 'Not Found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: '게시물 조회 성공', data: post, error: null },
      { status: 200 },
    );
  } catch (error) {
    console.error('❌ GET 요청 처리 중 오류:', error);
    return NextResponse.json(
      {
        success: false,
        message: '서버 내부 오류',
        error: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
