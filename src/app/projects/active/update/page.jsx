"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Next.js 13 이상에서 올바른 useRouter 사용
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card"; // 카드 UI 컴포넌트 추가

const UpdateProjectPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    projectTitle: "",
    startDate: "",
    endDate: "",
    contact: "",
    projectType: "",
    categories: "",
    content: "",
  });
  const [images, setImages] = useState([]); // 이미지 상태 추가

  // 기존 프로젝트 데이터를 가져오는 함수
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch("/api/projectupdate"); // 실제 API 엔드포인트 수정
        if (!response.ok) throw new Error("Failed to fetch project data");
        const data = await response.json();

        setFormData({
          projectTitle: data.projectTitle || "",
          startDate: data.startDate || "",
          endDate: data.endDate || "",
          contact: data.contact || "",
          projectType: data.projectType || "",
          categories: data.categories?.join(", ") || "", // 배열을 문자열로 변환
          content: data.content || "",
        });

        setImages(data.images || []); // 이미지 데이터 업데이트
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, []);

  // 입력값 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //이미지파일 선택핸들러
  const handleImageChange = (e) => {
    const fileList = e.target.files;
    if (fileList) {
      const newImages = Array.from(fileList).map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...newImages]); // 기존 이미지 유지하면서 새 이미지 추가
    }
  };
  //이미지삭제 핸들러
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };


  // 업데이트 버튼 클릭 시 API 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/projectupdate", {
        method: "PUT", // ✅ 업데이트 요청
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          categories: formData.categories.split(",").map((c) => c.trim()), // 문자열을 배열로 변환
          images, // 이미지 정보 추가
        }),
      });

      if (!response.ok) throw new Error("Failed to update project");

      alert("프로젝트 정보가 업데이트되었습니다!");
      router.push("/projects/active/active_detail"); // ✅ 업데이트 후 상세 페이지로 이동
    } catch (error) {
      console.error("Error updating project:", error);
      alert("업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-900">프로젝트 수정</h1>
      <hr className="my-6 border-t-2 border-gray-300" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="프로젝트 제목"
          name="projectTitle"
          value={formData.projectTitle}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="시작 날짜"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            label="종료 날짜"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          label="문의 링크"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="https://..."
        />

        <Input
          label="프로젝트 타입"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          placeholder="예: AI, 웹 개발"
        />

        <Input
          label="관련 분야 (쉼표로 구분)"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          placeholder="예: 프론트엔드, 백엔드, 데이터 분석"
        />

        <Textarea
          label="프로젝트 설명"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="프로젝트 설명을 입력하세요..."
          rows={6}
        />

        {/* 이미지 업로드 */}
        <div className="mb-6">
          <label className="font-semibold text-gray-700">게시물 이미지</label>
          <input type="file" multiple onChange={handleImageChange} className="mt-2 bg-gray-50 p-3 rounded-md border border-gray-300" />
          <div className="flex space-x-4 overflow-x-auto mt-4">
            {images.length > 0 ? (
              images.map((image, index) => (
                <Card key={index} className="w-32 h-32 flex flex-col items-center justify-center shadow-md rounded-md relative">
                  <CardContent className="w-full h-full p-0">
                    <img src={image} alt={`uploaded-${index}`} className="w-full h-full object-cover rounded-md" />
                  </CardContent>
                  <Button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full">X</Button>
                </Card>
              ))
            ) : (
              <Card className="w-32 h-32 flex items-center justify-center shadow-md rounded-md">
                <CardContent>
                  {"이미지없음"}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" variant="primary">
            업데이트
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProjectPage;
