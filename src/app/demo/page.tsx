'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api/api-client';
import { ApiResponse, Post } from '@/types/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function DemoPage() {
  // 상태 관리 변수
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<Post>({
    id: '',
    title: '',
    content: '',
  });
  const [log, setLog] = useState<string[]>([]);
  const { toast } = useToast();

  // 임시 로그인 입력 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState<string | null>(null);

  /** 🔥 (fetch + 인증,인가,권한관리) 로직이 포함된 apiClient를 사용할 것 */
  // lib/api/fetch-client.ts 에서 내부 로직 확인 가능 (get, post, put, patch, delete)
  // types/api.ts 에서 API 응답 타입 확인 가능
  /**
   * [ GET ] 예시 : 모든 게시물 가져오기
   * - 서버에서 모든 게시물을 가져옴.
   */
  useEffect(() => {
    apiClient
      // .get<서버에서 반환할 응답 타입>, 아래 코드는 서버에서 Post[] 타입의 데이터를 반환받으려 함.
      .get<Post[]>('/demo')
      // .then 에는 응답 성공 시 동작 구현하면 됨.
      .then((response) => {
        setPosts(response.data);
        // API응답에서 data 필드만 추출
        // - get은 ApiResponseWithData 타입 반환함. 여기에는 code, status, data가 포함되어 있음.
      })
      // .catch 에는 응답 실패 시 동작 구현하면 됨.
      .catch((err) => {
        console.error(err);
      });
  }, []);

  /**
   * [ POST ] 예시 : 새 게시물 추가
   * - 입력된 게시물을 서버에 추가함
   */
  const handleAddPost = () => {
    if (!newPost.id || !newPost.title || !newPost.content) {
      toast({
        variant: 'destructive',
        title: '입력 오류',
        description: '모든 필드를 채워주세요.',
      });
      return;
    }

    apiClient
      // .post<응답의 타입, 요청 본문의 타입>, 아래 코드는 Post 타입으로 반환받고, Post으로 요청 보내려 함.
      .post<Post, Post>('/demo', {
        body: newPost,
      })
      // 구조분해 할당으로 response.data에 바로 접근하면, data가 자동으로 Post타입으로 추론됨.
      .then(({ data }) => {
        setPosts((prev) => [...prev, data]); // 상태 변수 업데이트: 기존 게시물 목록에 새 게시물 추가
        setLog((prev) => [...prev, `게시물 추가됨: ${data.title}`]); // 로그 추가
      })
      .catch((err) => console.error('Error adding post:', err));
  };

  /**
   * [ PATCH ] 예시 : 게시물 업데이트
   * - 특정 게시물의 제목이나 내용을 업데이트함.
   */
  const handleUpdatePost = (id: string, updatedFields: Partial<Post>) => {
    apiClient
      // .patch<응답의 타입, 요청 본문의 타입>, 아래 코드는 Post 타입으로 반환받고, Partial<Post>으로 요청 보냄
      // Partial<Type>는 타입스크립트 유틸리티 타입으로, 모든 속성을 선택적(optional)로 만드는 기능 제공함.
      .patch<Post, Partial<Post>>(`/demo/${id}`, {
        body: updatedFields, // 수정할 데이터만 보냄
      })
      .then(({ data }) => {
        setPosts((prev) =>
          // map()은 Array 내장 메서드, 배열의 각 요소(post)에 대해 '=>'  오른쪽의 수식을 실행 후, 새로운 배열로 반환
          // 삼항연산자로 게시물 id와 주어진 id가 같다면 새로운 데이터로 업데이트
          prev.map((post) => (post.id === id ? { ...post, ...data } : post)),
        );
        setLog((prev) => [...prev, `게시물 업데이트됨: ${data.title}`]);
      })
      .catch((err) => console.error('Error updating post:', err));
  };

  /**
   * [ DELETE ] 예시 : 게시물 삭제
   * - 특정 ID의 게시물을 서버에서 삭제하고 로컬 상태에서도 제거함.
   */
  const handleDeletePost = (id: string) => {
    apiClient
      // .delete<서버에서 반환할 응답의 타입>
      .delete<ApiResponse>(`/demo/${id}`)
      .then((response) => {
        setPosts((prev) => prev.filter((post) => post.id !== id)); // id 로 필터링
        setLog((prev) => [...prev, `게시물 삭제됨: ${response.code}`]); // 상태 메시지 출력
      })
      .catch((err) => console.error('Error deleting post:', err));
  };

  /** 로그인 로직 (임시 토큰 발급) */
  const handleLogin = () => {
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: '로그인 오류',
        description: '이메일과 비밀번호를 입력해주세요.',
      });
      return;
    }

    // 예제용: 이메일과 비밀번호가 일치하면 임의의 토큰 설정
    const token = `Bearer ${btoa(email + ':' + password)}`;
    setAuthToken(token);
    toast({
      title: '로그인 성공',
      description: '인증 토큰이 설정되었습니다.',
    });
  };

  /**
   * 인증된 POST 요청 예시 : 인증이 필요한 보호된 API에 게시물 추가
   * - 로그인된 사용자만 호출할 수 있는 API로 새 게시물을 추가함.
   */
  const handleSecureAddPost = () => {
    if (!authToken) {
      toast({
        variant: 'destructive',
        title: '인증 오류',
        description: '먼저 로그인해주세요.',
      });
      return;
    }

    apiClient
      .post<Post, Post>('/demo/secure', {
        body: newPost,
        withAuth: true, // withAuth: true 옵션을 사용하면, 인증이 필요한 요청에 토큰을 자동으로 추가함.
      })
      .then(({ data }) => {
        setPosts((prev) => [...prev, data]); // 상태 업데이트
        setLog((prev) => [...prev, `인증된 게시물 추가됨: ${data.title}`]); // 로그 추가
      })
      .catch((err) => console.error('Error adding secure post:', err));
  };

  // 컴포넌트 UI
  return (
    <div className="mx-auto max-w-4xl rounded bg-gray-50 p-6 shadow">
      {/* 로그인 섹션 */}
      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-bold">로그인</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Input
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="mt-3 w-full" onClick={handleLogin}>
          로그인
        </Button>
      </section>

      {/* 게시물 추가 섹션 */}
      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-bold">새 게시물 추가</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Input
            placeholder="ID"
            value={newPost.id}
            onChange={(e) => setNewPost({ ...newPost, id: e.target.value })}
          />
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
        </div>
        <Input
          placeholder="내용"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="mt-3"
        />
        <div className="mt-3 space-x-3">
          <Button onClick={handleAddPost}>게시물 추가</Button>
          <Button variant="secondary" onClick={handleSecureAddPost}>
            인증된 게시물 추가
          </Button>
        </div>
      </section>

      {/* 게시물 목록 */}
      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-bold">게시물 목록</h2>
        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex justify-between rounded bg-white p-4 shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-600">{post.content}</p>
              </div>
              <div className="flex space-x-2">
                {/* 입력 필드와 수정 버튼 */}
                <Input
                  placeholder="새 제목"
                  className="w-40"
                  onChange={(e) =>
                    setNewPost((prev) => ({
                      ...prev,
                      id: post.id,
                      title: e.target.value,
                    }))
                  }
                />
                <Button
                  size="sm"
                  onClick={() =>
                    handleUpdatePost(post.id, { title: newPost.title })
                  }
                >
                  수정
                </Button>

                {/* 삭제 버튼 */}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeletePost(post.id)}
                >
                  삭제
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 로그 섹션 */}
      <section>
        <h2 className="mb-3 text-2xl font-bold">활동 로그</h2>
        <ul className="space-y-2">
          {log.map((entry, index) => (
            <li key={index} className="text-gray-700">
              {entry}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
