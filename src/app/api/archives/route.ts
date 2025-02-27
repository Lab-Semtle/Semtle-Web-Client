import { NextResponse } from 'next/server';

const mockPosts = [
  {
    board_id: 10,
    writer: '작성자 10',
    content: '이것은 10번째 게시물입니다.',
    title: '족보 테스트 내용 10후후후후후후후후',
    createdAt: '2025-02-24T16:10:34.047+00:00',
    imageUrl: ['/temp-server/sample-3.jpg'],
    fileUrl: ['https://example.com/sample-file-10.pdf'],
  },
  {
    board_id: 9,
    writer: '작성자 9',
    content: '이것은 9번째 게시물입니다.',
    title: '족보 테스트 내용 9',
    createdAt: '2025-02-24T16:05:28.198+00:00',
    imageUrl: ['/temp-server/sample-2.jpg'],
    fileUrl: ['https://example.com/sample-file-9.pdf'],
  },
  {
    board_id: 8,
    writer: '작성자 8',
    content: '이것은 8번째 게시물입니다.',
    title: '족보 테스트 내용 8',
    createdAt: '2025-02-24T16:00:22.123+00:00',
    imageUrl: ['/temp-server/sample-1.jpg'],
    fileUrl: ['https://example.com/sample-file-8.pdf'],
  },
  {
    board_id: 7,
    writer: '작성자 7',
    content: '이것은 7번째 게시물입니다.',
    title: '족보 테스트 내용 7',
    createdAt: '2025-02-24T15:55:45.567+00:00',
    imageUrl: ['/temp-server/sample-7.jpg'],
    fileUrl: ['https://example.com/sample-file-7.pdf'],
  },
  {
    board_id: 6,
    writer: '작성자 6',
    content: '이것은 6번째 게시물입니다.',
    title: '족보 테스트 내용 6',
    createdAt: '2025-02-24T15:50:39.890+00:00',
    imageUrl: ['/temp-server/sample-6.jpg'],
    fileUrl: ['https://example.com/sample-file-6.pdf'],
  },
  {
    board_id: 5,
    writer: '작성자 5',
    content: '이것은 5번째 게시물입니다.',
    title: '족보 테스트 내용 5',
    createdAt: '2025-02-24T15:45:15.345+00:00',
    imageUrl: ['/temp-server/sample-5.jpg'],
    fileUrl: ['https://example.com/sample-file-5.pdf'],
  },
  {
    board_id: 4,
    writer: '작성자 4',
    content: '이것은 4번째 게시물입니다.',
    title: '족보 테스트 내용 4',
    createdAt: '2025-02-24T15:40:59.678+00:00',
    imageUrl: ['/temp-server/sample-4.jpg'],
    fileUrl: ['https://example.com/sample-file-4.pdf'],
  },
  {
    board_id: 3,
    writer: '작성자 3',
    content: '이것은 3번째 게시물입니다.',
    title: '족보 테스트 내용 3',
    createdAt: '2025-02-24T15:35:47.890+00:00',
    imageUrl: ['/temp-server/sample-3.jpg'],
    fileUrl: ['https://example.com/sample-file-3.pdf'],
  },
  {
    board_id: 2,
    writer: '작성자 2',
    content: '이것은 2번째 게시물입니다.',
    title: '족보 테스트 내용 2',
    createdAt: '2025-02-24T15:30:28.198+00:00',
    imageUrl: ['/temp-server/sample-2.jpg'],
    fileUrl: ['https://example.com/sample-file-2.pdf'],
  },
  {
    board_id: 1,
    writer: '작성자 1',
    content: '이것은 1번째 게시물입니다.',
    title: '족보 테스트 내용 1',
    createdAt: '2025-02-24T15:25:34.047+00:00',
    imageUrl: ['/temp-server/sample-1.jpg'],
    fileUrl: ['https://example.com/sample-file-1.pdf'],
  },
];

export async function GET(req: Request) {
  try {
    console.log('📢 GET 요청 수신됨:', req.url);
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const size = parseInt(searchParams.get('size') || '10', 10);
    const searchKeyword = searchParams.get('search_keyword') || '';

    console.log('🔍 검색어:', searchKeyword);
    console.log('📄 페이지 정보:', { page, size });

    let filteredPosts = mockPosts;

    if (searchKeyword) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchKeyword.toLowerCase()),
      );
    }

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / size);
    const paginatedPosts = filteredPosts.slice((page - 1) * size, page * size);

    console.log('📑 페이징 결과:', paginatedPosts.length, '개 게시물 반환');

    return NextResponse.json(
      {
        success: true,
        message: '족보 게시판 목록 얻어오기 성공',
        data: {
          total_posts: totalPosts,
          current_page: page,
          total_pages: totalPages,
          posts: paginatedPosts,
        },
        error: null,
      },
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

export async function POST(req: Request) {
  try {
    console.log('📢 POST 요청 수신됨:', req.url);

    const authHeader = req.headers.get('Authorization');
    console.log('🔑 인증 헤더:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn('⚠️ 인증 실패 - Authorization 헤더가 없음');
      return NextResponse.json(
        {
          success: false,
          message: '인증이 필요합니다.',
          error: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    const body = await req.json();
    console.log('📩 수신된 데이터:', body);

    // 필수 필드 검증
    if (!body.title || !body.content || !body.writer || !body.id) {
      console.warn('⚠️ 필수 값 누락');
      return NextResponse.json(
        {
          success: false,
          message: '필수 값이 누락되었습니다.',
          error: 'Invalid Request',
        },
        { status: 400 },
      );
    }

    const newPost = {
      board_id: mockPosts.length + 1,
      writer: body.writer,
      content: body.content,
      title: body.title,
      uuid: body.uuid,
      createdAt: new Date().toISOString(),
      imageUrl: body.imageUrl || ['/temp-server/default.jpg'],
      fileUrl: body.fileUrl || [],
    };

    mockPosts.push(newPost);
    console.log('✅ 게시글 추가됨:', newPost);

    return NextResponse.json(
      {
        success: true,
        message: 'Secret Note 게시물이 성공적으로 등록되었습니다.',
        data: { post_id: newPost.board_id, created_at: newPost.createdAt },
        error: null,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('❌ POST 요청 처리 중 오류:', error);
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
