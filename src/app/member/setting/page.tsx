// 개인정보 수정 페이지
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Page() {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-center text-2xl font-bold">회원정보관리</h1>

        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-300">
              <span className="text-gray-500">사진</span>
            </div>
          </div>

          <Table className="mx-auto w-[70%]">
            <TableBody>
              <TableRow>
                <TableCell className="w-1/2 font-medium">이름</TableCell>
                <TableCell className="w-2/2">홍길동</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-1/2 font-medium">생년월일</TableCell>
                <TableCell className="w-2/2">
                  {birthDate ? format(birthDate, 'PPP') : 'January 1st, 2025'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-1/2 font-medium">전화번호</TableCell>
                <TableCell className="w-2/2">010-1234-5678</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="px-4 py-2 text-sm"
                >
                  수정하기
                </Button>
              </SheetTrigger>

              <SheetContent
                side="bottom"
                className="flex flex-col items-center"
              >
                <SheetHeader className="text-center">
                  <SheetTitle>회원정보 수정</SheetTitle>
                  <SheetDescription>
                    아래 항목을 수정하고 저장 버튼을 눌러주세요.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid w-[60%] gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">
                      이름
                    </Label>
                    <Input
                      id="edit-name"
                      defaultValue="홍길동"
                      className="col-span-3 w-full"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-birthDate" className="text-right">
                      생년월일
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'col-span-3 w-full justify-start text-left font-normal',
                            !birthDate && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {birthDate
                            ? format(birthDate, 'PPP')
                            : '날짜를 선택하세요'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={birthDate}
                          onSelect={setBirthDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-phone" className="text-right">
                      전화번호
                    </Label>
                    <Input
                      id="edit-phone"
                      defaultValue="010-1234-5678"
                      className="col-span-3 w-full"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-profile" className="text-right">
                      프로필 이미지
                    </Label>
                    <Input
                      id="edit-profile"
                      type="file"
                      accept="image/*"
                      className="col-span-3 w-full"
                    />
                  </div>
                  {/* 저장 버튼 */}
                  <div className="flex justify-center pt-4">
                    <SheetClose asChild>
                      <Button type="submit">저장</Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
