'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const projectTypes = ['해커톤', '개발', '사이드프로젝트'];
const relateFields = ['AI', 'Data Science', '안드로이드', 'IOS'];

const CompletedProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    writer: '',
    result_link: '',
    image: null as File | null,
    create_date: '',
    due_date: '',
    project_type: '',
    relate_field: [] as string[],
    member: '',
    contents: '',
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProjectTypeChange = (value: string) => {
    setFormData({ ...formData, project_type: value });
  };

  const handleRelateFieldChange = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      relate_field: prev.relate_field.includes(field)
        ? prev.relate_field.filter((f) => f !== field)
        : [...prev.relate_field, field],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'image' && value) {
        formDataToSend.append('image', value);
      } else if (Array.isArray(value)) {
        value.forEach((v) => formDataToSend.append(key, v));
      } else {
        formDataToSend.append(key, value as string);
      }
    });

    try {
      const response = await fetch('/api/projects/completed', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/projects/completed'), 1500);
      } else {
        alert('프로젝트 등록 실패!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류 발생!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-8 max-w-2xl p-6">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          📌 완료된 프로젝트 등록
        </CardTitle>
      </CardHeader>
      <CardContent>
        {success ? (
          <p className="text-center text-green-600">
            ✅ 프로젝트가 성공적으로 등록되었습니다!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 프로젝트 제목 */}
            <div>
              <Label>프로젝트 제목</Label>
              <Input
                type="text"
                name="title"
                placeholder="예: AI 추천 시스템 개발"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* 부제목 */}
            <div>
              <Label>부제목</Label>
              <Input
                type="text"
                name="subtitle"
                placeholder="예: 머신러닝을 이용한 개인화 추천"
                value={formData.subtitle}
                onChange={handleChange}
              />
            </div>

            {/* 작성자 */}
            <div>
              <Label>작성자</Label>
              <Input
                type="text"
                name="writer"
                placeholder="예: 홍길동"
                value={formData.writer}
                onChange={handleChange}
                required
              />
            </div>

            {/* 결과 링크 */}
            <div>
              <Label>결과 링크 (GitHub 등)</Label>
              <Input
                type="url"
                name="result_link"
                placeholder="예: https://github.com/username/repo"
                value={formData.result_link}
                onChange={handleChange}
                required
              />
            </div>

            {/* 이미지 업로드 */}
            <div>
              <Label>이미지 업로드</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <Image
                  src={preview}
                  alt="미리보기"
                  className="mt-2 h-40 w-full rounded-lg object-cover"
                />
              )}
            </div>

            {/* 날짜 선택 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>시작 날짜</Label>
                <Input
                  type="date"
                  name="create_date"
                  value={formData.create_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>마감 날짜</Label>
                <Input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 프로젝트 유형 선택 */}
            <div>
              <Label>프로젝트 유형</Label>
              <Select onValueChange={handleProjectTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 관련 분야 다중 선택 */}
            <div>
              <Label>관련 분야</Label>
              <div className="flex flex-wrap gap-2">
                {relateFields.map((field) => (
                  <div key={field} className="flex items-center gap-2">
                    <Checkbox
                      checked={formData.relate_field.includes(field)}
                      onCheckedChange={() => handleRelateFieldChange(field)}
                    />
                    <span>{field}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 팀원 수 입력 */}
            <div>
              <Label>팀원 수</Label>
              <Input
                type="number"
                name="member"
                min="1"
                value={formData.member}
                onChange={handleChange}
                required
              />
            </div>

            {/* 프로젝트 설명 */}
            <div>
              <Label>프로젝트 설명</Label>
              <Textarea
                name="contents"
                placeholder="프로젝트 설명"
                value={formData.contents}
                onChange={handleChange}
                rows={6} // 더 많은 줄을 보여주도록 설정
                required
              />
            </div>

            {/* 제출 버튼 */}
            <Button type="submit" className="w-full">
              {loading ? '등록 중...' : '프로젝트 등록'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default CompletedProjectForm;
