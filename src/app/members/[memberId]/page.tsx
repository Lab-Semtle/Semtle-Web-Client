// 회원정보수정 페이지
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

export default function Page() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    studentId: '',
    birthdate: '',
    phone: '',
  });
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();
  const userId = params?.memberId || '1'; // Default ID: 1

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/members/${userId}`, {
          method: 'GET',
        });
        if (!response.ok) {
          setError('데이터를 불러오는데 실패했습니다.');
          return;
        }
        const data = await response.json();
        if (data.success) {
          setUserData(data.data);
        } else {
          setError(data.message || '데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        console.error('Error fetching user data: ', err);
        setError('예기치 못한 오류가 발생했습니다.');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleImageRemove = () => {
    setProfileImage(null);
  };

  const handleCancel = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold">회원정보관리</h1>
        <hr className="mb-6 border-gray-300" />

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <div className="mb-6 border-b pb-6">
          <div className="flex items-center space-x-6">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-300">
              {profileImage ? (
                <Image
                  src={URL.createObjectURL(profileImage)}
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
                이미지 파일 크기 최대 5MB 미만
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

        <form className="space-y-4">
          {/* 이름 */}
          <div className="flex items-center justify-start gap-x-6 py-2">
            <span className="w-32 text-base font-medium text-gray-700">
              이름
            </span>
            <span className="text-base text-gray-700">{userData.name}</span>
          </div>

          {/* 이메일 주소 */}
          <div className="flex items-center justify-start gap-x-6 py-2">
            <span className="w-32 text-base font-medium text-gray-700">
              이메일 주소
            </span>
            <span className="text-base text-gray-700">{userData.email}</span>
          </div>

          {/* 비밀번호 */}
          <div className="flex items-center justify-start gap-x-6 py-2">
            <span className="w-32 text-base font-medium text-gray-700">
              비밀번호
            </span>
            <button
              type="button"
              className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
            >
              비밀번호 변경
            </button>
          </div>

          {/* 학번 */}
          <div className="flex items-center justify-start gap-x-6 py-2">
            <span className="w-32 text-base font-medium text-gray-700">
              학번
            </span>
            <span className="text-base text-gray-700">
              {userData.studentId}
            </span>
          </div>

          {/* 생년월일 */}
          <div className="flex items-center justify-start gap-x-6 py-2">
            <span className="w-32 text-base font-medium text-gray-700">
              생년월일
            </span>
            <input
              type="date"
              defaultValue={userData.birthdate}
              className="w-48 rounded-md border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 전화번호 */}
          <div className="flex items-center justify-start gap-x-6 py-2">
            <span className="w-32 text-base font-medium text-gray-700">
              전화번호
            </span>
            <input
              type="tel"
              defaultValue={userData.phone}
              className="w-48 rounded-md border px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              수정하기
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
