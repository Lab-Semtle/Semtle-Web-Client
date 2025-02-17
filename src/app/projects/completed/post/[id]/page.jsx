"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PostDetail = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/completed?id=${id}`);
        if (!res.ok) {
          throw new Error("게시물을 찾을 수 없습니다.");
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>로딩 중...</p>;

  return (
    <div className="mt-16 p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-600">{post.subtitle}</p>

      {/* 이미지 */}
      <div className="mt-4">
        <Image
          src={post.image_url}
          alt={post.title}
          width={600}
          height={300}
          className="rounded-lg object-cover"
        />
      </div>

      {/* 프로젝트 정보 */}
      <div className="mt-4">
        <p>🖋 작성자: {post.writer}</p>
        <p>📅 시작일: {post.create_date}</p>
        <p>⏳ 마감일: {post.due_date}</p>
        <p>👥 팀원: {post.member}</p>
        <p>📂 프로젝트 유형: {post.project_type}</p>
        <p>
          🔗 결과물:{" "}
          <Link href={post.result_link} className="text-blue-500 underline">
            {post.result_link}
          </Link>
        </p>
      </div>

      {/* 관련 분야 */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">관련 분야</h3>
        <div className="flex gap-2 mt-2">
          {post.relate_field.map((field, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-200 px-4 py-1 text-gray-700"
            >
              #{field}
            </span>
          ))}
        </div>
      </div>

      {/* 프로젝트 설명 */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">프로젝트 설명</h3>
        <p className="text-gray-600 mt-2">{post.contents}</p>
      </div>
    </div>
  );
};

export default PostDetail;
