// app/api/projects/route.js
import { NextResponse } from "next/server";

const sampleCards = [
  { id: 1, image: "/images/image1.jpg", title: "Post 1", postDate: "2024-12-30", deadline: "2025-01-05", projectType: "해커톤", category: ["Web", "Game"] },
  { id: 2, image: "/images/image2.jpg", title: "Post 2", postDate: "2024-12-29", deadline: "2025-01-04", projectType: "경진대회", category: ["Game"] },
  { id: 3, image: "/images/image3.jpg", title: "Post 3", postDate: "2024-12-30", deadline: "2025-01-05", projectType: "공모전", category: ["iOS", "Web"] },
  { id: 4, image: "/images/image5.jpg", title: "Post 4", postDate: "2024-12-29", deadline: "2025-01-04", projectType: "사이드프로젝트", category: ["Android"] },
  { id: 5, image: "/images/image6.jpg", title: "Post 5", postDate: "2024-12-30", deadline: "2025-01-05", projectType: "기타", category: ["Web", "Android"] },
  { id: 6, image: "/images/image4.jpg", title: "Post 6", postDate: "2024-12-29", deadline: "2025-01-04", projectType: "해커톤", category: ["Android", "Web"] },
  { id: 7, image: "/images/image6.jpg", title: "Post 7", postDate: "2024-12-30", deadline: "2025-01-05", projectType: "경진대회", category: ["iOS"] },
  { id: 8, image: "/images/image3.jpg", title: "Post 8", postDate: "2024-12-29", deadline: "2025-01-04", projectType: "공모전", category: ["Game", "iOS"] }
];

export async function GET() {
  return NextResponse.json(sampleCards);
}
