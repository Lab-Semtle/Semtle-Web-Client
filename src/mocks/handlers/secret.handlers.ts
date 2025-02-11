import { HttpResponse, http } from 'msw';
import { SecretPost } from '@/types/api';


export const secretPostHandlers = [
  http.get('/api/secret/:id', async ({ params }) => {
    const { id } = params;
    console.log('Requested post ID:', id);  // 추가된 로그
    const post = posts.find((p) => p.post_id === Number(id));
    if (!post) {
      return HttpResponse.json(
        { message: '게시글을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return HttpResponse.json(post, { status: 200 });
  }),
];

const posts: SecretPost[] = [
  {
    post_id: 1,
    title: '알고리즘 기출 문제',
    writer: '김철수',
    image_url: ['/1.jpg', '/2.jpg', '/3.jpg'],
    attachments: [
      {
        file_id: 1001,
        file_url: 'https://example.com/uploads/file1.pdf',
        file_name: '컴구조_기출문제.pdf',
        file_type: 'pdf',
        file_size: '2MB',
      },
      {
        file_id: 1002,
        file_url: 'https://example.com/uploads/file2.hwp',
        file_name: '컴구조_정리노트.hwp',
        file_type: 'hwp',
        file_size: '1.5MB',
      },
    ],
    created_at: '2025-02-01T10:30:00Z',
  },
];