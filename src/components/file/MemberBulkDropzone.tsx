'use client';
import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from '@/components/ui/dropzone';
import { CloudUploadIcon, Trash2Icon } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { useBulkSignup } from '@/hooks/api/member/useBulkSignup';

export function MemberBulkDropzone() {
  const { bulkSignup, loading } = useBulkSignup();
  const { toast } = useToast();

  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      toast({ description: '파일 업로드 중...' });

      // API 호출
      const result = await bulkSignup(file);

      if (result.success) {
        toast({
          description: `회원 등록 성공: ${result.data.successCount}, 실패: ${result.data.failedCount}`,
        });

        return { status: 'success', result: URL.createObjectURL(file) };
      } else {
        toast({ variant: 'destructive', description: result.message });

        return { status: 'error', error: result.message }; // <-- 'error'일 때는 'error' 키를 반환
      }
    },
    validation: {
      accept: {
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
          '.xlsx',
        ], // .xlsx 지원
        'application/vnd.ms-excel': ['.xls'], // .xls 지원
      },
      maxSize: 5 * 1024 * 1024, // 5MB 제한
      maxFiles: 1, // 1개 파일만 업로드 가능
    },
  });

  return (
    <div className="not-prose flex flex-col gap-4">
      <Dropzone {...dropzone}>
        <div>
          <div className="flex justify-between text-base font-bold">
            <DropzoneDescription>
              여기에 엑셀 파일을 업로드하여 여러 회원을 일괄로 추가할 수
              있습니다.
            </DropzoneDescription>
            <DropzoneMessage />
          </div>
          <DropZoneArea className="bg-zinc-200 dark:bg-zinc-800">
            <DropzoneTrigger className="flex flex-col items-center gap-4 rounded-lg border border-dashed bg-transparent p-10 text-center text-sm">
              <CloudUploadIcon className="size-8" />
              <div>
                <p className="font-semibold">엑셀 파일 업로드</p>
                <p className="text-sm text-muted-foreground">
                  여기를 클릭하거나 파일을 드래그하여 업로드하세요 (.xlsx, .xls)
                </p>
              </div>
            </DropzoneTrigger>
          </DropZoneArea>
        </div>

        {/* 업로드한 파일 목록 표시 */}
        <DropzoneFileList className="grid gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
          {dropzone.fileStatuses.map((file) => (
            <DropzoneFileListItem
              className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
              key={file.id}
              file={file}
            >
              <div className="flex items-center justify-between p-2 pl-4">
                <div className="min-w-0">
                  <p className="truncate text-sm">{file.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <DropzoneRemoveFile
                  variant="ghost"
                  className="shrink-0 hover:outline"
                >
                  <Trash2Icon className="size-4" />
                </DropzoneRemoveFile>
              </div>
            </DropzoneFileListItem>
          ))}
        </DropzoneFileList>
      </Dropzone>
    </div>
  );
}
