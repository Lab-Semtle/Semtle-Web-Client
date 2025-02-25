import { NextResponse } from 'next/server';

// 더미 데이터 (실제 DB에서 가져오는 경우에는 이 부분을 대체)
const questionsData = {
  project_title: "AI 연구 프로젝트 팀원 모집",
  questions: [
    {
      question_id: 1,
      question_text: "AI 관련 프로젝트 경험이 있으신가요?",
      is_required: true
    },
    {
      questionid: 2, // 오타 수정 필요!
      question_text: "해당 프로젝트에 기여할 수 있는 기술 스택을 설명해주세요.",
      is_required: true
    },
    {
      question_id: 3,
      question_text: "프로젝트에 참여하게 된 동기를 말씀해주세요.",
      is_required: false
    }
  ]
};

// GET 요청 처리
export async function GET(req: Request) {
  // URL에서 `post_id` 쿼리 파라미터 가져오기
  const { searchParams } = new URL(req.url);
  const post_id = searchParams.get("post_id");

  // post_id 검증 (실제 서비스에서는 DB에서 필터링)
  if (!post_id) {
    return NextResponse.json({ error: "post_id가 필요합니다." }, { status: 400 });
  }

  // questionid -> question_id 통일
  const formattedQuestions = questionsData.questions.map(q => ({
    question_id: q.question_id ?? q.questionid, // 둘 중 하나 선택
    question_text: q.question_text,
    is_required: q.is_required,
  }));

  return NextResponse.json({
    project_title: questionsData.project_title,
    questions: formattedQuestions
  });
}
