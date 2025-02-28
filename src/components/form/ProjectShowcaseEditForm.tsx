'use client';

import React, { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const projectTypes = ['해커톤', '개발', '사이드프로젝트'];
const relateFields = ['AI', 'Data Science', '안드로이드', 'IOS'];

interface ProjectData {
  title: string;
  subtitle?: string;
  writer: string;
  result_link: string;
  image_url?: string[];
  create_date: string;
  due_date: string;
  recruiting_end_time?: string;
  project_type: string;
  relate_field: string[];
  member: string;
  contents: string;
}

interface Props {
  initialData?: ProjectData;
  onSubmit: (data: ProjectData) => Promise<void>;
  isEdit?: boolean;
}

const ProjectShowcaseEditForm: React.FC<Props> = ({
  initialData,
  onSubmit,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<ProjectData>(
    initialData || {
      title: '',
      subtitle: '',
      writer: '',
      result_link: '',
      image_url: [],
      create_date: '',
      due_date: '',
      recruiting_end_time: '',
      project_type: '',
      relate_field: [],
      member: '',
      contents: '',
    },
  );
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

  return (
    <Card className="dark:bg -900 mx-auto mb-32 mt-32 max-w-4xl rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800 dark:shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-3xl text-black dark:text-white">
          {isEdit ? '프로젝트 수정하기' : '프로젝트 등록하기'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-4"
        >
          {/* 프로젝트 제목 */}
          <div>
            <Label className="text-black dark:text-white">프로젝트 제목</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border-gray-300 bg-white text-black dark:border-gray-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* 부제목 */}
          <div>
            <Label className="text-black dark:text-white">부제목</Label>
            <Input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="border-gray-300 bg-white text-black dark:border-gray-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* 작성자 */}
          <div>
            <Label className="text-black dark:text-white">작성자</Label>
            <Input
              type="text"
              name="writer"
              value={formData.writer}
              onChange={handleChange}
              required
              className="border-gray-300 bg-white text-black dark:border-gray-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* 결과 링크 */}
          <div>
            <Label className="text-black dark:text-white">
              결과 링크 (GitHub 등)
            </Label>
            <Input
              type="url"
              name="result_link"
              value={formData.result_link}
              onChange={handleChange}
              required
              className="border-gray-300 bg-white text-black dark:border-gray-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* 날짜 선택 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-black dark:text-white">시작 날짜</Label>
              <Input
                type="date"
                name="create_date"
                value={formData.create_date}
                onChange={handleChange}
                className="border-gray-300 bg-white text-black dark:border-gray-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <Label className="text-black dark:text-white">마감 날짜</Label>
              <Input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="border-gray-300 bg-white text-black dark:border-gray-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* 프로젝트 유형 */}
          <div>
            <Label className="text-black dark:text-white">프로젝트 유형</Label>
            <Select onValueChange={handleProjectTypeChange}>
              <SelectTrigger className="border-gray-300 bg-white text-black dark:border-gray-500 dark:bg-gray-800 dark:text-white">
                {formData.project_type || '선택하세요'}
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

          {/* 관련 분야 */}
          <div>
            <Label className="text-black dark:text-white">관련 분야</Label>
            <div className="flex flex-wrap gap-2">
              {relateFields.map((field) => (
                <div key={field} className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.relate_field.includes(field)}
                    onCheckedChange={() => handleRelateFieldChange(field)}
                  />
                  <span className="text-black dark:text-white">{field}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 팀원 수 */}
          <div>
            <Label className="text-black dark:text-white">팀원 수</Label>
            <Input
              type="number"
              name="member"
              value={formData.member}
              onChange={handleChange}
              required
              className="border-gray-300 bg-white text-black dark:border-gray-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* 프로젝트 설명 */}
          <div>
            <Label className="text-black dark:text-white">프로젝트 설명</Label>
            <Textarea
              name="contents"
              value={formData.contents}
              onChange={handleChange}
              rows={6}
              required
              className="border-gray-300 bg-white text-black dark:border-gray-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-between space-x-4">
            <Button type="submit" className="w-1/2">
              {isEdit ? '수정하기' : '등록하기'}
            </Button>
            <Button
              type="button"
              className="w-1/2 bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
              onClick={() => router.push('/projects?tab=showcase')}
            >
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectShowcaseEditForm;
