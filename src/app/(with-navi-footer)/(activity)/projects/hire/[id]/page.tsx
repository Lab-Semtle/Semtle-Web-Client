'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// 📌 postData의 타입 명시
type PostData = {
  projectTitle: string;
  startDate?: string;
  endDate?: string;
  contact?: string;
  categories?: string[];
  content?: string;
  images?: string[];
};

const RecruitmentPostViewPage = () => {
  const router = useRouter();

  // 📌 `useParams()` 사용 시 `id`의 타입을 명확히 변환
  const params = useParams();
  const id = params?.id as string | undefined; // `id`가 `string`이 아니면 `undefined`

  const [postData, setPostData] = useState<PostData | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 📌 `selectedImage` 타입 지정

  useEffect(() => {
    if (!id) return; // `id`가 없으면 요청하지 않음

    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/projects?id=${id}`);

        if (!response.ok) throw new Error('게시물을 불러오는 데 실패했습니다.');

        const data: PostData = await response.json();
        setPostData(data);
        console.log('get project post response : ', data);
      } catch (error) {
        console.error('Failed to fetch post data:', error);
      }
    };

    fetchPostData();
  }, [id]);

  if (!postData) {
    return <p className="text-center text-gray-500">게시물을 불러오는 중...</p>;
  }

  return (
    <>
      <div className="mx-auto mb-36 mt-36 max-w-4xl rounded-lg p-6 shadow-md dark:bg-zinc-800">
        <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-gray-200">
          {postData.projectTitle || '제목 없음'}
        </h1>
        <hr className="my-6 border-t-2 border-gray-300" />

        <div className="mb-6 grid grid-cols-2 gap-6">
          <p>
            <strong>게시 일자:</strong> {postData.startDate || '미정'}
          </p>
          <p>
            <strong>진행 기간:</strong> {postData.startDate || '미정'} ~{' '}
            {postData.endDate || '미정'}
          </p>
        </div>

        <div className="mb-6">
          <label className="font-semibold text-gray-700 dark:text-gray-200">
            문의
          </label>
          <p className="break-words text-blue-500 underline">
            {postData.contact ? (
              <a
                href={postData.contact}
                target="_blank"
                rel="noopener noreferrer"
              >
                {postData.contact}
              </a>
            ) : (
              '문의 정보 없음'
            )}
          </p>
        </div>

        <div className="mb-6">
          <label className="font-semibold text-gray-700 dark:text-gray-200">
            유형
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {postData.categories && postData.categories.length > 0 ? (
              postData.categories.map((category, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-500 px-3 py-1 text-sm text-white"
                >
                  {category}
                </span>
              ))
            ) : (
              <p className="text-gray-500">카테고리 없음</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="font-semibold text-gray-700 dark:text-gray-200">
            프로젝트 설명
          </label>
          <p className="mt-2 text-gray-800">
            {postData.content || '설명 없음'}
          </p>
        </div>

        <div className="mb-6">
          <label className="font-semibold text-gray-700 dark:text-gray-200">
            게시물 이미지
          </label>
          <div className="mt-4 flex space-x-4 overflow-x-auto">
            {postData.images?.length ? (
              postData.images.map((image, index) => (
                <Card
                  key={index}
                  className="relative h-32 w-32 rounded-md shadow-md"
                >
                  <CardContent className="relative h-full w-full">
                    <Image
                      src={image}
                      alt={`uploaded-${index}`}
                      fill
                      className="cursor-pointer rounded-md object-cover"
                      onClick={() => setSelectedImage(image)}
                    />
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">이미지 없음</p>
            )}
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative max-w-3xl rounded-md bg-white p-6">
              <button
                className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
                onClick={() => setSelectedImage(null)}
              >
                X
              </button>
              <div className="relative h-[500px] w-full">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between space-x-4">
          <Button
            type="submit"
            onClick={() => router.push(`/projects/hire/apply/${id}`)}
            className="w-1/2 bg-semtle-dark text-black hover:bg-semtle-lite dark:bg-semtle-dark dark:hover:bg-semtle-lite"
          >
            참여 신청하기
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/projects')}
            className="w-1/2"
          >
            목록 화면
          </Button>
        </div>
      </div>
    </>
  );
};

export default RecruitmentPostViewPage;
