// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Upload, X, ImageIcon, Save } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import Image from 'next/image';
// import NovelEditor from '@/components/editor/NovelEditor';

// interface PostFormData {
//   title: string;
//   category: string;
//   content: string;
//   image?: File;
// }

// export default function PostForm() {
//   const { id } = useParams(); // URL에서 id 가져오기
//   const router = useRouter();
//   const isEditMode = !!id; // id가 있으면 수정 모드

//   const [formData, setFormData] = useState<PostFormData>({
//     title: '',
//     category: '',
//     content: '',
//   });

//   const [imagePreview, setImagePreview] = useState<string>('');

//   // 기존 데이터 불러오기 (수정 모드일 때)
//   useEffect(() => {
//     if (isEditMode) {
//       // 실제 API에서 데이터를 가져오는 코드로 변경
//       const fetchPostData = async () => {
//         const response = await fetch(`/api/posts/${id}`);
//         const post = await response.json();
//         setFormData({
//           title: post.title,
//           category: post.category,
//           content: post.content,
//         });
//         if (post.imageUrl) setImagePreview(post.imageUrl);
//       };

//       fetchPostData();
//     }
//   }, [id, isEditMode]);

//   // 이미지 업로드 핸들러
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const validImageTypes = [
//         'image/jpeg',
//         'image/png',
//         'image/gif',
//         'image/webp',
//       ];
//       if (!validImageTypes.includes(file.type)) {
//         alert(
//           '지원되지 않는 이미지 형식입니다. JPEG, PNG, GIF, WebP 파일만 업로드 가능합니다.',
//         );
//         return;
//       }

//       setFormData((prev) => ({ ...prev, image: file }));
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // 이미지 삭제
//   const handleImageRemove = () => {
//     setFormData((prev) => ({ ...prev, image: undefined }));
//     setImagePreview('');
//   };

//   // 제출 핸들러 (생성/수정 공통)
//   const handleSubmit = async () => {
//     const url = isEditMode ? `/api/posts/${id}` : '/api/posts';
//     const method = isEditMode ? 'PUT' : 'POST';

//     const formDataToSend = new FormData();
//     formDataToSend.append('title', formData.title);
//     formDataToSend.append('category', formData.category);
//     formDataToSend.append('content', formData.content);
//     if (formData.image) formDataToSend.append('image', formData.image);

//     const response = await fetch(url, {
//       method,
//       body: formDataToSend,
//     });

//     if (response.ok) {
//       alert(
//         isEditMode ? '게시물이 수정되었습니다.' : '게시물이 등록되었습니다.',
//       );
//       router.push('/activities');
//     } else {
//       alert('오류가 발생했습니다.');
//     }
//   };

//   // 취소 버튼
//   const handleCancel = () => {
//     router.push('/activities');
//   };

//   return (
//     <div className="container mx-auto mt-[70px] max-w-4xl pb-32 pt-16">
//       <Card className="rounded-lg shadow-lg">
//         <CardContent className="space-y-6 p-6">
//           {/* 게시물 제목 */}
//           <div className="space-y-2">
//             <Label htmlFor="title" className="text-lg font-bold">
//               게시물 제목
//             </Label>
//             <Input
//               id="title"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, title: e.target.value }))
//               }
//               placeholder="제목을 입력하세요"
//               className="rounded-lg shadow-lg"
//             />
//           </div>

//           {/* 이미지 */}
//           <div className="space-y-2">
//             <Label className="text-lg font-bold">게시물 이미지</Label>
//             <div className="flex items-start gap-4">
//               <div className="relative aspect-video flex-1 overflow-hidden rounded-lg bg-gray-100">
//                 {imagePreview ? (
//                   <Image
//                     src={imagePreview || '/placeholder.svg'}
//                     alt="Preview"
//                     className="h-full w-full rounded-lg object-contain shadow-lg"
//                     width={500}
//                     height={500}
//                   />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center text-gray-400">
//                     <ImageIcon className="h-12 w-12" />
//                   </div>
//                 )}
//               </div>
//               <div className="flex flex-col gap-2">
//                 <Button
//                   variant="outline"
//                   className="relative rounded-lg shadow-lg hover:bg-semtleColor"
//                 >
//                   <input
//                     type="file"
//                     className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
//                     onChange={handleImageUpload}
//                     accept="image/*"
//                   />
//                   <Upload className="mr-2 h-4 w-4" />
//                   업로드
//                 </Button>
//                 {imagePreview && (
//                   <Button
//                     variant="outline"
//                     onClick={handleImageRemove}
//                     className="rounded-lg shadow-lg hover:bg-red-500"
//                   >
//                     <X className="mr-2 h-4 w-4" />
//                     삭제
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* 유형 선택 */}
//           <div className="space-y-2">
//             <Label className="text-lg font-bold">게시물 유형</Label>
//             <Select
//               value={formData.category}
//               onValueChange={(value) =>
//                 setFormData((prev) => ({ ...prev, category: value }))
//               }
//             >
//               <SelectTrigger className="rounded-lg shadow-lg">
//                 <SelectValue placeholder="유형 선택" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="공지">공지</SelectItem>
//                 <SelectItem value="세미나">세미나</SelectItem>
//                 <SelectItem value="행사">행사</SelectItem>
//                 <SelectItem value="기타">기타</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* 내용 입력 */}
//           <div className="space-y-2">
//             <NovelEditor />
//           </div>
//         </CardContent>

//         {/* 버튼 */}
//         <CardFooter className="flex justify-end gap-2 px-4 pb-8 pt-4">
//           <Button onClick={handleSubmit}>
//             {isEditMode ? '수정하기' : '업로드'}
//           </Button>
//           <Button
//             variant="outline"
//             onClick={handleCancel}
//             className="rounded-lg shadow-lg hover:bg-red-500"
//           >
//             <X className="mr-2 h-4 w-4" />
//             취소
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PostForm from '@/components/form/ActivityEditForm';

interface PostData {
  board_id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  images?: string[];
  type: string;
}

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const [postData, setPostData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/activities/${id}`);
        if (!response.ok) throw new Error('게시물을 불러오는 데 실패했습니다.');

        const { success, data } = await response.json();
        if (success) {
          setPostData(data);
        } else {
          throw new Error('데이터 로드 실패');
        }
      } catch (error) {
        console.error(error);
        alert('게시물을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('게시물 수정 실패');

      alert('게시물이 수정되었습니다.');
      router.push('/activities');
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!postData) return <p>게시물을 찾을 수 없습니다.</p>;

  return (
    <PostForm
      mode="update"
      initialData={{
        title: postData.title,
        category: postData.type,
        content: postData.content,
        imageUrl: postData.images?.[0] || '',
      }}
      onSubmit={handleUpdate}
    />
  );
}
