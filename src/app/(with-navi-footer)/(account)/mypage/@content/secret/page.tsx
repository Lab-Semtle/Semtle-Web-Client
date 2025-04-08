'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Eye,
  CalendarDays,
  FileText,
  ChevronLeft,
  ChevronRight,
  List,
} from 'lucide-react';
import Link from 'next/link';
import { API_ROUTES } from '@/constants/ApiRoutes';

type SecretPost = {
  board_id: number;
  title: string;
  createdAt: string;
  fileUrl?: string[];
};

export default function SecretTab() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [secrets, setSecrets] = useState<SecretPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 9; // 한 페이지당 표시할 게시물 개수

  const fetchSecrets = useCallback(
    async (page: number) => {
      if (!session?.id || !session?.accessToken) {
        console.error('사용자 세션이 없습니다.');
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        router.push('/signin');
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          API_ROUTES.GET_MY_ARCHIVES(page, pageSize, session.id),
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          },
        );

        if (response.status === 401) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          router.push('/signin');
          return;
        }

        if (!response.ok) throw new Error('족보 목록을 불러오지 못했습니다.');

        const result = await response.json();
        setSecrets(result.data.posts || []);
        setTotalPages(result.data.total_pages || 1);
        setTotalPosts(result.data.total_post || 0);
      } catch (err) {
        console.error('족보 불러오기 오류:', err);
        setError('족보 목록을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [session?.id, session?.accessToken, router],
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다.');
      router.push('/signin');
      return;
    }

    if (session?.user && session?.accessToken) {
      fetchSecrets(currentPage);
    }
  }, [session, status, currentPage, fetchSecrets]);

  /** 족보 삭제 */
  const deleteSecret = async (id: number) => {
    if (!confirm('정말로 이 족보를 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(API_ROUTES.DELETE_ARCHIVE(id), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (response.status === 401) {
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        router.push('/signin');
        return;
      }

      if (!response.ok) throw new Error('족보 삭제 실패');

      setSecrets((prev) => prev.filter((secret) => secret.board_id !== id));
      setTotalPosts((prev) => prev - 1);
      alert('족보가 삭제되었습니다.');
    } catch (error) {
      console.error('족보 삭제 오류:', error);
      alert('족보 삭제에 실패했습니다.');
    }
  };

  /** 페이지네이션 핸들러 */
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (status === 'loading' || loading)
    return <p className="text-center">로딩 중...</p>;
  if (status === 'unauthenticated' || !session) return null;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-grow p-6">
        {/* 총 게시물 개수 표시 */}
        <p className="mb-6 flex items-center text-lg text-gray-700 dark:text-gray-300">
          <List className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />총
          <span className="ml-1 font-semibold">{totalPosts}</span> 개
        </p>

        {/* 업로드된 족보 목록 (카드형 UI) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {secrets.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              업로드한 족보가 없습니다.
            </p>
          ) : (
            secrets.map((secret) => (
              <Card
                key={secret.board_id}
                className="border-gray-200 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-800"
              >
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    <Link
                      href={`/secret/${secret.board_id}`}
                      className="hover:underline"
                    >
                      {secret.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    작성일자 : {new Date(secret.createdAt).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    파일 개수 : {secret.fileUrl?.length ?? 0}개
                  </p>

                  <div className="mt-6 flex gap-2">
                    {/* 수정 버튼 */}
                    <Link href={`/mypage/secret/edit/${secret.board_id}`}>
                      <Button
                        size="sm"
                        variant="default"
                        className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        수정
                      </Button>
                    </Link>

                    {/* 삭제 버튼 */}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                      onClick={() => deleteSecret(secret.board_id)}
                    >
                      삭제
                    </Button>

                    {/* 상세 보기 버튼 */}
                    <Link
                      href={`/secret/${secret.board_id}`}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-500 text-gray-700 hover:bg-gray-100 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        상세 보기
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* 페이지네이션 컨트롤 */}
        <div className="mt-6 flex justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" /> 이전
          </Button>
          <span className="text-lg font-semibold">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            다음 <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
