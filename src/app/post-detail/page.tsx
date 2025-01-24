
"use client"

import { format } from "date-fns"
import { ArrowLeft, ArrowRight, Pencil, Trash2, ListFilter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PostDetailProps {
  post?: {
    id: number
    title: string
    content: string
    image: string
    date: string
    category: string
  }
}

export default function PostDetail({ post }: PostDetailProps) {
  const defaultPost = {
    id: 1,
    title: "2025 셈틀",
    content: `이건 글이다 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 
    이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다.
    이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다.이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. 이건 글이다. `,
    image: "/semtle_logo_2022_square.jpg",
    date: new Date().toISOString(),
    category: "세미나",
  }

  const currentPost = post || defaultPost

  const handleDelete = () => {
    if (confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      console.log("Delete post:", currentPost.id)
    }
  }

  const handleModify = () => {
    console.log("Modify post:", currentPost.id)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div className="space-y-6">
            
            <h1 className="text-3xl font-bold text-center">{currentPost.title}</h1>

            <div className="flex justify-between items-center text-sm text-gray-500 border-b pb-4">
              <div className="flex items-center gap-4">
                <span>작성일: {format(new Date(currentPost.date), "yyyy.MM.dd")}</span>
                <span>분류: {currentPost.category}</span>
              </div>
            </div>

            <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
              <img src={currentPost.image || "/placeholder.svg"} alt="" className="w-full h-full object-contain rounded-lg" />
            </div>

            <div className="min-h-[200px] whitespace-pre-line">{currentPost.content}</div>

            <div className="flex justify-between items-center pt-6 border-t">
              <div className="flex gap-2">
                {/* 삭제버튼 숨김처리시 opacity값 0 */}
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 mr-2 opacity-100" />
                  삭제
                </Button>
                {/* 수정버튼 숨김처리시 opacity값 0 */}
                <Button variant="outline" onClick={handleModify}>
                  <Pencil className="w-4 h-4 mr-2 opacity-100" />
                  수정
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  이전
                </Button>
                <Button variant="outline">
                  <ListFilter className="w-4 h-4 mr-2" />
                  목록
                </Button>
                <Button variant="outline">
                  다음
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

