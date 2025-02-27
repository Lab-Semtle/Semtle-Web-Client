'use client';
import { useState, useEffect } from 'react';
import * as React from 'react';
import PostCarousel from '@/components/sections/PostCarousel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FolderArchive, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// 게시글 내용 조회 Data Fetching 타입 정의
type PostDetail = {
  post_id: number;
  title: string;
  writer: string;
  content?: string;
  created_at: string;
  images?: {
    image_id: string;
    image_url: string;
    image_name: string;
  }[];
  attachments?: {
    file_id: number;
    file_url: string;
    file_name: string;
    file_type: string;
    file_size: string;
  }[];
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = React.use(params); // 🔥 Promise 해제하여 id 가져오기

  // 게시글 데이터 가져오기
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`/api/archives/${id}`);

        if (!response.ok) {
          throw new Error('데이터를 가져오는 데 실패했습니다.');
        }

        const json = await response.json();
        setPost(json.data);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getPosts();
    }
  }, [id]);

  if (!post) {
    return (
      <p className="mt-[100px] text-center text-xl font-semibold">
        존재하지 않는 게시물입니다.
      </p>
    );
  }

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;

  console.log(post);
  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="container mx-auto mb-36 mt-40 max-w-4xl p-4">
        <Card className="border-none bg-gray-100 shadow-none dark:bg-gray-900">
          <CardContent className="p-0">
            <div className="space-y-6">
              {/* 제목 */}
              <h1 className="text-left text-4xl font-bold">{post.title}</h1>

              {/* 작성자 & 작성일 */}
              <div className="flex w-full items-center justify-between border-b pb-4 text-sm text-gray-500">
                <p className="text-lg font-medium">{post.writer}</p>
                <span className="text-lg font-medium dark:text-white">
                  {formatDate(post.created_at)}
                </span>
              </div>

              {/* 대표 이미지 */}
              {post.images && post.images.length > 0 && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src={post.images[0].image_url}
                    alt="게시물 이미지"
                    fill
                    className="rounded-xl object-cover"
                    priority
                  />
                </div>
              )}

              {/* 게시물 내용 */}
              <div className="min-h-[150px] whitespace-pre-line text-lg font-medium">
                {post.content}
              </div>

              {/* 첨부 파일 */}
              <div className="mt-6">
                {post.attachments && post.attachments.length > 0 ? (
                  <div className="space-y-4">
                    {post.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                      >
                        <div className="flex items-center gap-3">
                          <FolderArchive className="text-gray-500 dark:text-gray-300" />
                          <Link
                            href={file.file_url}
                            download={file.file_name}
                            className="text-lg font-medium text-blue-600 hover:underline dark:text-blue-400"
                          >
                            {file.file_name}
                          </Link>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 dark:text-gray-300">
                            {file.file_size}
                          </span>
                          <Link
                            href={file.file_url}
                            download={file.file_name}
                            className="text-blue-600 hover:underline dark:text-blue-400"
                          >
                            <Download className="h-5 w-5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">첨부된 파일이 없습니다.</p>
                )}
              </div>

              {/* 버튼 */}
              <div className="mt-10 flex justify-center gap-5">
                <Link href="/secret">
                  <Button>목록으로</Button>
                </Link>
                <Link href={`/secret/edit/${id}`}>
                  <Button className="bg-gray-500">수정하기</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
