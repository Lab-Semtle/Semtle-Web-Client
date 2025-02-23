'use client';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { notFound } from 'next/navigation';
import PostCarousel from '@/components/PostCarousel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FolderArchive } from 'lucide-react';
import { Download } from 'lucide-react';
import Image from 'next/image';

const fetchSecretPost = async (post_id: string) => {
  const posts = [
    {
      post_id: 1,
      title: '알고리즘 기출 문제',
      writer: '김철수',
      image_url: ['/1.jpg', '/2.jpg', '/3.jpg'],
      contents: `### 주요 기출 포인트
- 🔥 **캐시 메모리**: CPU와 메모리 사이의 데이터를 빠르게 접근하기 위한 임시 저장소
- 🧠 **파이프라이닝**: 명령어 처리 단계를 겹쳐서 처리 시간을 단축
- 🖥️ **메모리 계층**: L1, L2, L3 캐시와 메인 메모리의 계층 구조
- ⚡ **멀티코어 처리**: 여러 프로세서 코어를 활용하여 병렬 처리 성능 향상
- 🔄 **버퍼와 큐**: 데이터의 임시 저장 및 큐잉을 통한 효율적인 처리
- 📊 **명령어 세트 아키텍처(ISA)**: 프로세서가 인식할 수 있는 명령어의 집합
- 💾 **디스크 I/O**: 디스크와 CPU 간의 데이터 전송 속도 최적화
- 🔐 **암호화 및 보안**: 데이터를 보호하기 위한 암호화 기술과 보안 처리`,

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
  const postId = Number(post_id);
  return posts.find((post) => post.post_id === postId) || null;
};

type SecretPost = {
  post_id: number;
  title: string;
  writer: string;
  image_url?: string[];
  contents?: string;
  attachments?: {
    file_id: number;
    file_url: string;
    file_name: string;
    file_type: string;
    file_size: string;
  }[];
  created_at: string;
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<SecretPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = React.use(params);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPost = await fetchSecretPost(id);
      if (fetchedPost) {
        setPost(fetchedPost);
      } else {
        notFound();
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (!post) {
    return <p className="mt-[100px]">존재하지 않는 게시물입니다.</p>;
  }

  if (loading) return <p>Loading...</p>;

  const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  console.log(post);
  return (
    <div className="flex flex-col items-center">
      <div className="mt-[130px] w-full max-w-[800px] px-4">
        <h1 className="text-center text-4xl font-bold">{post!.title}</h1>
        <p className="mt-[10px] text-center text-xl text-gray-500">
          {formatDate(post!.created_at)}
        </p>
        <p className="mt-[10px] text-center">{post!.writer}</p>
      </div>

      <div className="mb-[30px] mt-[10px] w-full max-w-[800px] px-4">
        {post.image_url && post.image_url.length > 0 ? (
          post.image_url.length === 1 ? (
            <div className="relative h-[500px] w-full">
              <Image
                src={post.image_url[0]}
                alt={`Post Image`}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          ) : (
            <PostCarousel imageUrls={post.image_url} />
          )
        ) : null}
      </div>
      <div className="mt-[30px] flex w-full max-w-[1200px] justify-center px-4">
        {post.contents && (
          <div>
            <p className="whitespace-pre-line text-lg leading-relaxed">
              {post.contents}
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
        {!post.image_url?.length && !post.attachments?.length && (
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
