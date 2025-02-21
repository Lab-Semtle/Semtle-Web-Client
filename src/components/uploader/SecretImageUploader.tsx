'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Upload, Trash } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const MAX_TOTAL_IMAGE_SIZE = 100 * 1024 * 1024;
type ImageItem = {
  id?: string; // 서버에서 반환된 이미지의 고유 ID (수정 시 삭제 등에 사용)
  name: string;
  size: number | string;
  url?: string; // 기존 서버 이미지인 경우 URL
  file?: File; // 새로 업로드한 이미지인 경우 File 객체
};
type SecretImageUploaderProps = {
  initialImages?: ImageItem[];
  onRemoveImage?: (imageId: string) => void;
};
const parseImageSize = (size: string): number => {
  const units = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
  const match = size.match(/^([\d.]+)\s*(B|KB|MB|GB)$/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase() as keyof typeof units;
  return value * units[unit];
};
export default function SecretImageUploader({
  initialImages = [],
  onRemoveImage,
}: SecretImageUploaderProps) {
  const { setValue } = useFormContext();
  const [images, setImages] = useState<ImageItem[]>(initialImages);

  const totalImageSize = images.reduce((acc: number, file) => {
    if (file.file) {
      return acc + file.file.size;
    } else if (typeof file.size === 'string') {
      return acc + parseImageSize(file.size);
    } else {
      return acc + file.size;
    }
  }, 0);
  // const totalImageSize = images.reduce(
  //   (acc: number, image) => acc + image.size,
  //   0,
  // );

  useEffect(() => {
    setValue('images', images);
  }, [images, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const selectedImages = Array.from(input.files).map((file) => ({
        name: file.name,
        size: file.size,
        file,
      }));

      const newFiles = selectedImages.filter(
        (file) =>
          !images.some(
            (existingImage) =>
              existingImage.name === file.name &&
              existingImage.size === file.size,
          ),
      );

      const newTotalSize = newFiles.reduce(
        (acc: number, image) => acc + image.size,
        0,
      );

      if (totalImageSize + newTotalSize > MAX_TOTAL_IMAGE_SIZE) {
        alert('이미지의 총 업로드 용량이 100MB를 초과했습니다.');
        return;
      }

      setImages([...images, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const removedImage = images[index];
    if (removedImage.id && onRemoveImage) {
      onRemoveImage(removedImage.id); // 삭제된 파일의 id를 부모 컴포넌트로 전달
    }
    setImages(images.filter((_, i) => i !== index));
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="relative w-[400px]">
          <Input
            multiple
            type="file"
            accept="image/jpeg, image/png"
            className="w-full cursor-pointer pr-10"
            onChange={handleImageChange}
          />
          <Upload
            size={20}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
          />
        </div>
        <p className="text-sm text-gray-500">
          현재 이미지 총 용량: {(totalImageSize / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
      <ul className="flex w-full flex-wrap gap-2">
        {images.map((image, index) => (
          <li
            key={index}
            className="mb-2 flex h-[35px] w-[300px] items-center justify-between rounded-lg bg-gray-100 p-2 dark:bg-gray-700"
          >
            <p className="w-2/3 truncate">{image.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">
                {formatFileSize(image.size)}
              </p>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveImage(index)}
              >
                <Trash size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const formatFileSize = (size: number | string): string => {
  if (typeof size === 'string') {
    size = parseImageSize(size); // 문자열일 경우 숫자로 변환
  }

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};
