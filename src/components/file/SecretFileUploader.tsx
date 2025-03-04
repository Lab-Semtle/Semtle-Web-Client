'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Upload, Trash } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';

const MAX_TOTAL_FILE_SIZE = 100 * 1024 * 1024;

type FileItem = {
  id?: string;
  name: string;
  size: number | string; // 수정: size는 number 또는 string
  url?: string;
  file?: File;
};

type SecretFileUploaderProps = {
  initialFiles?: FileItem[];
  onRemoveFile?: (fileId: string) => void;
};

const parseFileSize = (size: string): number => {
  const units = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
  const match = size.match(/^([\d.]+)\s*(B|KB|MB|GB)$/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase() as keyof typeof units;
  return value * units[unit];
};

export default function SecretFileUploader({
  initialFiles = [],
  onRemoveFile,
}: SecretFileUploaderProps) {
  const { setValue } = useFormContext();
  const [files, setFiles] = useState<FileItem[]>(initialFiles);

  const totalFileSize = files.reduce((acc: number, file) => {
    if (file.file) {
      return acc + file.file.size;
    } else if (typeof file.size === 'string') {
      return acc + parseFileSize(file.size);
    } else {
      return acc + file.size;
    }
  }, 0);

  useEffect(() => {
    setValue('files', files);
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

  const handleRemoveFile = (targetFile: FileItem) => {
    const removedFile = files.find(
      (file) =>
        file.name === targetFile.name &&
        file.size === targetFile.size &&
        (!file.file || file.file === targetFile.file),
    );
    if (removedFile?.id && onRemoveFile) {
      onRemoveFile(removedFile.id); // 삭제된 파일의 id를 부모 컴포넌트로 전달
    }
    setFiles(files.filter((file) => file !== removedFile));
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-4">
        <div className="flex w-auto items-center gap-2">
          <div className="relative w-[400px] rounded-lg dark:bg-gray-900">
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
            {(totalFileSize / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>

      <hr className="border-t-1 mb-2 border-gray-300" />
      <div className="mt-2">
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
                  className="w-2/3 truncate hover:underline"
                >
                  {file.name}
                </a>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">
                    {typeof file.size === 'string'
                      ? file.size
                      : formatFileSize(file.size)}
                  </p>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveFile(file)}
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </li>
            ))}
        </ul>
        {/* 새로 추가된 파일 목록 */}
        <ul className="mt-2 space-y-2">
          {files
            .filter((file) => !file.url)
            .map((file, index) => (
              <li
                key={`new-${index}`}
                className="flex items-center justify-between rounded-lg bg-gray-100 p-2 dark:bg-gray-700"
              >
                <p className="w-2/3 truncate">{file.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">
                    {formatFileSize(
                      typeof file.size === 'string'
                        ? parseFileSize(file.size)
                        : file.size,
                    )}
                  </p>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveFile(file)}
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
