import { NextResponse } from 'next/server';

const mockPosts = [
  {
    board_id: 1,
    title: '제목1 테스트',
    content: '내용1 임시 테스트 1',
    writer: '작성자1',
    createdAt: '2025-02-25',
    images: ['/temp-server/sample-1.jpg'],
    type: '공지',
  },
  {
    board_id: 2,
    title: '제목2',
    content: '내용2',
    writer: '작성자2',
    createdAt: '2025-02-26',
    images: ['/temp-server/sample-1.jpg'],
    type: '세미나',
  },
];

export async function GET(
  req: Request,
  { params }: { params: { post_id: string } },
) {
  try {
    const postId = parseInt(params.post_id, 10);

    if (isNaN(postId)) {
      return NextResponse.json(
        {
          success: false,
          message: '잘못된 요청: board_id가 숫자가 아닙니다.',
          error: 'Invalid Request',
        },
        { status: 400 },
      );
    }

    const post = mockPosts.find((p) => p.board_id === postId);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: '해당 게시물을 찾을 수 없습니다.',
          error: 'Not Found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: '게시물 읽기 성공',
        data: post,
        error: null,
      },
      { status: 200 },
    );
  } catch (error) {
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
