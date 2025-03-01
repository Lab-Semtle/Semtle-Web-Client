'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAdd?: () => void;
  onDelete?: (rows: TData[]) => void;
  showSearch?: boolean;
  showPagination?: boolean;
  filterColumn?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onAdd,
  onDelete,
  showSearch = true,
  showPagination = true,
  filterColumn = '',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  return (
    <div className="h-full w-full p-4">
      <div className="mb-4 flex items-center justify-between">
        {/* 검색창 */}
        {showSearch && filterColumn && (
          <Input
            placeholder="검색어를 입력하세요..."
            value={
              (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(filterColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        <div className="flex items-center gap-2">
          {/* 삭제 버튼 */}
          {onDelete && selectedRows.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => onDelete(selectedRows)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              선택 삭제 ({selectedRows.length} 개)
            </Button>
          )}
          {/* 추가 버튼 */}
          {onAdd && (
            <Button onClick={onAdd}>
              <Plus className="mr-2 h-4 w-4" /> 배너 추가하기
            </Button>
          )}
          {/* 속성 선택 드롭다운 메뉴 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                속성 선택 <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {typeof column.columnDef.header === 'string'
                        ? column.columnDef.header
                        : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 테이블 UI */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length}/
          {table.getFilteredRowModel().rows.length} 개 선택됨
        </div>

        {showPagination && (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              이전
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              다음
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/** 사용 방법 */
{
  /*   
 <DataTable
  columns={columns} // 테이블에 표시할 컬럼 정의 (ColumnDef 배열)
  data={banners} // 테이블에 표시할 데이터 배열 (배너 리스트 등)

  onAdd={() => console.log('추가')} 
  // "추가" 버튼을 클릭했을 때 실행할 함수
  // 예: `onAdd={() => setDialogOpen(true)}` → 다이얼로그 열기

  onDelete={(selected) => console.log('삭제:', selected)}
  // 선택한 행을 삭제할 때 실행할 함수
  // 선택한 데이터를 매개변수로 받음 → `onDelete={(selected) => API 호출}`

  showSearch={true} 
  // 검색창 활성화 여부
  // `false` → 검색창 숨김
  // `true` → 검색창 표시

  showPagination={false} // ❌  숨김
  - 페이지네이션
  - `false` : 숨김
  - `true` : 표시

  filterColumn="postTitle" 
  // 검색 대상 컬럼을 지정 (검색할 컬럼명)
  // 예: `"email"`, `"postTitle"`, `"imagePath"` 등
/> 
*/
}
