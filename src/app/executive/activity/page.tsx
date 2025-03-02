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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useFetchActivities } from '@/hooks/api/useFetchActivities';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 활동게시물 데이터 타입
export type ActivityPost = {
  board_id: number;
  title: string;
  content: string;
  createdAt: string;
  writer: string;
  type: string;
  imageUrl?: string;
};

export default function ActivityManagePage() {
  const { data: session, status } = useSession();
  const [category, setCategory] = useState<'공지' | '세미나' | '행사' | '기타'>(
    '공지',
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const posts: ActivityPost[] = data?.pages.flatMap((page) => page.posts) ?? [];
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState<Partial<ActivityPost>>({
    title: '',
    content: '',
  });
  const { data, isLoading, error } = useFetchActivities(category);

  // const handleSaveUser = () => {
  //   if (currentUser.name && currentUser.email) {
  //     if (dialogMode === 'add') {
  //       const newUser: User = {
  //         id: String(users.length + 1),
  //         name: currentUser.name,
  //         email: currentUser.email,
  //         role: currentUser.role || 'user',
  //       };
  //       setUsers([...users, newUser]);
  //     } else {
  //       // Edit existing user
  //       setUsers(
  //         users.map((user) =>
  //           user.id === currentUser.id
  //             ? ({ ...user, ...currentUser } as User)
  //             : user,
  //         ),
  //       );
  //     }

  //     setIsDialogOpen(false);
  //     setCurrentUser({ name: '', email: '', role: 'user' });
  //   }
  // };

  // const handleDeleteUsers = (rowsToDelete: User[]) => {
  //   setUsers(
  //     users.filter((user) => !rowsToDelete.some((row) => row.id === user.id)),
  //   );
  // };

  /** 게시물 삭제 API 요청 */
  const handleDeleteSinglePost = async (postId: number) => {
    if (!session?.accessToken) {
      alert('인증이 필요합니다. 다시 로그인해주세요.');
      return;
    }

    if (!confirm('정말로 이 게시물을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(API_ROUTES.DELETE_ACTIVITY(postId), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`삭제 실패: ${response.statusText}`);
      }

      alert('게시물이 성공적으로 삭제되었습니다!');
      router.refresh();
    } catch (error) {
      console.error('게시물 삭제 오류:', error);
      alert('게시물 삭제에 실패했습니다.');
    }
  };

  /** 게시물 수정 다이얼로그 열기 */
  const openEditDialog = (post: ActivityPost) => {
    setCurrentPost(post);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

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
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('title')}</div>
      ),
    },
    {
      accessorKey: 'writer',
      header: '작성자',
      cell: ({ row }) => <div>{row.getValue('writer')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: '작성일',
      cell: ({ row }) => (
        <div>{new Date(row.getValue('createdAt')).toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: 'type',
      header: '카테고리',
      cell: ({ row }) => <div>{row.getValue('type')}</div>,
    },
    // {
    //   accessorKey: 'role',
    //   header: 'Role',
    //   cell: ({ row }) => {
    //     const role = row.getValue('role');
    //     return (
    //       <Badge
    //         className={`${
    //           role === 'admin'
    //             ? 'rounded-full bg-green-200 px-4 text-gray-600 shadow-none dark:bg-green-400/20 dark:text-white'
    //             : 'rounded-full bg-blue-200 px-4 text-gray-600 shadow-none dark:bg-blue-400/20 dark:text-white'
    //         }`}
    //       >
    //         {role as string}
    //       </Badge>
    //     );
    //   },
    // },
    {
      accessorKey: 'imageUrl',
      header: '이미지',
      cell: ({ row }) => {
        const imageUrl = row.getValue('imageUrl') as string | null;
        return imageUrl ? (
          <div className="relative h-[100px] w-[200px]">
            <Image
              src={imageUrl}
              alt="게시물 이미지"
              fill
              className="rounded-md object-cover"
            />
          </div>
        ) : (
          <div className="text-gray-400">이미지 없음</div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const post = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
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
                    <DialogTitle>User Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                  </div>
                </DialogContent>
              </Dialog>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  openEditDialog(post);
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> 수정
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  handleDeleteSinglePost(post.board_id);
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
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">활동 게시물 관리</h2>

      {/* 카테고리 필터 */}
      <div className="mb-6 flex items-center gap-4">
        <span className="font-medium">카테고리 필터:</span>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as any)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="공지">공지</SelectItem>
            <SelectItem value="세미나">세미나</SelectItem>
            <SelectItem value="행사">행사</SelectItem>
            <SelectItem value="기타">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'add' ? 'Add New User' : 'Edit User'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={currentUser.name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={currentUser.role}
                onValueChange={(value) =>
                  setCurrentUser({
                    ...currentUser,
                    role: value as 'admin' | 'user',
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent id="role">
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveUser}>
              {dialogMode === 'add' ? 'Add User' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading ? (
        <p className="text-center text-gray-500">데이터 불러오는 중...</p>
      ) : error ? (
        <p className="text-center text-red-500">오류 발생: {error.message}</p>
      ) : (
        <DataTable
          columns={columns}
          data={posts}
          onAdd={() => {
            setCurrentUser({ name: '', email: '', role: 'user' });
            setDialogMode('add');
            setIsDialogOpen(true);
          }}
          onDelete={handleDeleteUsers}
        />
      )}
    </div>
  );
}
