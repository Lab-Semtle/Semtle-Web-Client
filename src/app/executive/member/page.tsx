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
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Eye, EyeOff } from 'lucide-react';
import { DataTable } from '@/components/admin/table/data-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  useFetchMembers,
  UserDetail,
} from '@/hooks/api/member/useFetchMembers';
import { useToast } from '@/hooks/useToast';
import { useCreateMember } from '@/hooks/api/member/useCreateMember';
import { useDeactivateMember } from '@/hooks/api/member/useDeactivateMember';

export type User = {
  uuid: string;
  username: string;
  email: string;
  studentId: string | null;
  birth: string; // ISO 8601
  phone: string; // 010-1111-1111
  role: 'ADMIN' | 'USER';
  manageApprovalStatus: boolean;
};

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [page, setPage] = useState(0);
  const { members, totalPages, isLoading, error, refetch } = useFetchMembers(
    page,
    10,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false); // 팝업 상태
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add'); // 팝업 모드
  const [showPassword, setShowPassword] = useState(false);

  // 상세보기, 검색용 사용자 상태 관리
  const [currentUser, setCurrentUser] = useState<Partial<UserDetail>>({
    uuid: '',
    email: '',
    studentId: null, // 학번
    username: '',
    birth: '', // 생년월일 (ISO 8601)
    phone: '',
    role: 'USER', // 기본값을 일반 사용자(USER)로 설정
    manageApprovalStatus: false, // 기본값은 미승인
  });
  const { createMember } = useCreateMember(); // 회원 1명 생성
  const { deactivateMember } = useDeactivateMember(); // 회원 정지

  /**
   * 데이터 추가 또는 수정 함수
   * - 사용자가 입력한 데이터를 기반으로 새로운 사용자를 추가하거나 기존 사용자를 수정
   */
  const handleSaveUser = async () => {
    try {
      if (dialogMode === 'add') {
        if (
          !currentUser.username ||
          !currentUser.email ||
          !currentUser.password
        ) {
          alert('이름, 이메일, 비밀번호를 입력해야 합니다.');
          return;
        }

        if (!confirm('새로운 회원을 추가하시겠습니까?')) return;

        const newUser = {
          email: currentUser.email,
          password: currentUser.password,
          role: currentUser.role as 'ADMIN' | 'USER',
          name: currentUser.username,
          profileUrl: currentUser.profileUrl || '', // 기본값 설정
          manageApprovalStatus: currentUser.manageApprovalStatus ?? false,
        };

        const result = await createMember(newUser);

        if (result && result.success) {
          toast({ description: '회원이 성공적으로 추가되었습니다.' });
          setIsDialogOpen(false); // 팝업 닫기
          refetch(); // 목록 갱신
        } else {
          toast({
            variant: 'destructive',
            description: result?.message || '회원 추가 실패',
          });
        }
      } else {
        if (!currentUser.uuid) {
          alert('사용자 UUID가 없습니다.');
          return;
        }

        if (!confirm('회원의 승인 상태를 변경하시겠습니까?')) return;

        const result = await deactivateMember(
          currentUser.uuid,
          currentUser.manageApprovalStatus ?? false,
        );

        if (result?.success) {
          toast({ description: '회원 승인 상태가 변경되었습니다.' });
          setIsDialogOpen(false);
          refetch();
        } else {
          toast({
            variant: 'destructive',
            description: result?.message || '회원 승인 상태 변경 실패',
          });
        }
      }
    } catch (error) {
      console.error('회원 저장 실패:', error);
      toast({
        variant: 'destructive',
        description: '회원 저장 중 오류가 발생했습니다.',
      });
    }
  };

  /**
   * 데이터 편집 다이얼로그 열기
   * - 기존 데이터 정보를 불러와서 편집할 수 있도록 설정
   */
  const openEditDialog = (user: User) => {
    setCurrentUser(user);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  /**
   * 테이블 컬럼 정의
   * - 사용자 데이터를 표시할 테이블의 각 열을 정의
   */
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'studentId',
      header: '학번',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('studentId')}</div>
      ),
    },
    {
      accessorKey: 'username',
      header: '이름',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('username')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: '이메일',
      cell: ({ row }) => <div>{row.getValue('email')}</div>,
    },

    {
      accessorKey: 'role',
      header: '권한',
      cell: ({ row }) => {
        const role = row.getValue('role');
        return (
          <Badge
            className={`${
              role === 'ADMIN'
                ? 'rounded-full bg-red-500 px-4 text-white shadow-none dark:bg-red-400/20 dark:text-white'
                : 'rounded-full bg-green-500 px-4 text-white shadow-none dark:bg-green-400/20 dark:text-white'
            }`}
          >
            {role as string}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'manageApprovalStatus',
      header: '승인 여부',
      cell: ({ row }) => {
        const approved = row.getValue('manageApprovalStatus');
        return (
          <Badge
            className={
              approved
                ? 'bg-blue-500 text-white dark:bg-blue-400/20'
                : 'bg-gray-500 text-white dark:bg-gray-400/20'
            }
          >
            {approved ? '승인됨' : '미승인'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: '설정',
      cell: ({ row }) => {
        const user = row.original;
        return (
          // 여기에 회원 상세보기 ㄱㄱ
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
                    <DialogTitle>상세 보기</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <p>
                      <strong>이름:</strong> {user.username}
                    </p>
                    <p>
                      <strong>학번:</strong> {user.studentId ?? '없음'}
                    </p>
                    <p>
                      <strong>생년월일:</strong> {user.birth}
                    </p>
                    <p>
                      <strong>이메일:</strong> {user.email}
                    </p>
                    <p>
                      <strong>전화번호:</strong> {user.phone}
                    </p>
                    <p>
                      <strong>권한:</strong> {user.role}
                    </p>
                    <p>
                      <strong>승인 여부:</strong>{' '}
                      {user.manageApprovalStatus ? '승인됨' : '미승인'}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  openEditDialog(user);
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> 수정하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">전체 학회원 관리</h2>
      {isLoading && (
        <p className="text-center text-gray-500">데이터 불러오는 중...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!isLoading && !error && (
        <>
          {/* 사용자 추가/편집 다이얼로그 */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {dialogMode === 'add' ? '새로운 회원 등록' : '회원 정보 수정'}
                </DialogTitle>
                <DialogDescription>
                  {dialogMode === 'add'
                    ? '새로운 회원을 추가하려면 아래 정보를 입력하세요.'
                    : '회원 권한 및 승인 여부 변경할 수 있습니다.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    이름
                  </Label>
                  <Input
                    id="name"
                    value={currentUser.username}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        username: e.target.value,
                      })
                    }
                    className="col-span-3"
                    disabled={dialogMode === 'edit'}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    이메일
                  </Label>
                  <Input
                    id="email"
                    value={currentUser.email}
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, email: e.target.value })
                    }
                    className="col-span-3"
                    disabled={dialogMode === 'edit'}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    비밀번호
                  </Label>
                  <div className="relative col-span-3">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={
                        dialogMode === 'edit'
                          ? '**********'
                          : currentUser.password || ''
                      }
                      onChange={(e) =>
                        setCurrentUser({
                          ...currentUser,
                          password: e.target.value,
                        })
                      }
                      disabled={dialogMode === 'edit'} // 수정 모드에서는 비활성화
                    />
                    {dialogMode === 'add' && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    권한
                  </Label>
                  <Select
                    value={currentUser.role}
                    onValueChange={(value) =>
                      setCurrentUser({
                        ...currentUser,
                        role: value as 'ADMIN' | 'USER',
                      })
                    }
                    disabled={dialogMode === 'edit'}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue>
                        {currentUser.role === 'ADMIN' ? 'ADMIN' : 'USER'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent id="role">
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="approvalStatus" className="text-right">
                    승인 여부
                  </Label>
                  <Select
                    value={
                      currentUser.manageApprovalStatus ? 'approved' : 'pending'
                    }
                    onValueChange={(value) =>
                      setCurrentUser({
                        ...currentUser,
                        manageApprovalStatus: value === 'approved',
                      })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="승인 여부" />
                    </SelectTrigger>
                    <SelectContent id="approvalStatus">
                      <SelectItem value="approved">승인됨</SelectItem>
                      <SelectItem value="pending">미승인</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleSaveUser}>
                  {dialogMode === 'add' ? '추가 하기' : '변경 하기'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* 데이터 테이블 */}
          <DataTable
            columns={columns}
            data={members}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            onAdd={() => {
              setCurrentUser({ username: '', email: '', role: 'USER' });
              setDialogMode('add');
              setIsDialogOpen(true);
            }}
            showSearch={true} // 검색창 활성화
            showPagination={true} // 페이지네이션 활성화
            filterColumn="username" // 검색할 컬럼
          />
        </>
      )}
    </div>
  );
}
