// 회원정보수정 폼 컴포넌트
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function SettingForm() {
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
        const response = await fetch(`/api/members/${userId}`);
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
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>회원정보관리</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
              {error}
            </div>
          )}

          <div className="mb-6 border-b pb-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">사진</span>
                )}
              </Avatar>
              <div>
                <p className="mb-2 text-sm text-gray-500">
                  프로필 사진을 등록해주세요. <br />
                  이미지 파일 크기 최대 5MB 미만
                </p>
                <div className="flex space-x-2">
                  <Label htmlFor="upload">
                    <Button>등록</Button>
                  </Label>
                  <Input
                    id="upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button variant="secondary" onClick={handleImageRemove}>
                    삭제
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4">
            {/* 이름 */}
            <div className="flex items-center gap-x-6 py-2">
              <Label className="w-32">이름</Label>
              <span>{userData.name}</span>
            </div>

            {/* 이메일 주소 */}
            <div className="flex items-center gap-x-6 py-2">
              <Label className="w-32">이메일 주소</Label>
              <span>{userData.email}</span>
            </div>

            {/* 비밀번호 */}
            <div className="flex items-center gap-x-6 py-2">
              <Label className="w-32">비밀번호</Label>
              <Button variant="secondary">비밀번호 변경</Button>
            </div>

            {/* 학번 */}
            <div className="flex items-center gap-x-6 py-2">
              <Label className="w-32">학번</Label>
              <span>{userData.studentId}</span>
            </div>

            {/* 생년월일 */}
            <div className="flex items-center gap-x-6 py-2">
              <Label className="w-32" htmlFor="birthdate">
                생년월일
              </Label>
              <Input
                id="birthdate"
                type="date"
                defaultValue={userData.birthdate}
              />
            </div>

            {/* 전화번호 */}
            <div className="flex items-center gap-x-6 py-2">
              <Label className="w-32" htmlFor="phone">
                전화번호
              </Label>
              <Input id="phone" type="tel" defaultValue={userData.phone} />
            </div>

            {/* 버튼 */}
            <div className="flex justify-center space-x-4">
              <Button type="submit">수정하기</Button>
              <Button variant="secondary" onClick={handleCancel}>
                취소
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
