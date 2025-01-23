"use client"

import { useState } from "react"
import { Upload, X, Bold, Italic, List, ImageIcon, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PostFormData {
  title: string
  category: string
  content: string
  image?: File
}

export default function CreatePost() {
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    category: "",
    content: "",
  })
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isDraft, setIsDraft] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageRemove = () => {
    setFormData((prev) => ({ ...prev, image: undefined }))
    setImagePreview("")
  }

  const handleTextFormat = (format: string) => {
    console.log("Format text:", format)
  }

  const handleSubmit = async (draft: boolean) => {
    setIsDraft(draft)
    console.log("Submit form:", { ...formData, isDraft: draft })
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardContent className="space-y-6 p-6">
          {/* 게시물 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">게시물 제목</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="제목을 입력하세요"
            />
          </div>

          {/* 이미지 */}
          <div className="space-y-2">
            <Label>게시물 이미지</Label>
            <div className="flex items-start gap-4">
              <div className="flex-1 aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                {imagePreview ? (
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="relative">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  <Upload className="w-4 h-4 mr-2" />
                  업로드
                </Button>
                {imagePreview && (
                  <Button variant="outline" onClick={handleImageRemove}>
                    <X className="w-4 h-4 mr-2" />
                    삭제
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* 유형 선택 */}
          <div className="space-y-2">
            <Label>게시물 유형</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="유형 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                <SelectItem value="세미나">세미나</SelectItem>
                <SelectItem value="행사">행사</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 내용 */}
          <div className="space-y-2">
            <Label>게시물 내용</Label>
            <div className="border rounded-lg">
              <div className="border-b p-2 flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => handleTextFormat("bold")}>
                        <Bold className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>굵게</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => handleTextFormat("italic")}>
                        <Italic className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>기울임</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => handleTextFormat("list")}>
                        <List className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>목록</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="내용을 입력하세요"
                className="min-h-[300px] border-0 rounded-none focus-visible:ring-0"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-6">
          <Button variant="outline" onClick={() => handleSubmit(true)}>
            <Save className="w-4 h-4 mr-2" />
            임시저장
          </Button>
          <Button onClick={() => handleSubmit(false)}>업로드</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

