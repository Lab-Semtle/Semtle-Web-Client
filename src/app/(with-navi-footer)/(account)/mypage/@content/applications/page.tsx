'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// 📌 신청한 프로젝트 데이터 (예제)
const appliedProjects = [
  {
    id: 1,
    title: 'AI 프로젝트',
    appliedDate: '2025-02-20',
    status: '대기중', // 승인됨, 반려됨 가능
  },
  {
    id: 2,
    title: '웹 서비스 개발',
    appliedDate: '2025-02-18',
    status: '승인됨',
  },
  {
    id: 3,
    title: '모바일 앱 개발',
    appliedDate: '2025-02-15',
    status: '반려됨',
  },
];

export default function ApplicationsTab() {
  const [applications, setApplications] = useState(appliedProjects);

  // 신청 취소 함수 (대기 중인 경우만 가능)
  const cancelApplication = (id: number) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 📌 메인 컨텐츠 영역 (남은 공간을 모두 차지하도록 설정) */}
      <main className="container mx-auto flex-grow p-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
          프로젝트 신청 내역
        </h1>

        {/* 📌 신청 내역 테이블 */}
        <Table className="border border-gray-200 dark:border-gray-700">
          <TableHeader className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <TableRow>
              <TableHead>프로젝트 제목</TableHead>
              <TableHead>신청 날짜</TableHead>
              <TableHead>승인 상태</TableHead>
              <TableHead>신청 취소</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((project) => (
              <TableRow
                key={project.id}
                className="text-gray-700 dark:text-gray-300"
              >
                {/* 📌 프로젝트 제목 (클릭 시 상세 페이지 이동) */}
                <TableCell>
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {project.title}
                  </Link>
                </TableCell>
                {/* 📌 신청 날짜 */}
                <TableCell>{project.appliedDate}</TableCell>
                {/* 📌 승인 상태 (Badge 적용) */}
                <TableCell>
                  <Badge
                    className={
                      project.status === '대기중'
                        ? 'bg-yellow-500 text-white'
                        : project.status === '승인됨'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                    }
                  >
                    {project.status}
                  </Badge>
                </TableCell>
                {/* 📌 신청 취소 버튼 (대기중인 경우만 활성화) */}
                <TableCell>
                  {project.status === '대기중' ? (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                      onClick={() => cancelApplication(project.id)}
                    >
                      신청 취소
                    </Button>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">
                      취소 불가
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
