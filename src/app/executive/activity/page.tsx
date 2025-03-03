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
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, Edit, Eye } from 'lucide-react';
import { DataTable } from '@/components/admin/table/data-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useFetchPaginatedActivities } from '@/hooks/api/activity/useFetchPaginatedActivity';
import {
  useCreateActivity,
  useUpdateActivity,
  useDeleteActivity,
} from '@/hooks/api/activity/useMutateActivity';

// 활동 게시물 타입 정의
export type ActivityPost = {
  board_id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  images?: string[];
  type: string; // '공지' | '세미나' | '행사' | '기타';
};

export default function ActivityManagePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [currentPost, setCurrentPost] = useState<Partial<ActivityPost>>({
    title: '',
    content: '',
    writer: '',
    type: '기타',
  });

  // React Query 훅 사용
  const { posts, totalPages, isLoading, error, page, setPage } =
    useFetchPaginatedActivities();
  const createActivity = useCreateActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();

  // 게시물 저장 (추가 또는 수정)
  const handleSavePost = async () => {
    if (currentPost.title && currentPost.content && currentPost.writer) {
      if (dialogMode === 'add') {
        createActivity.mutate(currentPost as ActivityPost);
      } else {
        updateActivity.mutate({
          post_id: currentPost.board_id!,
          ...currentPost,
        });
      }

      setIsDialogOpen(false);
      setCurrentPost({ title: '', content: '', writer: '', type: '기타' });
    }
  };

  // 게시물 삭제
  const handleDeletePost = async (postId: number) => {
    deleteActivity.mutate({ board_id: postId });
  };

  // 수정 모드로 다이얼로그 열기
  const openEditDialog = (post: ActivityPost) => {
    setCurrentPost(post);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  // 테이블 컬럼 정의
  const columns: ColumnDef<ActivityPost>[] = [
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
      accessorKey: 'title',
      header: '제목',
      cell: ({ row }) => <div>{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'writer',
      header: '작성자',
      cell: ({ row }) => <div>{row.getValue('writer')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: '작성일자',
      cell: ({ row }) => <div>{row.getValue('createdAt')}</div>,
    },
    {
      accessorKey: 'type',
      header: '유형',
      cell: ({ row }) => {
        const type = row.getValue('type') as string;
        return (
          <Badge
            className={`${
              type === '공지'
                ? 'bg-red-400 text-white'
                : type === '세미나'
                  ? 'bg-blue-400 text-white'
                  : type === '행사'
                    ? 'bg-green-400 text-white'
                    : 'bg-gray-400 text-white'
            } rounded-full px-3 py-1`}
          >
            {type}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: '설정',
      cell: ({ row }) => {
        const post = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">메뉴 열기</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <Dialog>
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
              </Dialog> */}

              <DropdownMenuItem onClick={() => openEditDialog(post)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeletePost(post.board_id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div>
      {/* 데이터 로딩 중 메시지 */}
      {isLoading && (
        <p className="text-center text-gray-500">데이터 불러오는 중...</p>
      )}

      {/* API 호출 실패 메시지 */}
      {error && <p className="text-center text-red-500">{error.message}</p>}

      {!isLoading && !error && (
        <>
          {/* 게시물 추가/수정 다이얼로그 */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {dialogMode === 'add' ? 'Add Post' : 'Edit Post'}
                </DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Title"
                value={currentPost.title}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, title: e.target.value })
                }
              />
              <Input
                placeholder="Content"
                value={currentPost.content}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, content: e.target.value })
                }
              />
              <Input
                placeholder="Writer"
                value={currentPost.writer}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, writer: e.target.value })
                }
              />
              <DialogFooter>
                <Button onClick={handleSavePost}>
                  {dialogMode === 'add' ? 'Add' : 'Save'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* 활동 게시물 테이블 */}
          <DataTable
            columns={columns}
            data={posts}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            onAdd={() => {
              setDialogMode('add');
              setIsDialogOpen(true);
            }}
          />
        </>
      )}
    </div>
  );
}
