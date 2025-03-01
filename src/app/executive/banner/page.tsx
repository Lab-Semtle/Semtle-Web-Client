'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, Edit, Eye } from 'lucide-react';
import { DataTable } from '@/components/admin/table/data-table';
import Image from 'next/image';
import { useFetchBanners } from '@/hooks/api/useFetchBanners';
import PostFileUploader from '@/components/editor/PostFileUploader';
import { API_ROUTES } from '@/constants/ApiRoutes';

// 배너 데이터 타입 정의
export type Banner = {
  bannerId: number;
  imagePath: string;
  targetPath: string;
  altText?: string;
  postTitle: string;
  createdAt: string;
  imageUrl?: string | null;
};

export default function AdminBannerPage() {
  const { banners, loading, error } = useFetchBanners();

  // 다이얼로그(팝업) 상태 관리
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<Partial<Banner>>({
    postTitle: '',
    targetPath: '',
    imagePath: '',
    altText: '',
  });
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null,
  );

  // 배너 추가 및 수정
  const handleSaveBanner = async () => {
    if (!currentBanner.postTitle || !currentBanner.targetPath) {
      alert('제목과 링크 경로를 입력해주세요.');
      return;
    }

    if (!uploadedImagePath) {
      alert('이미지를 업로드해주세요.');
      return;
    }

    try {
      const response = await fetch(API_ROUTES.CREATE_BANNERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imagePath: uploadedImagePath,
          targetPath: currentBanner.targetPath,
          altText: currentBanner.altText || '',
          postTitle: currentBanner.postTitle,
        }),
      });

      if (!response.ok) {
        throw new Error('배너 추가 실패');
      }

      alert('배너가 성공적으로 추가되었습니다.');
      window.location.reload(); // 성공 시 페이지 새로고침하여 UI 업데이트
    } catch (error) {
      console.error('배너 추가 실패:', error);
      alert('배너 추가 중 오류 발생');
    }

    setIsDialogOpen(false);
  };

  // 선택된 배너 삭제
  //   const handleDeleteBanners = (rowsToDelete: Banner[]) => {
  //     // TODO: API를 통해 배너 삭제 로직 구현
  //     console.log('삭제할 배너:', rowsToDelete);
  //   };

  // 개별 배너 삭제
  const handleDeleteSingleBanner = async (bannerId: number) => {
    try {
      const response = await fetch(`${API_ROUTES.DELETE_BANNERS}/${bannerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('배너 삭제 실패');
      }

      alert('배너가 삭제되었습니다.');
      window.location.reload(); // 삭제 후 새로고침
    } catch (error) {
      console.error('배너 삭제 실패:', error);
      alert('배너 삭제 중 오류 발생');
    }
  };

  // 배너 편집 다이얼로그 열기
  const openEditDialog = (banner: Banner) => {
    setCurrentBanner(banner);
    setDialogMode('edit');
    setIsDialogOpen(true);
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
          <Image
            src={imageUrl}
            alt="배너 이미지"
            width={300}
            height={150}
            className="rounded-md object-cover"
          />
        ) : (
          <div className="text-gray-400">이미지 없음</div>
        );
      },
    },
    {
      accessorKey: 'targetPath',
      header: '링크 경로',
      cell: ({ row }) => <div>{row.getValue('targetPath')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: '생성 날짜',
      cell: ({ row }) => (
        <div>{new Date(row.getValue('createdAt')).toLocaleString()}</div>
      ),
    },

    {
      id: 'actions',
      header: '설정',
      cell: ({ row }) => {
        const banner = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">메뉴 열기</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Eye className="mr-2 h-4 w-4" /> 상세 보기
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <p>제목: {banner.postTitle}</p>
                    <p>링크: {banner.targetPath}</p>
                    <p>
                      생성 날짜: {new Date(banner.createdAt).toLocaleString()}
                    </p>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  openEditDialog(banner); // 수정 다이얼로그 열기
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> 수정
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  handleDeleteSingleBanner(banner.bannerId); // 삭제 실행
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" /> 삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div>
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
                <DialogTitle>
                  {dialogMode === 'add' ? '새 배너 추가' : '배너 수정'}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {/* 배너 제목 입력 */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="postTitle" className="text-right">
                    배너 제목
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

                {/* 이미지 경로 입력 */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imagePath" className="text-right">
                    이미지 경로
                  </Label>
                  <Input
                    id="imagePath"
                    value={currentBanner.imagePath}
                    onChange={(e) =>
                      setCurrentBanner({
                        ...currentBanner,
                        imagePath: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>

                {/* 링크 경로 입력 */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="targetPath" className="text-right">
                    링크 경로
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

                {/* 이미지 대체 텍스트 입력 */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="altText" className="text-right">
                    이미지 설명 (alt)
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
              </div>

              <div>
                <Label>이미지 업로드</Label>
                <PostFileUploader
                  postId="banner"
                  onUploadSuccess={(path) => setUploadedImagePath(path)} // 수정 중
                />
              </div>

              <DialogFooter>
                <Button type="submit" onClick={handleSaveBanner}>
                  {dialogMode === 'add' ? '배너 추가' : '변경 사항 저장'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* 데이터 테이블 렌더링 */}
          <DataTable
            columns={columns} // 테이블 컬럼 정보
            data={banners} // 배너 데이터 리스트
            onAdd={() => {
              setCurrentBanner({
                postTitle: '',
                imagePath: '',
                targetPath: '',
                altText: '',
              });
              setDialogMode('add');
              setIsDialogOpen(true);
            }} // 배너 추가 버튼 클릭 시 다이얼로그 오픈
            onDelete={handleDeleteBanners} // 선택된 배너 삭제
            showSearch={true} // 검색창 활성화
            showPagination={false}
            filterColumn="postTitle" // 검색할 컬럼 (배너 제목)
          />
        </>
      )}
    </div>
  );
}
