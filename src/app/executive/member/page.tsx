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

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
    },
    {
      id: '3',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'user',
    },
    {
      id: '4',
      name: 'Bob Brown',
      email: 'bob@example.com',
      role: 'user',
    },
    {
      id: '5',
      name: 'Charlie White',
      email: 'charle@example.com',
      role: 'user',
    },
  ]);

  // 다이얼로그(팝업) 상태 관리
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'user',
  });
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  // 사용자 추가 및 수정
  const handleSaveUser = () => {
    if (currentUser.name && currentUser.email) {
      if (dialogMode === 'add') {
        // 새로운 사용자 추가
        const newUser: User = {
          id: String(users.length + 1),
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role || 'user',
        };
        setUsers([...users, newUser]);
      } else {
        // 기존 사용자 수정
        setUsers(
          users.map((user) =>
            user.id === currentUser.id
              ? ({ ...user, ...currentUser } as User)
              : user,
          ),
        );
      }

      // 팝업 닫기 및 입력 필드 초기화
      setIsDialogOpen(false);
      setCurrentUser({ name: '', email: '', role: 'user' });
    }
  };

  // 선택된 사용자 삭제
  const handleDeleteUsers = (rowsToDelete: User[]) => {
    setUsers(
      users.filter((user) => !rowsToDelete.some((row) => row.id === user.id)),
    );
  };

  // 개별 사용자 삭제
  const handleDeleteSingleUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  // 사용자 편집 다이얼로그 열기
  const openEditDialog = (user: User) => {
    setCurrentUser(user);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  // 테이블 컬럼 정의
  const columns: ColumnDef<User>[] = [
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
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.getValue('role');
        return (
          <Badge
            className={`${
              role === 'admin'
                ? 'rounded-full bg-green-200 px-4 text-gray-600 shadow-none dark:bg-green-400/20 dark:text-white'
                : 'rounded-full bg-blue-200 px-4 text-gray-600 shadow-none dark:bg-blue-400/20 dark:text-white'
            }`}
          >
            {role as string}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const user = row.original;
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
                    <Eye className="mr-2 h-4 w-4" /> View
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
                  openEditDialog(user);
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  handleDeleteSingleUser(user.id);
                }}
              >
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
      {/* 사용자 추가/편집 다이얼로그 */}
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

      {/* 데이터 테이블 렌더링 */}
      <DataTable
        columns={columns}
        data={users}
        onAdd={() => {
          setCurrentUser({ name: '', email: '', role: 'user' });
          setDialogMode('add');
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteUsers}
      />
    </div>
  );
}
