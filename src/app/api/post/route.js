// app/api/post/route.js
import { NextResponse } from "next/server";

// 여러 개의 게시물이 있을 경우를 가정한 예시
const posts = [
  {
    id: 1,
    projectTitle: "Sample Project 1",
    startDate: "2024-12-30",
    endDate: "2025-01-05",
    contact: "https://example.com",
    projectType: "해커톤",
    categories: ["Web", "Game"],
    content: "이 프로젝트는 해커톤을 위한 것입니다. 참가자들은 웹 및 게임 개발을 수행할 예정입니다.",
    images: ["/images/image1.jpg", "/images/image2.jpg"]
  },
  {
    id: 2,
    projectTitle: "Sample Project 2",
    startDate: "2025-01-01",
    endDate: "2025-02-01",
    contact: "https://example2.com",
    projectType: "워크숍",
    categories: ["Mobile", "AI"],
    content: "이 프로젝트는 AI를 활용한 모바일 앱 개발입니다.",
    images: ["/images/image3.jpg", "/images/image4.jpg"]
  }
];

export async function GET(request) {
  const url = new URL(request.url);  // 요청 URL을 가져옴
  const id = url.searchParams.get("id");  // 쿼리 파라미터에서 id 값을 추출

  if (id) {
    const post = posts.find((post) => post.id === parseInt(id));  // id로 게시물 찾기
    if (post) {
      return NextResponse.json(post);  // 게시물이 있으면 반환
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });  // 게시물이 없으면 404
    }
  }

  return NextResponse.json({ message: "No ID provided" }, { status: 400 });  // id가 없으면 400 반환
}
