'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, ImageOff } from 'lucide-react';
import { SHOWCASE_DATA, ShowcaseDetail } from '@/constants/showcaseData';

const PostDetail = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const [post, setPost] = useState<ShowcaseDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const projectId = Number(id); // id를 숫자로 변환
      const foundPost = SHOWCASE_DATA.find((item) => item.id === projectId);

      if (foundPost) {
        setPost(foundPost);
      } else {
        setError('게시물을 찾을 수 없습니다.');
      }
    }
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>로딩 중...</p>;

  return (
    <div className="mx-auto mb-32 mt-32 max-w-5xl rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-200">{post.summary}</p>
      {/* 카테고리 + 관련 분야 (일렬 태그) */}
      <div className="mt-2 flex flex-wrap gap-2">
        {/* 카테고리 태그 */}
        <span className="rounded-full bg-blue-500 px-4 py-1 text-sm text-white">
          {post.category}
        </span>

        {/* 관련 분야 태그 */}
        {post.relatedFields?.map((field, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-300 px-4 py-1 text-sm text-gray-700"
          >
            #{field}
          </span>
        ))}
      </div>

      {/* 이미지 */}
      <div className="mt-4">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={300}
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-52 w-full items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700">
            <ImageOff className="h-10 w-10 text-gray-500 dark:text-gray-400" />
          </div>
        )}
      </div>

      {/* 프로젝트 정보 */}
      <div className="mt-4">
        <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Calendar className="h-5 w-5" />
          진행 기간: {post.duration || '미정'}
        </p>
        <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Users className="h-5 w-5" />
          팀원: {post.participants ? `${post.participants}명` : '미정'}
        </p>
      </div>

      {/* 결과물 링크 */}
      {post.result_url && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">결과물</h3>
          <Link href={post.result_url} className="text-blue-500 underline">
            {post.result_url}
          </Link>
        </div>
      )}

      {/* 참여 인원 */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">참여 인원</h3>
        {post.members?.length ? (
          <ul className="mt-2 list-disc pl-5 text-gray-700 dark:text-gray-200">
            {post.members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">참여 인원 정보가 없습니다.</p>
        )}
      </div>

      {/* 프로젝트 설명 */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">프로젝트 설명</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-200">
          {post.contents || '설명이 없습니다.'}
        </p>
      </div>
    </div>
  );
};

export default PostDetail;
