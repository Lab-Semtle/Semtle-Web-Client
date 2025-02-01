'use client';

import { useParams, useRouter } from 'next/navigation'; // next/navigation 사용
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const RecruitmentPostViewPage = () => {
  const router = useRouter();
  const { id } = useParams();  // 동적 경로에서 'id' 추출
  const [postData, setPostData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!id) return; // id가 없으면 요청 안 함

    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/post?id=${id}`);
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error('Failed to fetch post data:', error);
      }
    };
    fetchPostData();
  }, [id]); // id가 바뀔 때마다 데이터 요청

  if (!postData) {
    return <p className="text-center text-gray-500">게시물을 불러오는 중...</p>;
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-center text-3xl font-bold text-gray-900">
        {postData.projectTitle || '제목 없음'}
      </h1>
      <hr className="my-6 border-t-2 border-gray-300" />

      <div className="mb-6 grid grid-cols-2 gap-6">
        <p><strong>게시 일자:</strong> {postData.startDate || '미정'}</p>
        <p><strong>진행 기간:</strong> {postData.startDate || '미정'} ~ {postData.endDate || '미정'}</p>
      </div>

      <div className="mb-6">
        <label className="font-semibold text-gray-700">문의 링크</label>
        <p className="break-words text-blue-500 underline">
          {postData.contact ? (
            <a href={postData.contact} target="_blank" rel="noopener noreferrer">
              {postData.contact}
            </a>
          ) : (
            '문의 정보 없음'
          )}
        </p>
      </div>

      <div className="mb-6">
        <label className="font-semibold text-gray-700">게시물 이미지</label>
        <div className="mt-4 flex space-x-4 overflow-x-auto">
          {(postData.images || []).length > 0 ? (
            postData.images.map((image, index) => (
              <Card key={index} className="relative h-32 w-32 rounded-md shadow-md">
                <CardContent className="relative w-full h-full">
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
          <div className="relative max-w-3xl p-6 bg-white rounded-md">
            <button className="absolute right-2 top-2 p-2 bg-red-500 text-white rounded-full" onClick={() => setSelectedImage(null)}>
              X
            </button>
            <div className="relative w-full h-[500px]">
              <Image src={selectedImage} alt="Selected" fill className="object-contain" />
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex justify-center space-x-4">
        <Button variant="primary" onClick={() => router.push('/update')}>업데이트</Button>
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <Button variant="primary">모집 신청하기</Button>
      </div>

      <div className="flex justify-between space-x-4">
        <Button variant="outline" className="flex-1">이전 게시물</Button>
        <Button variant="outline" className="flex-1" onClick={() => router.push('/')}>목록 화면</Button>
        <Button variant="outline" className="flex-1">다음 게시물</Button>
      </div>
    </div>
  );
};

export default RecruitmentPostViewPage;
