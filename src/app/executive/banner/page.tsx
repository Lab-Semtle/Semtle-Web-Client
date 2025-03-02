'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { MoreHorizontal, Trash2, Edit, Eye } from 'lucide-react';
import { DataTable } from '@/components/admin/table/data-table';
import Image from 'next/image';
import { useFetchBanners } from '@/hooks/api/useFetchBanners';
import PostFileUploader from '@/components/editor/PostFileUploader';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// 배너 데이터 타입
export type Banner = {
  bannerId: number;
  imagePath: string;
  targetPath: string;
  altText?: string;
  postTitle: string;
  createdAt: string;
  imageUrl?: string | null;
};

export default function BannerManagePage() {
  const { data: session, status } = useSession();
  const { banners, loading, error } = useFetchBanners();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // 다이얼로그(팝업) 상태 관리
  const router = useRouter();
  // const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [currentBanner, setCurrentBanner] = useState<Partial<Banner>>({
    // 배너 입력 데이터 관리
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

  // 배너 추가 API 호출
  const handleSaveBanner = async () => {
    if (
      !currentBanner.postTitle ||
      !currentBanner.targetPath ||
      !currentBanner.imagePath
    ) {
      alert('모든 필드를 입력해야 합니다.');
      return;
    }

    const cleanedImagePath = currentBanner.imagePath.replace(/^\/+/, '');

    try {
      const response = await fetch(API_ROUTES.CREATE_BANNERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.accessToken && {
            Authorization: `Bearer ${session.accessToken}`,
          }),
        },
        body: JSON.stringify({
          imagePath: cleanedImagePath,
          targetPath: currentBanner.targetPath,
          altText: currentBanner.altText || '배너 이미지',
          postTitle: currentBanner.postTitle,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      alert('배너가 성공적으로 추가되었습니다!');
      router.refresh();
    } catch (error) {
      console.error('배너 추가 오류:', error);
      alert('배너 추가에 실패했습니다.');
    }
    setIsDialogOpen(false);
  };

  // 선택된 배너 삭제
  const handleDeleteBanners = async (rowsToDelete: Banner[]) => {
    if (!session?.accessToken) {
      alert('인증이 필요합니다. 다시 로그인해주세요.');
      return;
    }

    if (!confirm(`정말로 ${rowsToDelete.length}개의 배너를 삭제하시겠습니까?`))
      return;

    try {
      await Promise.all(
        rowsToDelete.map(async (banner) => {
          const response = await fetch(
            API_ROUTES.DELETE_BANNERS(banner.bannerId),
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.accessToken}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error(`삭제 실패: ${banner.postTitle}`);
          }
        }),
      );

      alert(`${rowsToDelete.length}개의 배너가 삭제되었습니다!`);
      router.refresh();
    } catch (error) {
      console.error('배너 삭제 오류:', error);
      alert('일부 배너 삭제에 실패했습니다.');
    }
  };

  // // 개별 배너 삭제
  // const handleDeleteSingleBanner = async (bannerId: number) => {
  //   if (!session?.accessToken) {
  //     alert('인증이 필요합니다. 다시 로그인해주세요.');
  //     return;
  //   }

  //   if (!confirm('정말로 이 배너를 삭제하시겠습니까?')) return;

  //   try {
  //     const response = await fetch(API_ROUTES.DELETE_BANNERS(bannerId), {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${session.accessToken}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(
  //         `삭제 실패: ${response.status} - ${response.statusText}`,
  //       );
  //     }

  //     alert('배너가 성공적으로 삭제되었습니다!');
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('배너 삭제 오류:', error);
  //     alert('배너 삭제에 실패했습니다.');
  //   }
  // };

  // 배너 편집 다이얼로그 열기
  // const openEditDialog = (banner: Banner) => {
  //   setCurrentBanner(banner);
  //   setDialogMode('edit');
  //   setIsDialogOpen(true);
  // };

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

    // {
    //   id: 'actions',
    //   header: '설정',
    //   cell: ({ row }) => {
    //     const banner = row.original;
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">메뉴 열기</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <Dialog>
    //             <DialogTrigger asChild>
    //               <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
    //                 <Eye className="mr-2 h-4 w-4" /> 상세 보기
    //               </DropdownMenuItem>
    //             </DialogTrigger>
    //             <DialogContent>
    //               <DialogHeader>
    //                 <p>제목: {banner.postTitle}</p>
    //                 <p>링크: {banner.targetPath}</p>
    //                 <p>
    //                   생성 날짜: {new Date(banner.createdAt).toLocaleString()}
    //                 </p>
    //               </DialogHeader>
    //             </DialogContent>
    //           </Dialog>

    //           <DropdownMenuItem
    //             onSelect={(e) => {
    //               e.preventDefault();
    //               // openEditDialog(banner); // 수정 다이얼로그 열기
    //             }}
    //           >
    //             <Edit className="mr-2 h-4 w-4" /> 수정
    //           </DropdownMenuItem>

    //           <DropdownMenuItem
    //             onSelect={(e) => {
    //               e.preventDefault();
    //               handleDeleteSingleBanner(banner.bannerId); // 삭제 실행
    //             }}
    //           >
    //             <Trash2 className="mr-2 h-4 w-4" /> 삭제
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
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
                postId="banner"
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
            columns={columns} // 테이블 컬럼 정보
            data={banners} // 배너 데이터 리스트
            onAdd={() => {
              setCurrentBanner({
                postTitle: '',
                imagePath: '',
                targetPath: '',
                altText: '',
              });
              // setDialogMode('add');
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
