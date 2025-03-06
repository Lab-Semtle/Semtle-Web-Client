'use client';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FolderArchive, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchNcpPresignedUrl } from '@/hooks/api/useFetchNcpPresignedUrls';

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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // `params`를 언래핑
  const { id } = React.use(params);

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다.');
      router.push('/signin');
      return;
    }

    const getPost = async () => {
      if (!session?.accessToken) {
        console.error('인증 토큰이 없습니다.');
        return;
      }

      try {
        const response = await fetch(
          API_ROUTES.GET_ARCHIVE_DETAIL(Number(id)),
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.accessToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('데이터를 가져오는 데 실패했습니다.');
        }

        const res = await response.json();
        console.log(`[족보 게시물] API :`, res);

        if (!res.success || !res.data) {
          throw new Error('유효한 데이터를 받지 못했습니다.');
        }

        console.log('[secret/id]--------');
        // Presigned URL 변환 적용 (이미지 + 파일)
        const transformedImages = await Promise.all(
          (res.data.imageUrl ?? []).map(async (url: string, index: number) => ({
            image_id: `img-${index}`,
            image_url: await fetchNcpPresignedUrl(url), // Presigned URL 변환
            image_name: `이미지-${index + 1}`,
          })),
        );

        console.log('[secret/id]--------');
        const transformedAttachments = await Promise.all(
          (res.data.fileUrl ?? []).map(async (url: string, index: number) => ({
            file_id: index,
            file_url: await fetchNcpPresignedUrl(url), // Presigned URL 변환
            file_name: `첨부파일-${index + 1}`,
            file_type: url.split('.').pop() ?? 'unknown',
            file_size: '알 수 없음',
          })),
        );

        // API 응답을 PostDetail 타입으로 변환
        const mappedPost: PostDetail = {
          post_id: res.data.board_id,
          title: res.data.title,
          writer: res.data.writer,
          content: res.data.content ?? '',
          created_at: res.data.createdAt,
          images: transformedImages,
          attachments: transformedAttachments,
        };

        setPost(mappedPost);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated' && id) {
      getPost();
    }
  }, [id, status, session?.accessToken, router]);

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;

  if (!post) {
    return (
      <p className="mt-[100px] text-center text-xl font-semibold">
        존재하지 않는 게시물입니다.
      </p>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mb-36 mt-40 max-w-4xl p-4">
        <Card className="border-none bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="space-y-6">
              <h1 className="text-left text-4xl font-bold">{post.title}</h1>
              <div className="flex w-full items-center justify-between border-b pb-4 text-sm dark:text-gray-200">
                <p className="text-lg font-medium">{post.writer}</p>
                <span className="text-lg font-medium dark:text-gray-200">
                  {formatDate(post.created_at)}
                </span>
              </div>

              {(post.images ?? []).length > 0 && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <Image
                    src={
                      post.images?.[0]?.image_url ??
                      '/images/kmou_2023_spring.jpg'
                    }
                    alt="게시물 이미지"
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              )}

              <div className="min-h-[150px] whitespace-pre-line text-lg font-medium">
                {post.content}
              </div>

              <div className="mt-6">
                {(post.attachments ?? []).length > 0 ? (
                  <div className="space-y-4">
                    {(post.attachments ?? []).map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800"
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
                  <p className="text-gray-200">첨부된 파일이 없습니다.</p>
                )}
              </div>

              <div className="mt-10 flex justify-center gap-5">
                <Link href="/secret">
                  <Button>목록으로</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 날짜 포맷 함수
const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
