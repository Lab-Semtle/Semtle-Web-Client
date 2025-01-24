"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const RecruitmentPostViewPage = () => {
  const [postData, setPostData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // 클릭한 이미지를 저장

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch("/api/projectupdate"); // 실제 API 엔드포인트에 맞게 수정
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };
    fetchPostData();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image); // 이미지를 클릭하면 해당 이미지가 선택됨
  };

  const handleCloseModal = () => {
    setSelectedImage(null); // 모달 닫기
  };

  if (!postData) {
    return <p className="text-center text-gray-500">게시물을 불러오는 중...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        {postData.projectTitle || "제목 없음"}
      </h1>
      <hr className="my-6 border-t-2 border-gray-300" />

      <div className="grid grid-cols-2 gap-6 mb-6">
        <p><strong>게시 일자:</strong> {postData.startDate || "미정"}</p>
        <p><strong>진행 기간:</strong> {postData.startDate || "미정"} ~ {postData.endDate || "미정"}</p>
      </div>

      <div className="mb-6">
        <label className="font-semibold text-gray-700">문의 링크</label>
        <p className="text-blue-500 underline break-words">
          {postData.contact ? (
            <a href={postData.contact} target="_blank" rel="noopener noreferrer">
              {postData.contact}
            </a>
          ) : "문의 정보 없음"}
        </p>
      </div>

      <div className="mb-6">
        <label className="font-semibold text-gray-700">프로젝트 타입</label>
        <p className="text-gray-900">{postData.projectType || "미정"}</p>
      </div>

      <div className="mb-6">
        <label className="font-semibold text-gray-700">관련 분야</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {(postData.categories || []).length > 0 ? (
            postData.categories.map((category, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {category}
              </span>
            ))
          ) : (
            <p className="text-gray-500">관련 분야 없음</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="font-semibold text-gray-700">게시물 내용</label>
        <p className="text-gray-800 whitespace-pre-line">
          {postData.content || "내용 없음"}
        </p>
      </div>

      <div className="mb-6">
        <label className="font-semibold text-gray-700">게시물 이미지</label>
        <div className="flex space-x-4 overflow-x-auto mt-4">
          {(postData.images || []).length > 0 ? (
            postData.images.map((image, index) => (
              <Card key={index} className="w-32 h-32 flex items-center justify-center shadow-md rounded-md">
                <CardContent>
                  <img
                    src={image}
                    alt={`uploaded-${index}`}
                    className="w-full h-full object-cover rounded-md cursor-pointer"
                    onClick={() => handleImageClick(image)} // 이미지 클릭 시 해당 이미지를 선택
                  />
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">이미지 없음</p>
          )}
        </div>
      </div>

      {/* 모달: 이미지 클릭 시 나타남 */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-md max-w-3xl max-h-3xl">
            <button
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2"
              onClick={handleCloseModal} // 모달 닫기 버튼
            >
              X
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* 업데이트 버튼 추가 */}
      <div className="mb-6 flex justify-center space-x-4">
        <Button variant="primary" onClick={() => window.location.href = 'update'}>
          업데이트
        </Button>
      </div>

      <div className="mb-6 flex justify-center space-x-4">
        <Button variant="primary">모집 신청하기</Button>
      </div>

      <div className="flex justify-between space-x-4">
        <Button variant="outline" className="flex-1">이전 게시물</Button>
        <Button variant="outline" className="flex-1">목록 화면</Button>
        <Button variant="outline" className="flex-1">다음 게시물</Button>
      </div>
    </div>
  );
};

export default RecruitmentPostViewPage;
