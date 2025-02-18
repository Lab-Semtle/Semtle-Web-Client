/** 동작 테스트용 데모 페이지 : Fetch API Client */
'use client';

import { useState } from 'react';
import apiClient from '@/services/apiClient';

export default function TestPage() {
  const [data, setData] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [inputId, setInputId] = useState<number | null>(null);

  // GET 요청 (전체 데이터 조회)
  const handleGet = async () => {
    try {
      const response =
        await apiClient.get<{ id: number; message: string }[]>('/api/test');

      // GET 요청 → `data` 필드가 반드시 존재하므로 그대로 출력
      setData(JSON.stringify(response.data ?? '데이터 없음', null, 2));
    } catch (error) {
      console.error('GET 요청 실패:', error);
    }
  };

  // POST 요청 (새 데이터 추가)
  const handlePost = async () => {
    if (!inputMessage.trim()) {
      alert('POST 요청을 위해 메시지를 입력하세요!');
      return;
    }
    try {
      const response = await apiClient.post<
        { id: number; message: string },
        { message: string }
      >('/api/test', {
        body: { message: inputMessage },
      });

      // `message`가 반드시 존재하도록 처리
      if ('message' in response) {
        setData(
          response.data
            ? JSON.stringify(response.data, null, 2)
            : response.message,
        );
      } else {
        setData('데이터 추가 성공 (메시지 없음)');
      }
    } catch (error) {
      console.error('POST 요청 실패:', error);
    }
  };

  // PUT 요청 (전체 업데이트)
  const handlePut = async () => {
    if (!inputId || !inputMessage.trim()) {
      alert('PUT 요청을 위해 ID와 메시지를 입력하세요!');
      return;
    }
    try {
      const response = await apiClient.put<
        { id: number; message: string },
        { id: number; message: string }
      >('/api/test', {
        body: { id: inputId, message: inputMessage },
      });

      // `message`가 반드시 존재하도록 처리
      if ('message' in response) {
        setData(
          response.data
            ? JSON.stringify(response.data, null, 2)
            : response.message,
        );
      } else {
        setData('데이터 수정 성공 (메시지 없음)');
      }
    } catch (error) {
      console.error('PUT 요청 실패:', error);
    }
  };

  // PATCH 요청 (부분 업데이트)
  const handlePatch = async () => {
    if (!inputId || !inputMessage.trim()) {
      alert('PATCH 요청을 위해 ID와 메시지를 입력하세요!');
      return;
    }
    try {
      const response = await apiClient.patch<
        { id: number; message: string },
        { id: number; message: string }
      >('/api/test', {
        body: { id: inputId, message: inputMessage },
      });

      // `message`가 반드시 존재하도록 처리
      if ('message' in response) {
        setData(
          response.data
            ? JSON.stringify(response.data, null, 2)
            : response.message,
        );
      } else {
        setData('데이터 부분 수정 성공 (메시지 없음)');
      }
    } catch (error) {
      console.error('PATCH 요청 실패:', error);
    }
  };

  // DELETE 요청 (데이터 삭제)
  const handleDelete = async () => {
    if (!inputId) {
      alert('DELETE 요청을 위해 ID를 입력하세요!');
      return;
    }
    try {
      const response = await apiClient.delete<
        { message: string },
        { id: number }
      >('/api/test', {
        body: { id: inputId },
        headers: { 'Content-Type': 'application/json' },
      });

      // DELETE 요청 → `message`가 반드시 존재하도록 처리
      if ('message' in response) {
        setData(response.message);
      } else {
        setData('삭제 성공 (메시지 없음)');
      }
    } catch (error) {
      console.error('DELETE 요청 실패:', error);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>📌 Fetch API Client 테스트</h1>

      {/* 입력 필드 */}
      <input
        type="number"
        placeholder="ID 입력 (수정/삭제 시)"
        value={inputId || ''}
        onChange={(e) => setInputId(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="메시지 입력"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />

      {/* 요청 버튼 */}
      <button onClick={handleGet}>📤 GET 요청</button>
      <button onClick={handlePost}>➕ POST 요청</button>
      <button onClick={handlePut}>🔄 PUT 요청</button>
      <button onClick={handlePatch}>✏️ PATCH 요청</button>
      <button onClick={handleDelete}>🗑️ DELETE 요청</button>

      {/* 응답 결과 출력 */}
      <pre>{data || '⚠️ 아직 API 응답이 없습니다. 요청을 실행하세요!'}</pre>
    </div>
  );
}
