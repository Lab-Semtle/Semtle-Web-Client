'use client';
import { Input } from '@/components/ui/input';
import { Upload, Trash } from 'lucide-react';

const MAX_TOTAL_IMAGE_SIZE = 100 * 1024 * 1024;

export default function SecretImageUploader({
  images,
  setImages,
}: {
  images: File[];
  setImages: (images: File[]) => void;
}) {
  const totalImageSize = images.reduce((acc, image) => acc + image.size, 0);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedImages = Array.from(event.target.files);
      const newTotalSize = selectedImages.reduce(
        (acc, image) => acc + image.size,
        0,
      );

      if (totalImageSize + newTotalSize > MAX_TOTAL_IMAGE_SIZE) {
        alert('총 이미지 업로드 용량이 100MB를 초과했습니다.');
        return;
      }

      setImages([...images, ...selectedImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
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
            className="mb-2 flex h-[35px] w-[300px] items-center justify-between rounded-lg bg-gray-100 p-2"
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
const formatFileSize = (size: number): string => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};
