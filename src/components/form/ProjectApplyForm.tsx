'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PostFileUploader from '@/components/file/PostFileUploader';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface FileData {
  fileName: string;
  fileUrl: string;
}

interface Props {
  postId: string; // 신청할 프로젝트 ID
  onClose: () => void;
}

const ProjectApplyForm: React.FC<Props> = ({ postId, onClose }) => {
  if (!postId) {
    throw new Error('postId가 제공되지 않았습니다.');
  }

  const { data: session } = useSession();
  const [applicantId, setApplicantId] = useState<number | null>(null); // 신청 순번 (초기값 null)
  const [answers, setAnswers] = useState<string>(''); // 답변 입력
  const [urls, setUrls] = useState<string[]>(['']); // 참고 URL 목록
  const [files, setFiles] = useState<FileData[]>([]); // 업로드된 파일 목록
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태

  // 파일 업로드 성공 시 처리
  const handleUploadSuccess = (uploadedFilePath: string) => {
    setFiles((prev) => [
      ...prev,
      { fileName: uploadedFilePath, fileUrl: uploadedFilePath },
    ]);
  };

  /** 이전 신청 기록 확인 (신청 id 자동 증가) */
  useEffect(() => {
    const fetchLastApplicantId = async () => {
      try {
        const response = await fetch(
          API_ROUTES.GET_MY_PROJECT_APPLICANTS_LIST(Number(postId)),
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.accessToken}`,
            },
          },
        );

        console.log('신청 목록 조회 응답:', response);

        if (response.status === 500) {
          console.warn('500 에러 발생 → 신청자 없음으로 가정 (ID: 1)');
          setApplicantId(1);
          return;
        }

        if (!response.ok)
          throw new Error('신청 목록을 불러오는 데 실패했습니다.');
        const result = await response.json();
        console.log('신청 목록 데이터:', result);

        if (result.success && result.data.length > 0) {
          // 가장 큰 applicantId 가져와서 +1
          const lastId = Math.max(
            ...result.data.map((applicant: { id: number }) => applicant.id),
          );
          setApplicantId(lastId + 1);
        } else {
          setApplicantId(1); // 신청 기록이 없으면 1부터 시작
        }
      } catch (error) {
        console.error('이전 신청 ID 조회 실패:', error);
        setApplicantId(1); // 오류 발생 시 기본값 1
      }
    };

    fetchLastApplicantId();
  }, [postId, session?.accessToken]);

  /** 신청 제출 API 호출 */
  const handleSubmit = async () => {
    window.alert('🚧 준비중입니다...!');

    // if (!answers.trim()) {
    //   toast.error('답변을 입력해야 합니다.');
    //   return;
    // }

    // if (applicantId === null) {
    //   toast.error('신청 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    //   return;
    // }

    // const latestApplicantId = applicantId + 1;
    // setLoading(true);

    // const payload = {
    //   answers: [{ questionId: 0, answer: answers }], // 단일 질문 사용
    //   urls: urls.filter((url) => url.trim() !== ''), // 빈 URL 제외
    //   files, // 업로드된 파일 목록
    // };

    // console.log('신청 API 요청 데이터:', JSON.stringify(payload, null, 2));
    // console.log('신청할 applicantId:', latestApplicantId);

    // try {
    //   const response = await fetch(
    //     API_ROUTES.APPLY_PROJECT(Number(postId), latestApplicantId),
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${session?.accessToken}`,
    //       },
    //       body: JSON.stringify(payload),
    //     },
    //   );

    //   console.log('신청 API 응답:', response);

    //   const result = await response.json();
    //   console.log('신청 결과:', result);

    //   if (!response.ok || !result.success) {
    //     throw new Error(result.message || '신청에 실패했습니다.');
    //   }

    //   toast.success('신청이 완료되었습니다!');
    //   onClose(); // 모달 닫기
    // } catch (error) {
    //   console.error('신청 실패:', error);
    //   toast.error('신청 중 오류가 발생했습니다.');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="space-y-6">
      {/* 답변 입력 */}
      <div className="mb-4">
        <label className="mb-1 block text-lg font-semibold">답변</label>
        <Textarea
          placeholder="답변을 입력하세요."
          value={answers}
          onChange={(e) => setAnswers(e.target.value)}
          rows={10}
          className="w-full rounded-md p-3"
        />
      </div>

      {/* 참고 URL 입력 */}
      <div className="mb-4">
        <label className="mb-1 block text-lg font-semibold">참고 URL</label>
        <Input
          type="text"
          placeholder="참고 URL 입력"
          value={urls[0]}
          onChange={(e) => setUrls([e.target.value])}
          className="w-full rounded-md p-2"
        />
      </div>

      {/* 파일 업로드 */}
      <div className="mb-4">
        <label className="mb-1 block text-lg font-semibold">파일 업로드</label>
        <PostFileUploader
          uploadPath="project-apply"
          onUploadSuccess={handleUploadSuccess}
        />
      </div>

      {/* 신청 버튼 */}
      <Button
        className="w-full bg-semtle-lite p-3 text-lg hover:bg-semtle-dark dark:bg-semtle-dark dark:hover:bg-semtle-lite"
        onClick={handleSubmit}
        disabled={loading || applicantId === null}
      >
        {loading ? '신청 중...' : '신청 제출'}
      </Button>
    </div>
  );
};

export default ProjectApplyForm;
