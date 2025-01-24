"use client"; // 클라이언트 컴포넌트로 지정

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const RecruitmentPostPage = () => {
  const [postData, setPostData] = useState({
    projectTitle: "제18회 공개SW 개발자대회", // 초기 프로젝트 제목
    startDate: new Date(),
    endDate: new Date(),
    contact: "",
    projectType: "해커톤",
    categories: ["Android", "Web"],
    content: "게시물 내용을 입력하세요.",
    images: [],
  });

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setPostData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...newImages],
    }));
  };

  const handleTitleChange = (e) => {
    setPostData({
      ...postData,
      projectTitle: e.target.value, // 프로젝트 제목 업데이트
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      {/* 프로젝트 제목 입력란 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">프로젝트 제목</label>
        <Input
          type="text"
          value={postData.projectTitle}
          onChange={handleTitleChange}
          className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
          placeholder="프로젝트 제목을 입력하세요"
        />
      </div>
      <hr className="my-6 border-t-2 border-gray-300" />

      <div className="grid grid-cols-2 gap-6 mb-6">
        <p><strong>게시 일자:</strong> {postData.startDate.toLocaleDateString()}</p>
        <p><strong>진행 기간:</strong> {postData.startDate.toLocaleDateString()} ~ {postData.endDate.toLocaleDateString()}</p>
      </div>

      {/* 문의 링크 입력란 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">문의 링크</label>
        <Input
          type="text"
          value={postData.contact}
          onChange={(e) => setPostData({ ...postData, contact: e.target.value })}
          className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
          placeholder="https://open.kakao.com/..."
        />
      </div>

      {/* 프로젝트 타입 선택 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">프로젝트 타입</label>
        <Select value={postData.projectType} onValueChange={(value) => setPostData({ ...postData, projectType: value })}>
          <SelectTrigger className="w-full bg-gray-50 p-3 rounded-md border border-gray-300">
            {postData.projectType}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="해커톤">해커톤</SelectItem>
            <SelectItem value="개발">개발</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 마감일자 선택 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">마감일자</label>
        <DatePicker
          selected={postData.endDate}
          onChange={(date) => setPostData({ ...postData, endDate: date })}
          dateFormat="yyyy-MM-dd"
          className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
        />
      </div>

      {/* 관련 분야 선택 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">관련 분야</label>
        <div className="flex flex-wrap gap-4 mt-2">
          {["Android", "Web", "AI", "IoT"].map((category) => (
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
              <span className={`text-sm ${postData.categories.includes(category) ? "text-blue-500 font-semibold" : "text-gray-700"}`}>
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
    className="w-full bg-gray-50 p-3 rounded-md border border-gray-300"
    rows={10} // 라인 수를 10으로 설정
  />
</div>

      {/* 이미지 업로드 */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">게시물 이미지</label>
        <Input type="file" multiple onChange={handleImageChange} className="mt-2 bg-gray-50 p-3 rounded-md border border-gray-300" />
        <div className="flex space-x-4 overflow-x-auto mt-4">
          {postData.images.map((image, index) => (
            <Card key={index} className="w-32 h-32 flex items-center justify-center shadow-md rounded-md">
              <CardContent>
                <img src={image} alt={`uploaded-${index}`} className="w-full h-full object-cover rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      
      {/* 버튼 영역 */}
      <div className="mb-6 flex justify-center space-x-4">
        <Button variant="outline" className="block w-full">모집 신청하기</Button>
      </div>


      <div className="flex justify-between space-x-4">
        <Button variant="outline" className="flex-1">이전 게시물</Button>
        <Button variant="outline" className="flex-1">목록 화면</Button>
        <Button variant="outline" className="flex-1">다음 게시물</Button>
      </div>
    </div>
  );
};

export default RecruitmentPostPage;
