'use client';
import { useState, useEffect } from 'react';
import * as React from 'react';
import PostCarousel from '@/components/PostCarousel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FolderArchive } from 'lucide-react';
import { Download } from 'lucide-react';
import Image from 'next/image';

//NOTE - 게시글 내용 조회 Data Fetching 타입 정의
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
  const { id } = React.use(params);

  //NOTE - id 게시글 Data Fetching
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL_PROD}/archives/${id}`,
        );

        if (!response.ok) {
          throw new Error('데이터를 가져오는 데 실패했습니다.');
        }

        const json: PostDetail = await response.json();
        setPost(json);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [id]);

  if (!post) {
    return <p className="mt-[100px]">존재하지 않는 게시물입니다.</p>;
  }

  if (loading) return <p>Loading...</p>;

  console.log(post);
  return (
    <div className="flex flex-col items-center">
      <div className="mt-[130px] w-full max-w-[800px] px-4">
        <h1 className="text-center text-4xl font-bold">{post.title}</h1>
        <p className="mt-[10px] text-center text-xl text-gray-500">
          {formatDate(post.created_at)}
        </p>
        <p className="mt-[10px] text-center">{post.writer}</p>
      </div>

      <div className="mb-[30px] mt-[10px] w-full max-w-[800px] px-4">
        {post.images && post.images.length > 0 ? (
          post.images.length === 1 ? (
            <div className="relative h-[500px] w-full">
              <Image
                src={post.images[0].image_url}
                alt={`Post Image`}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          ) : (
            <PostCarousel
              imageUrls={post.images.map((image) => image.image_url)}
            />
          )
        ) : null}
      </div>
      <div className="mt-[30px] flex w-full max-w-[1200px] justify-center px-4">
        {post.content && (
          <div>
            <p className="whitespace-pre-line text-lg leading-relaxed">
              {post.content}
            </p>
          </div>
        )}
      </div>
      <div className="mt-[60px]">
        {post.attachments && post.attachments.length > 0 && (
          <div className="space-y-4">
            {post.attachments.map((file, index) => (
              <div
                key={index}
                className="mx-auto w-[600px] rounded-lg border border-gray-300 p-4"
              >
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FolderArchive className="mr-3" />
                      <Link
                        href={file.file_url}
                        download={file.file_name}
                        className="hover:underline"
                      >
                        {file.file_name}
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-500">
                        {file.file_size}
                      </span>
                      <Link
                        href={file.file_url}
                        download={file.file_name}
                        className="text-blue-600 hover:underline"
                      >
                        <Download className="text-blue-700" />
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
        {!post.attachments?.length && (
          <p className="text-gray-400">첨부된 이미지나 파일이 없습니다.</p>
        )}
      </div>
      <div className="mb-[60px] mt-[60px] flex w-full max-w-[800px] justify-center gap-4 px-4">
        <Link href="/secret">
          <Button>목록으로</Button>
        </Link>
        <Link href={`/secret/edit/${id}`}>
          <Button className="bg-gray-500">수정하기</Button>
        </Link>
      </div>
    </div>
  );
}
const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
