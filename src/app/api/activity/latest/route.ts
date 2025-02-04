import { NextResponse } from 'next/server';
const newsData = [
  {
    id: 101,
    imageSrc: '/1.jpg',
    newsTitle: '게시글 제목 1',
    newsContent:
      '게시글 1의 간략한 내용이 여기에 표시됩니다.게시글 1의 간략한 내용이 여기에 표시됩니다.게시글 1의 간략한 내용이 여기에 표시됩니다.',
    created_at: '2025-01-01T12:00:00Z',
    link_url: '/activity/101',
  },
  {
    id: 102,
    imageSrc: '/2.jpg',
    newsTitle: '게시글 제목 2',
    newsContent:
      '게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩게시글 2의 간략한 내용이 여기에 표시됩니다.니다.게시글 2의 간략한 내용이 여기에 표시됩니다.게시글 2의 간략한 내용이 여기에 표시됩니다.',
    created_at: '2025-01-02T12:00:00Z',
    link_url: '/activity/102',
  },
  {
    id: 103,
    imageSrc: '/3.jpg',
    newsTitle: '게시글 제목 3',
    newsContent:
      '게시글 3의 간략한 내용이 여기에 표시됩니다.게시글 3의 간략한 내용이 여기에 표시됩니다.게시글 3의 간략한 내용이 여기에 표시됩니다.',
    created_at: '2025-01-03T12:00:00Z',
    link_url: '/activity/103',
  },
];

export async function GET() {
  return NextResponse.json(newsData); // JSON 데이터를 반환
}
