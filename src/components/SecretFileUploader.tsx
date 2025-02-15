'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Upload, Trash } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';

const MAX_TOTAL_FILE_SIZE = 100 * 1024 * 1024;

type FileItem = {
  id?: string; // 서버에서 반환된 고유 ID
  name: string;
  size: number;
  url?: string; // 기존 서버 파일 URL
  file?: File; // 새로 업로드한 파일
};

type SecretFileUploaderProps = {
  initialFiles?: FileItem[]; // 기존 서버에서 가져온 파일들
};

export default function SecretFileUploader({
  initialFiles = [],
}: SecretFileUploaderProps) {
  const { setValue } = useFormContext();
  const [files, setFiles] = useState<FileItem[]>(initialFiles);

  const totalFileSize = files
    .filter((file) => file.file) // 새로 업로드된 파일만 용량 합산
    .reduce((acc: number, file) => acc + (file.file?.size || 0), 0);

  useEffect(() => {
    setValue('files', files); // 폼 상태와 동기화
  }, [files, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const selectedFiles = Array.from(input.files).map((file) => ({
        name: file.name,
        size: file.size,
        file,
      }));

      const newFiles = selectedFiles.filter(
        (file) =>
          !files.some(
            (existingFile) =>
              existingFile.name === file.name &&
              existingFile.size === file.size,
          ),
      );

      const newTotalSize = newFiles.reduce(
        (acc: number, file) => acc + file.size,
        0,
      );

      if (totalFileSize + newTotalSize > MAX_TOTAL_FILE_SIZE) {
        alert('파일의 총 업로드 용량이 100MB를 초과했습니다.');
        return;
      }

      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-4">
        <Label className="ml-2 text-lg">파일 첨부</Label>
        <div className="flex w-auto items-center gap-2">
          <div className="relative w-[400px]">
            <Input
              type="file"
              multiple
              accept="image/*, application/*, .zip"
              className="w-full cursor-pointer pr-10"
              onChange={handleFileChange}
            />
            <Upload
              size={20}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
            />
          </div>
          <p className="whitespace-nowrap text-sm text-gray-500">
            현재 총 용량: {(totalFileSize / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>

      <hr className="border-t-1 mb-2 border-gray-300" />
      <div className="mt-2">
        <Label className="ml-2 text-lg font-semibold">첨부된 파일</Label>

        {/* 기존 파일 목록 */}
        <ul className="mt-2 space-y-2">
          {files
            .filter((file) => file.url)
            .map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-100 p-2 dark:bg-gray-700"
              >
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-2/3 truncate text-blue-500 hover:underline"
                >
                  {file.name}
                </a>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">{file.size} MB</p>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </li>
            ))}
        </ul>
        {/* 새로 추가된 파일 목록 */}
        <ul className="mt-4 space-y-2">
          {files
            .filter((file) => file.file)
            .map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-100 p-2 dark:bg-gray-700"
              >
                <p className="w-2/3 truncate">{file.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

const formatFileSize = (size: number): string => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};
