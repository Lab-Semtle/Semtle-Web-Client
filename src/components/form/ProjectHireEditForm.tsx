'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { format, parseISO } from 'date-fns';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const PROJECT_TYPE_MAP = {
  해커톤: { id: 1, name: '해커톤' },
  경진대회: { id: 2, name: '경진대회' },
  공모전: { id: 3, name: '공모전' },
  사이드프로젝트: { id: 4, name: '사이드프로젝트' },
  기타: { id: 5, name: '기타' },
} as const;

const RELATION_FIELD_MAP = {
  Web: { id: 1, name: 'Web' },
  Mobile: { id: 2, name: 'Mobile' },
  IOS: { id: 3, name: 'IOS' },
  DATA: { id: 4, name: 'DATA' },
  GAME: { id: 5, name: 'GAME' },
  기타: { id: 6, name: '기타' },
} as const;

const formSchema = z.object({
  projectTitle: z.string().min(1, '프로젝트 제목을 입력해주세요.'),
  startDate: z.string().min(1, '시작 날짜를 선택해주세요.'),
  endDate: z.string().min(1, '종료 날짜를 선택해주세요.'),
  contact: z.string().optional(),
  category: z.string().min(1, '프로젝트 유형을 선택해주세요.'),
  relatedField: z
    .array(z.string())
    .min(1, '관련 분야를 최소 1개 선택해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  images: z.array(z.string()).optional(),
});

type ProjectData = z.infer<typeof formSchema>;

interface Props {
  initialData?: ProjectData;
  onSubmit: (data: ProjectData) => Promise<void>;
  isEdit?: boolean;
}

const ProjectHireEditForm: React.FC<Props> = ({
  initialData,
  onSubmit,
  isEdit = false,
}) => {
  const router = useRouter();
  const form = useForm<ProjectData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: initialData?.projectTitle || '',
      startDate: initialData?.startDate
        ? format(parseISO(initialData.startDate), 'yyyy-MM-dd')
        : '',
      endDate: initialData?.endDate
        ? format(parseISO(initialData.endDate), 'yyyy-MM-dd')
        : '',
      contact: initialData?.contact || '',
      category: initialData?.category || '',
      relatedField: initialData?.relatedField || [],
      content: initialData?.content || '',
      images: initialData?.images,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        startDate: format(parseISO(initialData.startDate), 'yyyy-MM-dd'),
        endDate: format(parseISO(initialData.endDate), 'yyyy-MM-dd'),
      });
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mb-32 mt-32 max-w-4xl space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800 dark:shadow-lg"
      >
        {/* 프로젝트 제목 */}
        <FormField
          control={form.control}
          name="projectTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>프로젝트 제목</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 진행 기간 */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>시작 날짜</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>종료 날짜</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 프로젝트 유형 */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>{field.value || '선택하세요'}</SelectTrigger>
                <SelectContent>
                  {Object.keys(PROJECT_TYPE_MAP).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 관련 분야 */}
        <FormField
          control={form.control}
          name="relatedField"
          render={({ field }) => (
            <FormItem>
              <FormLabel>관련 분야</FormLabel>
              <div className="flex flex-wrap gap-2">
                {Object.entries(RELATION_FIELD_MAP).map(([key, { name }]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value.includes(key)}
                      onCheckedChange={() => {
                        const updatedFields = field.value.includes(key)
                          ? field.value.filter((f) => f !== key)
                          : [...field.value, key];

                        field.onChange(updatedFields);
                      }}
                    />
                    <span className="text-black dark:text-white">{name}</span>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 문의 링크 */}
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>문의 링크</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="문의 가능한 링크를 입력하세요."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 내용 */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>게시물 내용</FormLabel>
              <FormControl>
                <Textarea {...field} rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 버튼 */}
        <div className="flex justify-between space-x-4">
          <Button type="submit" className="w-1/2">
            {isEdit ? '프로젝트 공고 수정하기' : '프로젝트 공고 등록하기'}
          </Button>
          <Button
            type="button"
            className="w-1/2 bg-gray-500 text-white"
            onClick={() =>
              router.push(isEdit ? '/mypage/projects' : '/projects')
            }
          >
            취소
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectHireEditForm;
