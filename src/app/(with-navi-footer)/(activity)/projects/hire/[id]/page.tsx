'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils/format-date';
import { useProjectDetail } from '@/hooks/api/project/useProjectDetail';
import ProjectApplyForm from '@/components/form/ProjectApplyForm';

const ProjectHirePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { postData, loading, error } = useProjectDetail(id);

  if (loading)
    return <p className="text-center text-gray-500">게시물을 불러오는 중...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        게시물을 불러오는 데 실패했습니다.
      </p>
    );
  if (!postData)
    return (
      <p className="text-center text-gray-500">게시물을 찾을 수 없습니다.</p>
    );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mb-36 mt-40 max-w-4xl p-4">
        <Card className="border-none bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="space-y-6">
              {/* 프로젝트 헤더 영역 */}
              <h1 className="text-left text-4xl font-bold">{postData.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge className="bg-blue-500 text-base text-white">
                  {postData.projectTypeCategory}
                </Badge>
                {postData.relationFieldCategory.map((category, index) => (
                  <Badge
                    key={index}
                    className="bg-gray-500 text-base text-white"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="flex w-full items-center justify-between border-b pb-4 text-sm dark:text-gray-200">
                <p className="text-lg font-medium">{postData.writerName}</p>
                <Badge
                  className={`px-3 py-1 text-sm font-semibold ${
                    postData.projectStatus === 'RECRUITING'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-400 text-white'
                  }`}
                >
                  {postData.projectStatus === 'RECRUITING'
                    ? '모집중'
                    : '마감됨'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-6 text-lg font-medium">
                <p>
                  <strong>진행 기간 :</strong>{' '}
                  {formatDate(postData.projectStartTime)} ~{' '}
                  {formatDate(postData.projectEndTime)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg font-medium dark:text-gray-200">
                  <strong>모집 마감 :</strong>{' '}
                  {formatDate(postData.projectRecruitingEndTime)}
                </span>
              </div>

              {/* 문의 링크 */}
              <div className="flex items-center gap-2">
                <label className="text-lg font-bold dark:text-gray-200">
                  문의 :
                </label>
                <p className="break-words text-blue-500 underline">
                  {postData.contact ? (
                    <a
                      href={postData.contact}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {postData.contact}
                    </a>
                  ) : (
                    '문의 정보 없음'
                  )}
                </p>
              </div>

              {/* 프로젝트 정보 영역 */}
              <div>
                <label className="text-lg font-bold text-gray-700 dark:text-gray-200">
                  프로젝트 소개 :
                </label>
                <p className="mt-2 text-lg font-medium">
                  {postData.content || '설명 없음'}
                </p>
              </div>

              <div className="mt-10 flex justify-center gap-5">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-1/2 bg-semtle-dark text-black hover:bg-semtle-lite dark:bg-semtle-dark dark:hover:bg-semtle-lite">
                      참여 신청하기
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>프로젝트 신청</DialogTitle>
                    </DialogHeader>
                    {id ? (
                      <ProjectApplyForm
                        postId={id}
                        onClose={() => setIsDialogOpen(false)}
                      />
                    ) : (
                      <p className="text-red-500">
                        올바른 프로젝트 ID가 필요합니다.
                      </p>
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  onClick={() => router.push('/projects')}
                  className="w-1/2"
                >
                  목록으로 돌아가기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectHirePage;
