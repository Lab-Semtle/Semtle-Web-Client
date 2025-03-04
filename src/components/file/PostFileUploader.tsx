// 'use client';

// import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
// import clsx from 'clsx';

// interface UploadedFile {
//   name: string;
//   key: string;
// }

// interface FileUploadManagerProps {
//   postId?: string;
//   uploadPath: string;
//   className?: string;
//   onUploadSuccess?: (uploadedImagePath: string) => void;
// }

// export default function PostFileUploader({
//   postId = '',
//   uploadPath,
//   className,
//   onUploadSuccess,
// }: FileUploadManagerProps) {
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [file, setFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);
//   const [isUploading, setIsUploading] = useState<boolean>(false);
//   const abortControllerRef = useRef<AbortController | null>(null);

//   /** 파일 선택 */
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   /** 파일 업로드 */
//   const handleUpload = async () => {
//     // e: FormEvent<HTMLFormElement> //form 태그
//     // e.preventDefault(); //form 태그
//     if (!file) return;

//     setIsUploading(true);
//     setUploadProgress(0);
//     abortControllerRef.current = new AbortController();

//     // 경로 정리 (banner/파일명 또는 게시판명/postId/파일명)
//     const sanitizedUploadPath = uploadPath.replace(/\/$/, ''); // 끝에 '/' 제거
//     const sanitizedPostId = postId.trim(); // 공백 제거

//     // postId가 없으면 uploadPath/파일이름 형식, 있으면 uploadPath/postId/파일이름 형식
//     const fullFilePath =
//       sanitizedPostId === ''
//         ? `${sanitizedUploadPath}/${file.name}` // 배너처럼 postId가 없을 때
//         : `${sanitizedUploadPath}/${sanitizedPostId}/${file.name}`; // 일반 게시판 게시물

//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           fileName: fullFilePath,
//           fileType: file.type,
//         }),
//       });

//       const { signedUrl } = await response.json();

//       await uploadFileWithProgress(
//         file,
//         signedUrl,
//         abortControllerRef.current.signal,
//       );

//       alert('파일이 성공적으로 업로드 되었습니다!');

//       setUploadedFiles((prev) => [
//         ...prev,
//         { name: file.name, key: fullFilePath },
//       ]);

//       if (onUploadSuccess) {
//         onUploadSuccess(fullFilePath); // 업로드 성공 후 콜백 실행
//       }

//       setFile(null);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('Error uploading file');
//     } finally {
//       setIsUploading(false);
//       setUploadProgress(0);
//       abortControllerRef.current = null;
//     }
//   };

//   /** 파일 업로드 진행률 */
//   const uploadFileWithProgress = (
//     file: File,
//     signedUrl: string,
//     signal: AbortSignal,
//   ): Promise<void> => {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();

//       xhr.open('PUT', signedUrl);
//       xhr.setRequestHeader('Content-Type', file.type);

//       xhr.upload.onprogress = (event) => {
//         if (event.lengthComputable) {
//           const percentComplete = (event.loaded / event.total) * 100;
//           setUploadProgress(percentComplete);
//         }
//       };

//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           resolve();
//         } else {
//           reject(new Error(`업로드를 실패했습니다. : ${xhr.status}`));
//         }
//       };

//       xhr.onerror = () => {
//         reject(new Error('업로드 실패'));
//       };

//       xhr.send(file);

//       signal.addEventListener('abort', () => {
//         xhr.abort();
//         reject(new Error('업로드 취소'));
//       });
//     });
//   };

//   return (
//     <div
//       className={clsx(
//         'mb-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900',
//         className,
//       )}
//     >
//       <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
//         파일을 선택해주세요
//       </h2>
//       <div className="flex items-center space-x-3">
//         <label className="flex-1">
//           <input
//             type="file"
//             onChange={handleFileChange}
//             disabled={isUploading}
//             className="hidden"
//             id="file-upload"
//           />
//           <div className="cursor-pointer rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-blue-500 transition duration-300 hover:bg-blue-100 dark:border-blue-500 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">
//             {file ? file.name : '여기를 클릭하여 파일을 선택해주세요'}
//           </div>
//         </label>
//         <button
//           type="button" // form 제출 방지 (부모요소가 대부분 편집폼이므로, form태그 쓸 가능성 높음)
//           onClick={handleUpload}
//           disabled={!file || isUploading}
//           className="rounded-md bg-blue-500 px-6 py-2 text-white transition duration-300 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
//         >
//           {isUploading ? '업로드 중...' : '업로드'}
//         </button>
//       </div>

//       {/* 업로드 진행률 표시 */}
//       {isUploading && (
//         <div className="mb-4">
//           <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
//             <div
//               className="h-2.5 rounded-full bg-blue-600 dark:bg-blue-500"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             {uploadProgress.toFixed(2)}% uploaded
//           </p>
//         </div>
//       )}

//       {/* 업로드된 파일 목록 표시 */}
//       <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
//         업로드된 파일 목록
//       </h2>
//       {uploadedFiles.length === 0 ? (
//         <p className="text-gray-500 dark:text-gray-400">
//           파일이 선택되지 않았습니다.
//         </p>
//       ) : (
//         <ul className="space-y-2">
//           {uploadedFiles.map((file) => (
//             <li
//               key={file.key}
//               className="flex justify-between rounded-md border border-gray-200 bg-gray-50 p-2 text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
//             >
//               <span className="truncate">{file.name}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

'use client';

import React, { useState, ChangeEvent, useRef } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

interface UploadedFile {
  name: string;
  key: string;
}

interface FileUploadManagerProps {
  postId?: string;
  uploadPath: string;
  className?: string;
  onFileSelect?: (file: File | null) => void;
  onUploadSuccess?: (uploadedImagePath: string) => void;
}

export default function PostFileUploader({
  postId = '',
  uploadPath,
  className,
  onFileSelect,
  onUploadSuccess,
}: FileUploadManagerProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 이미지 미리보기 추가
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  /** 파일 선택 */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (onFileSelect) {
      onFileSelect(selectedFile); // 부모 컴포넌트에서 미리보기 처리
    }

    setFile(selectedFile);

    // 이미지 파일이면 미리보기 설정
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Base64 미리보기 설정
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null); // 이미지가 아니면 미리보기 제거
    }
  };

  /** 파일 업로드 */
  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    abortControllerRef.current = new AbortController();

    const sanitizedUploadPath = uploadPath.replace(/\/$/, '');
    const sanitizedPostId = postId.trim();
    const fullFilePath =
      sanitizedPostId === ''
        ? `${sanitizedUploadPath}/${file.name}`
        : `${sanitizedUploadPath}/${sanitizedPostId}/${file.name}`;

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: fullFilePath,
          fileType: file.type,
        }),
      });

      const { signedUrl } = await response.json();

      await uploadFileWithProgress(
        file,
        signedUrl,
        abortControllerRef.current.signal,
      );

      alert('파일이 성공적으로 업로드 되었습니다!');

      setUploadedFiles((prev) => [
        ...prev,
        { name: file.name, key: fullFilePath },
      ]);

      if (onUploadSuccess) {
        console.log('[PostFileUploader] onUploadSuccess 호출됨');
        onUploadSuccess(fullFilePath);
      } else {
        console.error('[PostFileUploader] onUploadSuccess가 정의되지 않음');
      }

      setFile(null);
      // setImagePreview(null); // 업로드 후 미리보기 제거
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      abortControllerRef.current = null;
    }
  };

  /** 파일 업로드 진행률 */
  const uploadFileWithProgress = (
    file: File,
    signedUrl: string,
    signal: AbortSignal,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('PUT', signedUrl);
      xhr.setRequestHeader('Content-Type', file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new Error(`업로드를 실패했습니다. : ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('업로드 실패'));
      };

      xhr.send(file);

      signal.addEventListener('abort', () => {
        xhr.abort();
        reject(new Error('업로드 취소'));
      });
    });
  };

  return (
    <div
      className={clsx(
        'mb-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900',
        className,
      )}
    >
      <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
        파일을 선택해주세요
      </h2>
      <div className="flex flex-col gap-3">
        {/* 🔹 이미지 미리보기 */}
        {imagePreview && (
          <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={imagePreview}
              alt="미리보기"
              className="h-full w-full object-contain"
              width={500}
              height={500}
            />
          </div>
        )}

        <label className="cursor-pointer rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-blue-500 transition duration-300 hover:bg-blue-100 dark:border-blue-500 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">
          <input
            type="file"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
            id="file-upload"
          />
          {file ? file.name : '여기를 클릭하여 파일을 선택해주세요'}
        </label>

        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="rounded-md bg-blue-500 px-6 py-2 text-white transition duration-300 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {isUploading ? '업로드 중...' : '업로드'}
        </button>
      </div>

      {/* 업로드 진행률 표시 */}
      {isUploading && (
        <div className="mt-4">
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2.5 rounded-full bg-blue-600 dark:bg-blue-500"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {uploadProgress.toFixed(2)}% uploaded
          </p>
        </div>
      )}

      {/* 업로드된 파일 목록 표시 */}
      {uploadedFiles.length > 0 && (
        <>
          <h2 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
            업로드된 파일 목록
          </h2>
          <ul className="mt-2 space-y-2">
            {uploadedFiles.map((file) => (
              <li
                key={file.key}
                className="flex justify-between rounded-md border border-gray-200 bg-gray-50 p-2 text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              >
                <span className="truncate">{file.name}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
