import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 🟢 여기서 DB에 저장하는 로직을 추가하면 됨 (예: Firebase, Supabase, MongoDB)
    console.log("받은 데이터:", data);

    return NextResponse.json({ message: "프로젝트 등록 성공!" }, { status: 201 });
  } catch (error) {
    console.error("등록 오류:", error);
    return NextResponse.json({ message: "서버 오류 발생!" }, { status: 500 });
  }
}
