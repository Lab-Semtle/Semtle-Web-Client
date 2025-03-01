// 'use client';

// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { useEffect } from 'react';
// import SecretNoteEditor from '@/components/form/SecretEditForm';
// import { FormValues } from '@/components/form/SecretEditForm';
// import { API_ROUTES } from '@/constants/ApiRoutes';
// import { fetchLoadFile } from '@/hooks/api/useFetchLoadFile';

// export default function SecretEditPage() {
//   const router = useRouter();
//   const { data: session, status } = useSession(); // 현재 로그인한 사용자 세션 가져오기

//   const handleCreatePost = async (data: FormValues) => {
//     try {
//       console.log('📢 게시글 작성 요청 데이터:', data);

//       if (status !== 'authenticated' || !session?.id) {
//         alert('로그인이 필요합니다.');
//         router.push('/signin');
//         return;
//       }

//       // 파일을 Cloudflare R2에 업로드 후, Presigned URL을 가져옴
//       const uploadedImages = await Promise.all(
//         (data.initialImages ?? []).map(async (img) => ({
//           ...img,
//           url: img.file ? await fetchLoadFile(img.file) : img.url,
//         })),
//       );

//       const uploadedFiles = await Promise.all(
//         (data.initialFiles ?? []).map(async (file) => ({
//           ...file,
//           url: file.file ? await fetchLoadFile(file.file) : file.url,
//         })),
//       );

//       // ✅ 모든 업로드가 성공적으로 완료되었는지 확인
//       if (
//         uploadedImages.some((img) => !img.url) ||
//         uploadedFiles.some((file) => !file.url)
//       ) {
//         throw new Error('파일 업로드 중 문제가 발생했습니다.');
//       }

//       const requestBody = {
//         title: data.title,
//         content: data.content,
//         created_at: data.created_at,
//         uuid: session.id,
//         images: uploadedImages.map((img) => img.url),
//         files: uploadedFiles.map((file) => file.url),
//         deletedImages: data.deletedImages ?? [],
//         deletedFiles: data.deletedFiles ?? [],
//       };

//       console.log('[POST] API 요청 데이터:', requestBody);

//       const response = await fetch(API_ROUTES.CREATE_ARCHIVE, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${session.accessToken}`,
//         },
//         body: JSON.stringify(requestBody),
//       });

//       console.log('서버 응답 상태:', response.status);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('서버 오류 응답:', errorData);
//         throw new Error(errorData.message || '게시글 생성 실패');
//       }

//       const result = await response.json();
//       console.log('게시글 생성 완료:', result);

//       router.push('/secret');
//       // // 응답 데이터 확인 후 게시글 페이지로 이동
//       // if (!result.success || !result.data?.board_id) {
//       //   throw new Error('유효한 게시글 ID를 받지 못했습니다.');
//       // }

//       // router.push(`/secret/${result.data.board_id}`);
//     } catch (error) {
//       console.error('게시글 생성 실패:', error);
//       alert('게시글을 생성하는 중 오류가 발생했습니다.');
//     }
//   };

//   return (
//     <div className="mx-auto mt-[100px] max-w-screen-lg p-4">
//       <SecretNoteEditor onSubmit={handleCreatePost} />
//     </div>
//   );
// }

'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import SecretNoteEditor from '@/components/form/SecretEditForm';
import { FormValues } from '@/components/form/SecretEditForm';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { fetchLoadFile } from '@/hooks/api/useFetchLoadFile';

export default function EditPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다.');
      router.push('/signin');
    }
  }, [status, router]);

  const handleCreatePost = async (data: FormValues) => {
    try {
      console.log('📢 게시글 작성 요청 데이터:', data);

      if (status !== 'authenticated' || !session?.id) {
        alert('로그인이 필요합니다.');
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);
      abortControllerRef.current = new AbortController();

      // ✅ 파일을 Cloudflare R2에 업로드 후, Presigned URL을 가져옴
      const uploadedImages = await Promise.all(
        (data.initialImages ?? []).map(async (img) => ({
          ...img,
          url: img.file
            ? await uploadFileWithProgress(img.file, setUploadProgress)
            : img.url,
        })),
      );

      const uploadedFiles = await Promise.all(
        (data.initialFiles ?? []).map(async (file) => ({
          ...file,
          url: file.file
            ? await uploadFileWithProgress(file.file, setUploadProgress)
            : file.url,
        })),
      );

      if (
        uploadedImages.some((img) => !img.url) ||
        uploadedFiles.some((file) => !file.url)
      ) {
        throw new Error('파일 업로드 중 문제가 발생했습니다.');
      }

      const requestBody = {
        title: data.title,
        content: data.content,
        created_at: data.created_at,
        uuid: session.id,
        images: uploadedImages.map((img) => img.url),
        files: uploadedFiles.map((file) => file.url),
        deletedImages: data.deletedImages ?? [],
        deletedFiles: data.deletedFiles ?? [],
      };

      console.log('[POST] API 요청 데이터:', requestBody);

      const response = await fetch(API_ROUTES.CREATE_ARCHIVE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log('서버 응답 상태:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('서버 오류 응답:', errorData);
        throw new Error(errorData.message || '게시글 생성 실패');
      }

      console.log('✅ 게시글 생성 완료');
      router.push('/secret');
    } catch (error) {
      console.error('게시글 생성 실패:', error);
      alert('게시글을 생성하는 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      abortControllerRef.current = null;
    }
  };

  // ✅ 파일 업로드 시 진행률 표시
  const uploadFileWithProgress = async (
    file: File,
    setProgress: (progress: number) => void,
  ): Promise<string> => {
    try {
      console.log(`[Cloudflare R2] 파일 업로드 요청: ${file.name}`);

      const presignedRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      if (!presignedRes.ok) {
        throw new Error('Presigned URL을 가져오는 데 실패했습니다.');
      }

      const { signedUrl } = await presignedRes.json();

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedUrl);
        xhr.setRequestHeader('Content-Type', file.type);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setProgress(percentComplete);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(signedUrl.split('?')[0]);
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error('Upload failed'));
        };

        xhr.send(file);

        if (abortControllerRef.current) {
          abortControllerRef.current.signal.addEventListener('abort', () => {
            xhr.abort();
            reject(new Error('Upload cancelled'));
          });
        }
      });
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
      return '';
    }
  };

  // ✅ 업로드 취소 함수
  const handleCancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="mx-auto mt-[100px] max-w-screen-lg p-4">
      {isUploading && (
        <div className="mb-8">
          <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {uploadProgress.toFixed(2)}% uploaded
            </p>
            <button
              onClick={handleCancelUpload}
              className="text-red-500 transition duration-300 hover:text-red-600"
            >
              업로드 취소
            </button>
          </div>
        </div>
      )}

      <SecretNoteEditor onSubmit={handleCreatePost} isUploading={isUploading} />
    </div>
  );
}
