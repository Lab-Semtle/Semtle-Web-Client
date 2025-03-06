'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/admin/table/data-table';
import Image from 'next/image';
import { useFetchBanners } from '@/hooks/api/banner/useFetchBanners';
import { useManageBanner } from '@/hooks/api/banner/useManageBanner';
import PostFileUploader from '@/components/file/PostFileUploader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Banner } from '@/types/banner';

export default function BannerManagePage() {
  const { data: session } = useSession();
  const { banners, loading, error } = useFetchBanners(); // 초기값 페칭 훅
  const { createBanner, deleteBanners } = useManageBanner(); // 생성, 삭제 훅
  const [isDialogOpen, setIsDialogOpen] = useState(false); // 다이얼로그(팝업) 상태 관리
  const router = useRouter();
  const [currentBanner, setCurrentBanner] = useState<Partial<Banner>>({
    postTitle: '',
    targetPath: '',
    imagePath: '',
    altText: '',
  });

  // 이미지 업로드 완료 후 imagePath 업데이트
  const handleImageUpload = (uploadedImagePath: string) => {
    setCurrentBanner((prev) => ({
      ...prev,
      imagePath: uploadedImagePath,
    }));
  };

  // 배너 추가 처리
  const handleSaveBanner = async () => {
    if (
      !currentBanner.postTitle ||
      !currentBanner.targetPath ||
      !currentBanner.imagePath
    ) {
      alert('모든 필드를 입력해야 합니다.');
      return;
    }
    try {
      await createBanner.mutateAsync({
        imagePath: currentBanner.imagePath,
        targetPath: currentBanner.targetPath,
        altText: currentBanner.altText || '배너 이미지',
        postTitle: currentBanner.postTitle,
      });

      alert('배너가 성공적으로 추가되었습니다!');
      // router.refresh();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('배너 추가 오류:', error);
      alert('배너 추가에 실패했습니다.');
    }
  };

  // 선택된 배너 삭제
  const handleDeleteBanners = async (rowsToDelete: Banner[]) => {
    if (!confirm(`정말로 ${rowsToDelete.length}개의 배너를 삭제하시겠습니까?`))
      return;

    try {
      // NCP에서 이미지 삭제
      await Promise.all(
        rowsToDelete.map(async (banner) => {
          if (banner.imagePath) {
            await fetch('/api/files', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ key: banner.imagePath }),
            });
          }
        }),
      );

      // 데이터베이스에서 배너 삭제
      await deleteBanners.mutateAsync(rowsToDelete);
      alert(`${rowsToDelete.length}개의 배너가 삭제되었습니다!`);
    } catch (error) {
      console.error('배너 삭제 오류:', error);
      alert('일부 배너 삭제에 실패했습니다.');
    }
  };

  // 테이블 컬럼 정의
  const columns: ColumnDef<Banner>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'postTitle',
      header: '제목',
      cell: ({ row }) => <div>{row.getValue('postTitle')}</div>,
    },
    {
      accessorKey: 'imageUrl',
      header: '배너 이미지',
      cell: ({ row }) => {
        const imageUrl = row.getValue('imageUrl') as string | null;
        return imageUrl ? (
          <div className="relative h-[150px] w-[300px]">
            <Image
              src={imageUrl}
              alt="배너 이미지"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 600px"
              className="rounded-md object-cover"
            />
          </div>
        ) : (
          <div className="text-gray-400">이미지가 없습니다.</div>
        );
      },
    },
    {
      accessorKey: 'targetPath',
      header: 'URL 링크',
      cell: ({ row }) => <div>{row.getValue('targetPath')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: '생성 일자',
      cell: ({ row }) => (
        <div>{new Date(row.getValue('createdAt')).toLocaleString()}</div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">배너 관리</h2>

      {/* 로딩 상태 표시 */}
      {loading && (
        <p className="text-center text-gray-500">데이터 불러오는 중...</p>
      )}
      {/* 오류 메시지 표시 */}
      {error && <p className="text-center text-red-500">오류 발생: {error}</p>}

      {!loading && !error && (
        <>
          {/* 배너 추가/편집 다이얼로그 */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 배너 추가</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {/* 배너 이름 입력 */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="postTitle" className="text-right">
                    배너 이름
                  </Label>
                  <Input
                    id="postTitle"
                    value={currentBanner.postTitle}
                    onChange={(e) =>
                      setCurrentBanner({
                        ...currentBanner,
                        postTitle: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>

                {/* 이미지 대체 텍스트 입력 */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="altText" className="text-right">
                    대체 문자
                  </Label>
                  <Input
                    id="altText"
                    value={currentBanner.altText}
                    onChange={(e) =>
                      setCurrentBanner({
                        ...currentBanner,
                        altText: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>

                {/* 링크 경로 입력 */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="targetPath" className="text-right">
                    URL 링크
                  </Label>
                  <Input
                    id="targetPath"
                    value={currentBanner.targetPath}
                    onChange={(e) =>
                      setCurrentBanner({
                        ...currentBanner,
                        targetPath: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>

                {/* 이미지 경로 입력 */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imagePath" className="text-right">
                    이미지 경로
                  </Label>
                  <Input
                    id="imagePath"
                    value={currentBanner.imagePath}
                    readOnly
                    className="col-span-3"
                  />
                </div>
              </div>

              <PostFileUploader
                postId=""
                uploadPath="banner"
                onUploadSuccess={handleImageUpload} // 업로드 성공 시 imagePath 저장
                className="dark:border-neutral-800 dark:bg-neutral-800"
              />

              <DialogFooter>
                <Button type="submit" onClick={handleSaveBanner}>
                  배너 추가
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* 데이터 테이블 렌더링 */}
          <DataTable
            columns={columns} // 테이블 컬럼 정보 (ColumnDef 배열)
            data={banners} // 테이블에 표시할 데이터 배열 (배너 리스트 등)
            // "추가" 버튼 클릭 시 실행할 함수
            onAdd={() => {
              setCurrentBanner({
                // 다이얼로그 초기값 설정
                postTitle: '',
                imagePath: '',
                targetPath: '',
                altText: '',
              });
              setIsDialogOpen(true); // 배너 추가 다이얼로그 열기
            }}
            onDelete={handleDeleteBanners} // 특정 배너를 선택한 후 "삭제" 버튼을 클릭하면 실행할 함수
            showSearch={true} // 검색창 활성화 여부
            showPagination={false} // 페이지네이션 (테이블 하단의 "다음 페이지" 버튼) 활성화 여부
            filterColumn="postTitle" // 검색할 컬럼 (배너 제목)
          />
        </>
      )}
    </div>
  );
}
