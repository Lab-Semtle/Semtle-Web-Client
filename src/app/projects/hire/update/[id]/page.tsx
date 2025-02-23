'use client'; // 클라이언트 컴포넌트로 지정

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Calendar } from '@/components/ui/calendar';

// 상태 데이터 타입 정의
interface PostData {
  projectTitle: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  contact: string;
  projectType: string;
  categories: string[];
  content: string;
  images: string[];
}

const RecruitmentPostPage = ({ id }: { id: string }) => {
  const [postData, setPostData] = useState<PostData>({
    projectTitle: '',
    startDate: undefined,
    endDate: undefined,
    contact: '',
    projectType: '',
    categories: [],
    content: '',
    images: [],
  });

  // API에서 게시물 데이터를 가져오기
  useEffect(() => {
    console.log(id);
    if (!id) return;

    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/post?id=${id}`);
        const data = await response.json();
        // 받아온 데이터에서 Date 객체로 변환할 값이 있을 경우 처리
        setPostData({
          ...data,
          startDate: data.startDate ? new Date(data.startDate) : undefined,
          endDate: data.endDate ? new Date(data.endDate) : undefined,
        });
      } catch (error) {
        console.error('Failed to fetch post data:', error);
      }
    };
    fetchPostData();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setPostData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...newImages],
      }));
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({
      ...postData,
      projectTitle: e.target.value,
    });
  };

  return (
    <div className="mx-auto max-w-4xl bg-white p-6 shadow-md" style={{ paddingTop: '80px' }}>
      {/* 프로젝트 제목 입력란 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">프로젝트 제목</label>
        <Input
          type="text"
          value={postData.projectTitle}
          onChange={handleTitleChange}
          className="mt-2 w-full rounded-md border border-gray-300 bg-gray-50 p-3"
          placeholder="프로젝트 제목을 입력하세요"
        />
      </div>
      <hr className="my-6 border-t-2 border-gray-300" />

      <div className="mb-6 grid grid-cols-2 gap-6">
        <p>
          <strong>게시 일자:</strong> {postData.startDate ? postData.startDate.toLocaleDateString() : '미정'}
        </p>
      </div>

      {/* 진행 기간 설정 */}
      <div className="mb-6 grid grid-cols-2 gap-6">
        <div>
          <label className="font-semibold text-gray-700">시작 날짜</label>
          <Calendar
            mode="single"
            selected={postData.startDate}
            onSelect={(date) => setPostData({ ...postData, startDate: date })}
            className="rounded-md border shadow"
          />
        </div>
        <div>
          <label className="font-semibold text-gray-700">종료 날짜</label>
          <Calendar
            mode="single"
            selected={postData.endDate}
            onSelect={(date) => setPostData({ ...postData, endDate: date })}
            className="rounded-md border shadow"
          />
        </div>
      </div>

      {/* 문의 링크 입력란 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">문의 링크</label>
        <Input
          type="text"
          value={postData.contact}
          onChange={(e) => setPostData({ ...postData, contact: e.target.value })}
          className="mt-2 w-full rounded-md border border-gray-300 bg-gray-50 p-3"
          placeholder="https://open.kakao.com/..."
        />
      </div>

      {/* 프로젝트 타입 선택 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">프로젝트 타입</label>
        <Select
          value={postData.projectType}
          onValueChange={(value) => setPostData({ ...postData, projectType: value })}
        >
          <SelectTrigger className="w-full rounded-md border border-gray-300 bg-gray-50 p-3">
            {postData.projectType}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="해커톤">해커톤</SelectItem>
            <SelectItem value="개발">개발</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 관련 분야 선택 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">관련 분야</label>
        <div className="mt-2 flex flex-wrap gap-4">
          {['Android', 'Web', 'AI', 'IoT'].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                checked={postData.categories.includes(category)}
                onCheckedChange={() => {
                  setPostData((prevData) => ({
                    ...prevData,
                    categories: prevData.categories.includes(category)
                      ? prevData.categories.filter((c) => c !== category)
                      : [...prevData.categories, category],
                  }));
                }}
              />
              <span
                className={`text-sm ${postData.categories.includes(category) ? 'font-semibold text-blue-500' : 'text-gray-700'}`}
              >
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 게시물 내용 입력 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">게시물 내용</label>
        <Textarea
          value={postData.content}
          onChange={(e) => setPostData({ ...postData, content: e.target.value })}
          className="w-full rounded-md border border-gray-300 bg-gray-50 p-3"
          rows={10}
        />
      </div>

      {/* 이미지 업로드 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">게시물 이미지</label>
        <Input
          type="file"
          multiple
          onChange={handleImageChange}
          className="mt-2 rounded-md border border-gray-300 bg-gray-50 p-3"
        />
        <div className="mt-4 flex space-x-4 overflow-x-auto">
          {postData.images.map((image, index) => (
            <Card key={index} className="flex h-32 w-32 items-center justify-center rounded-md shadow-md">
              <CardContent>
                <Image src={image} alt={`uploaded-${index}`} className="h-full w-full rounded-md object-cover" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="mb-6 flex justify-center space-x-4">
        <Button variant="outline" className="block w-full">
          모집 신청하기
        </Button>
      </div>

      <div className="flex justify-between space-x-4">
        <Button variant="outline" className="flex-1">
          이전 게시물
        </Button>
        <Button variant="outline" className="flex-1">
          목록 화면
        </Button>
        <Button variant="outline" className="flex-1">
          다음 게시물
        </Button>
      </div>
    </div>
  );
};

export default RecruitmentPostPage;
