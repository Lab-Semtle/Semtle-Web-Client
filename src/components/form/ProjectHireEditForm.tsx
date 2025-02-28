// 'use client';

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { format } from 'date-fns';
// import { CalendarIcon } from 'lucide-react';
// import { CalendarDatePicker } from '@/components/common/CalendarDatePicker';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Checkbox } from '@/components/ui/checkbox';
// import {
//   Select,
//   SelectItem,
//   SelectTrigger,
//   SelectContent,
// } from '@/components/ui/select';
// import { Card, CardContent } from '@/components/ui/card';
// import Image from 'next/image';
// import { Calendar } from '@/components/ui/calendar';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from '@/components/ui/form';
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from '@/components/ui/popover';
// import { useRouter } from 'next/navigation';

// // `startDate`와 `endDate`를 `z.date()`로 변경 (Date 타입 유지)
// const formSchema = z.object({
//   projectTitle: z.string().min(1, '프로젝트 제목을 입력해주세요.'),
//   dateRange: z.object({
//     // ✅ 날짜 범위를 하나의 객체로 관리
//     from: z.date(),
//     to: z.date().optional(),
//   }),
//   contact: z.string().optional(),
//   projectType: z.string().min(1, '프로젝트 유형을 선택해주세요.'),
//   categories: z.array(z.string()).optional(),
//   content: z.string().min(1, '내용을 입력해주세요.'),
//   images: z.array(z.string()).optional(),
// });

// type ProjectData = z.infer<typeof formSchema>;

// interface Props {
//   initialData?: ProjectData;
//   onSubmit: (data: ProjectData) => Promise<void>;
//   isEdit?: boolean;
// }

// const ProjectHireEditForm: React.FC<Props> = ({
//   initialData,
//   onSubmit,
//   isEdit = false,
// }) => {
//   const router = useRouter();

//   const initialDateRange = {
//     from: initialData?.dateRange?.from
//       ? new Date(initialData.dateRange.from)
//       : new Date(),
//     to: initialData?.dateRange?.to
//       ? new Date(initialData.dateRange.to)
//       : undefined,
//   };
//   const form = useForm<ProjectData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       projectTitle: initialData?.projectTitle || '',
//       dateRange: initialDateRange,
//       contact: initialData?.contact || '',
//       projectType: initialData?.projectType || '',
//       categories: initialData?.categories || [],
//       content: initialData?.content || '',
//       images: initialData?.images || [],
//     },
//   });

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files).map((file) =>
//         URL.createObjectURL(file),
//       );
//       form.setValue('images', [
//         ...(form.getValues('images') || []),
//         ...newFiles,
//       ]);
//     }
//   };

//   const [selectedDateRange, setSelectedDateRange] = useState({
//     from: new Date(new Date().getFullYear(), 0, 1),
//     to: new Date(),
//   });

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)} // 직접 변환 없이 그대로 전송
//         className="mx-auto mb-32 mt-32 max-w-4xl space-y-6 bg-white p-6 shadow-md"
//       >
//         {/* 프로젝트 제목 */}
//         <FormField
//           control={form.control}
//           name="projectTitle"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>프로젝트 제목</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* 진행 기간 (Date Range Picker) */}
//         <FormField
//           control={form.control}
//           name="dateRange"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>진행 기간</FormLabel>
//               {/* ✅ 기존 코드처럼 `CalendarDatePicker` 사용 */}
//               <CalendarDatePicker
//                 date={field.value} // 선택한 날짜 전달
//                 onDateSelect={(range) =>
//                   form.setValue('dateRange', range, { shouldValidate: true })
//                 } // ✅ 폼 값 업데이트
//               />

//               {/* 📌 선택한 날짜 범위를 보여주기 */}
//               <div className="mt-4">
//                 <h2 className="text-md font-semibold">선택한 기간:</h2>
//                 <p className="text-sm">
//                   {field.value.from
//                     ? `${field.value.from.toDateString()} ~ ${field.value.to?.toDateString() || '미정'}`
//                     : '날짜를 선택하세요'}
//                 </p>
//               </div>

//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* 문의 링크 */}
//         <FormField
//           control={form.control}
//           name="contact"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>문의 링크</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* 프로젝트 타입 */}
//         <FormField
//           control={form.control}
//           name="projectType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>프로젝트 유형</FormLabel>
//               <Select value={field.value} onValueChange={field.onChange}>
//                 <SelectTrigger>{field.value || '선택하세요'}</SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="해커톤">해커톤</SelectItem>
//                   <SelectItem value="경진대회">경진대회</SelectItem>
//                   <SelectItem value="공모전">공모전</SelectItem>
//                   <SelectItem value="사이드 프로젝트">
//                     사이드 프로젝트
//                   </SelectItem>
//                   <SelectItem value="기타">기타</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* 관련 분야 */}
//         <FormField
//           control={form.control}
//           name="categories"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>관련 분야</FormLabel>
//               <div className="flex flex-wrap gap-4">
//                 {['Web', 'Mobile', 'IOS', 'DATA', 'GAME', '기타'].map(
//                   (category) => {
//                     const selectedCategories = field.value ?? []; // 기본값 설정
//                     return (
//                       <div
//                         key={category}
//                         className="flex items-center space-x-2"
//                       >
//                         <Checkbox
//                           checked={selectedCategories.includes(category)}
//                           onCheckedChange={(checked) => {
//                             const newCategories = checked
//                               ? [...selectedCategories, category]
//                               : selectedCategories.filter(
//                                   (c) => c !== category,
//                                 );

//                             form.setValue('categories', newCategories, {
//                               shouldValidate: true,
//                             });
//                           }}
//                           id={category} // label과 연결하기 위한 id
//                         />
//                         <label
//                           htmlFor={category}
//                           className="text-sm font-medium"
//                         >
//                           {category}
//                         </label>
//                       </div>
//                     );
//                   },
//                 )}
//               </div>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* 대표 이미지  */}
//         <FormField
//           control={form.control}
//           name="images"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>게시물 이미지</FormLabel>
//               <FormControl>
//                 <Input type="file" multiple onChange={handleImageChange} />
//               </FormControl>
//               <div className="mt-4 flex space-x-4 overflow-x-auto">
//                 {field.value?.map((image, index) => (
//                   <Card key={index} className="relative h-32 w-32 shadow-md">
//                     <CardContent>
//                       <Image
//                         src={image}
//                         alt={`uploaded-${index}`}
//                         className="h-full w-full object-cover"
//                       />
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* 내용 */}
//         <FormField
//           control={form.control}
//           name="content"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>게시물 내용</FormLabel>
//               <FormControl>
//                 <Textarea {...field} rows={10} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* 버튼 */}
//         <div className="flex justify-center space-x-4">
//           {/* 제출 버튼 */}
//           <Button type="submit">{isEdit ? '수정하기' : '모집 신청하기'}</Button>
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => router.push('/projects')} // /projects 페이지로 이동
//           >
//             취소
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default ProjectHireEditForm;
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDatePicker } from '@/components/common/CalendarDatePicker';
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
import { useRouter } from 'next/navigation';

const projectTypes = ['해커톤', '개발', '사이드프로젝트'];
const relateFields = ['AI', 'Data Science', '안드로이드', 'IOS'];

const formSchema = z.object({
  projectTitle: z.string().min(1, '프로젝트 제목을 입력해주세요.'),
  startDate: z.string().min(1, '시작 날짜를 선택해주세요.'),
  endDate: z.string().min(1, '종료 날짜를 선택해주세요.'),
  contact: z.string().optional(),
  projectType: z.string().min(1, '프로젝트 유형을 선택해주세요.'),
  categories: z.array(z.string()).optional(),
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

  const { register, handleSubmit, setValue, watch } = useForm<ProjectData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: initialData?.projectTitle || '',
      startDate: initialData?.startDate || '',
      endDate: initialData?.endDate || '',
      contact: initialData?.contact || '',
      projectType: initialData?.projectType || '',
      categories: initialData?.categories || [],
      content: initialData?.content || '',
      images: initialData?.images || [],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setValue('images', [...(watch('images') || []), ...newFiles]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-32 mt-32 max-w-4xl space-y-6 rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800 dark:shadow-lg"
    >
      {/* 프로젝트 제목 */}
      <div>
        <label className="mb-2 block text-base font-bold text-black dark:text-white">
          프로젝트 제목
        </label>
        <Input
          {...register('projectTitle')}
          className="border border-gray-300 bg-white text-black dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          required
        />
      </div>

      {/* 진행 기간 (시작 날짜, 종료 날짜) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-base font-bold text-black dark:text-white">
            시작 날짜
          </label>
          <Input
            type="date"
            {...register('startDate')}
            className="border border-gray-300 bg-white text-black dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-base font-bold text-black dark:text-white">
            종료 날짜
          </label>
          <Input
            type="date"
            {...register('endDate')}
            className="border border-gray-300 bg-white text-black dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            required
          />
        </div>
      </div>

      {/* 문의 링크 */}
      <div>
        <label className="mb-2 block text-base font-bold text-black dark:text-white">
          문의 링크
        </label>
        <Input
          {...register('contact')}
          className="border border-gray-300 bg-white text-black dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {/* 프로젝트 유형 */}
      <div>
        <label className="mb-2 block text-base font-bold text-black dark:text-white">
          프로젝트 유형
        </label>
        <Select onValueChange={(value) => setValue('projectType', value)}>
          <SelectTrigger className="border border-gray-300 bg-white text-black dark:border-gray-600 dark:bg-gray-900 dark:text-white">
            {watch('projectType') || '선택하세요'}
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
        <label className="mb-2 block text-base font-bold text-black dark:text-white">
          관련 분야
        </label>
        <div className="flex flex-wrap gap-2">
          {relateFields.map((field) => (
            <div key={field} className="flex items-center gap-2">
              <Checkbox
                checked={watch('categories')?.includes(field)}
                onCheckedChange={() => {
                  const updatedFields = watch('categories')?.includes(field)
                    ? watch('categories')?.filter((f) => f !== field)
                    : [...(watch('categories') || []), field];

                  setValue('categories', updatedFields);
                }}
              />
              <span className="text-black dark:text-white">{field}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 대표 이미지 */}
      <div>
        <label className="mb-2 block text-base font-bold text-black dark:text-white">
          게시물 이미지
        </label>
        <Input type="file" multiple onChange={handleImageChange} />
        <div className="mt-4 flex space-x-4 overflow-x-auto">
          {watch('images')?.map((image, index) => (
            <Card
              key={index}
              className="relative h-32 w-32 shadow-md dark:shadow-lg"
            >
              <CardContent>
                <Image
                  src={image}
                  alt={`uploaded-${index}`}
                  className="h-full w-full object-cover"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 내용 */}
      <div>
        <label className="mb-2 block text-base font-bold text-black dark:text-white">
          게시물 내용
        </label>
        <Textarea
          {...register('content')}
          rows={10}
          className="border border-gray-300 bg-white text-black dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {/* 버튼 */}
      <div className="flex justify-between space-x-4">
        <Button type="submit" className="w-1/2">
          {isEdit ? '수정하기' : '업로드'}
        </Button>
        <Button
          type="button"
          className="w-1/2 bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
          onClick={() => router.push('/projects')}
        >
          취소
        </Button>
      </div>
    </form>
  );
};

export default ProjectHireEditForm;
