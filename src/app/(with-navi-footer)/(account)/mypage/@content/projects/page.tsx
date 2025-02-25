'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

const projects = [
  {
    id: 1,
    title: 'AI 프로젝트',
    status: '모집중',
    deadline: '2025-03-01',
    applicants: 3,
  },
  {
    id: 2,
    title: '웹 서비스 개발',
    status: '모집완료',
    deadline: '2025-02-20',
    applicants: 5,
  },
  {
    id: 3,
    title: '모바일 앱 개발',
    status: '모집중',
    deadline: '2025-02-28',
    applicants: 2,
  },
];

const applicantsData: Record<
  number,
  { id: number; name: string; date: string; status: string }[]
> = {
  1: [
    { id: 101, name: '홍길동', date: '2025-02-24', status: '대기중' },
    { id: 102, name: '김철수', date: '2025-02-23', status: '대기중' },
  ],
  2: [{ id: 103, name: '이영희', date: '2025-02-22', status: '승인됨' }],
};

export default function ProjectsTab() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-grow p-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
          내 프로젝트 공고
        </h1>

        {/* 프로젝트 공고 목록 (카드형) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border-gray-200 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-800"
            >
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                <p>📌 상태: {project.status}</p>
                <p>📅 마감일: {project.deadline}</p>
                <p>👥 지원자: {project.applicants}명</p>
                <div className="mt-4 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={() => setSelectedProject(project.id)}
                      >
                        신청자 보기
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800">
                      <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-gray-100">
                          신청자 목록
                        </DialogTitle>
                      </DialogHeader>

                      <Table className="border border-gray-200 dark:border-gray-700">
                        <TableHeader className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                          <TableRow>
                            <TableHead>이름</TableHead>
                            <TableHead>지원 날짜</TableHead>
                            <TableHead>상태</TableHead>
                            <TableHead>승인 관리</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedProject !== null &&
                            applicantsData[selectedProject]?.map(
                              (applicant) => (
                                <TableRow
                                  key={applicant.id}
                                  className="text-gray-700 dark:text-gray-300"
                                >
                                  <TableCell>{applicant.name}</TableCell>
                                  <TableCell>{applicant.date}</TableCell>
                                  <TableCell>{applicant.status}</TableCell>
                                  <TableCell>
                                    <Button
                                      size="sm"
                                      variant="default"
                                      className="bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                                    >
                                      승인
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      className="ml-2 bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                                    >
                                      반려
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ),
                            )}
                        </TableBody>
                      </Table>

                      <DialogClose asChild>
                        <Button
                          className="mt-4 border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-700"
                          variant="outline"
                        >
                          닫기
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    수정
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    삭제
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
