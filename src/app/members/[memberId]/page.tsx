'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProfileEditPage() {
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleImageRemove = () => {
    setProfileImage(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">회원정보관리</h1>
        <div className="mb-6 border-b pb-6">
          <div className="flex items-center space-x-6">
            {/* 프로필 사진 */}
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-300">
              {profileImage ? (
                <Image
                  src="/default_profile.png"
                  alt="profile Img"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-500">사진</span>
              )}
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-500">
                프로필 사진을 등록해주세요. <br />
                이미지 파일 크기 최대 1MB 미만
              </p>
              <div className="flex space-x-2">
                <label
                  htmlFor="upload"
                  className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                >
                  등록
                </label>
                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button
                  onClick={handleImageRemove}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 입력 필드 */}
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="홍길동"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일 주소
            </label>
            <input
              id="email"
              type="email"
              value="XXXX@g.kmou.ac.kr"
              disabled
              className="mt-1 w-full rounded-md border bg-gray-100 px-4 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <button
              type="button"
              className="mt-1 rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            >
              비밀번호 변경
            </button>
          </div>

          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700"
            >
              학번
            </label>
            <input
              id="studentId"
              type="text"
              value="20XXXXXX"
              disabled
              className="mt-1 w-full rounded-md border bg-gray-100 px-4 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="birthdate"
              className="block text-sm font-medium text-gray-700"
            >
              생년월일
            </label>
            <div className="flex items-center space-x-4">
              <input
                id="birthdate"
                type="date"
                className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              전화번호
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="010-0000-0000"
              className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
