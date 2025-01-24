// app/api/post/route.js
import { NextResponse } from "next/server";

const samplePost = {
  id: 1,
  projectTitle: "Sample Project",
  startDate: "2024-12-30",
  endDate: "2025-01-05",
  contact: "https://example.com",
  projectType: "해커톤",
  categories: ["Web", "Game"],
  content: "이 프로젝트는 해커톤을 위한 것입니다. 참가자들은 웹 및 게임 개발을 수행할 예정입니다.",
  images: ["/images/image1.jpg", "/images/image2.jpg"]
};

export async function GET() {
  return NextResponse.json(samplePost);
}
