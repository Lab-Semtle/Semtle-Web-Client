'use client';

import { format } from 'date-fns';
import {
  ArrowLeft,
  ArrowRight,
  Pencil,
  Trash2,
  ListFilter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface PostDetailProps {
  post?: {
    id: number;
    title: string;
    content: string;
    image: string;
    date: string;
    category: string;
  };
}

export default function PostDetail({ post }: PostDetailProps) {
  const defaultPost = {
    id: 1,
    title: '2025 셈틀',
    content: `이건 글이다 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 
    이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다.
    이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다.이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. `,
    image: '/semtle_logo_2022_square.jpg',
    date: new Date().toISOString(),
    category: '세미나',
  };

  const currentPost = post || defaultPost;

  const handleDelete = () => {
    if (confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      console.log('Delete post:', currentPost.id);
    }
  };

  const handleModify = () => {
    console.log('Modify post:', currentPost.id);
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="space-y-6">
            <h1 className="text-center text-3xl font-bold">
              {currentPost.title}
            </h1>

            <div className="flex items-center justify-between border-b pb-4 text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>
                  작성일: {format(new Date(currentPost.date), 'yyyy.MM.dd')}
                </span>
                <span>분류: {currentPost.category}</span>
              </div>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={currentPost.image || '/placeholder.svg'}
                alt=""
                className="h-full w-full rounded-lg object-contain"
              />
            </div>

            <div className="min-h-[200px] whitespace-pre-line">
              {currentPost.content}
            </div>

            <div className="flex items-center justify-between border-t pt-6">
              <div className="flex gap-2">
                {/* 삭제버튼 숨김처리시 hidden 클래스 추가하면 됨 */}
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4 opacity-100" />
                  삭제
                </Button>
                {/* 수정버튼 숨김처리시 ohidden 클래스 추가하면 됨 */}
                <Button variant="outline" onClick={handleModify}>
                  <Pencil className="mr-2 h-4 w-4 opacity-100" />
                  수정
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  이전
                </Button>
                <Button variant="outline">
                  <ListFilter className="mr-2 h-4 w-4" />
                  목록
                </Button>
                <Button variant="outline">
                  다음
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
