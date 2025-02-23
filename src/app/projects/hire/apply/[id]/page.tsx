'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Question {
  question_id: number;
  question_text: string;
  is_required: boolean;
}

interface FileData {
  fileName: string;
  fileUrl: string;
}

const ProjectApplyPage: React.FC = () => {
  const router = useRouter();
  const { post_id, id: applicantId } = useParams();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [urls, setUrls] = useState<string[]>(['']);
  const [files, setFiles] = useState<FileData[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/questions?post_id=${post_id}`);
        const data = await response.json();
        setQuestions(data.questions);

        const initialAnswers: { [key: number]: string } = {};
        data.questions.forEach((q: Question) => {
          initialAnswers[q.question_id] = '';
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('질문을 불러오는 중 오류 발생:', error);
      }
    };

    fetchQuestions();
  }, [post_id]);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const uploadedFiles: FileData[] = Array.from(e.target.files).map((file) => ({
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    }));
    setFiles(uploadedFiles);
  };

  const handleSubmit = async () => {
    const payload = {
      board_id: post_id,
      applicantId: parseInt(applicantId as string),
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer,
      })),
      urls: urls.filter((url) => url.trim() !== ''),
      files,
    };

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error('신청 실패:', error);
      setMessage('신청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">프로젝트 신청</h2>
      {questions.map((q) => (
        <div key={q.question_id} className="mb-4">
          <label className="block font-semibold">
            {q.question_text} {q.is_required && '*'}
          </label>
          <Input
            type="text"
            value={answers[q.question_id] || ''}
            onChange={(e) => handleAnswerChange(q.question_id, e.target.value)}
          />
        </div>
      ))}
      <div className="mb-4">
        <label className="block font-semibold">참고 URL</label>
        {urls.map((url, index) => (
          <Input
            key={index}
            type="text"
            value={url}
            onChange={(e) => handleUrlChange(index, e.target.value)}
          />
        ))}
      </div>
      <div className="mb-4">
        <label className="block font-semibold">파일 업로드</label>
        <Input type="file" multiple onChange={handleFileUpload} />
      </div>
      <Button onClick={handleSubmit}>신청 제출</Button>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default ProjectApplyPage;
