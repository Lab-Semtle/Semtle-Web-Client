/** 테스트용 엔드포인트 헨들러 */

import { HttpResponse, http } from 'msw';
import { API_ROUTES } from '@/constants/api';

// 테스트용 데이터 (임시 저장소)
let testData = [
  { id: 1, message: '첫 번째 메시지' },
  { id: 2, message: '두 번째 메시지' },
];

export const testHandlers = [
  // GET 요청 (전체 데이터 조회)
  http.get(API_ROUTES.TEST, () => {
    return HttpResponse.json({ status: 200, data: testData }, { status: 200 });
  }),

  // POST 요청 (새 데이터 추가)
  http.post(API_ROUTES.TEST, async ({ request }) => {
    const { message } = (await request.json()) as { message: string };
    if (!message) {
      return HttpResponse.json({ status: 400 }, { status: 400 });
    }

    const newItem = { id: testData.length + 1, message };
    testData.push(newItem);

    return HttpResponse.json(
      { status: 201, message: '데이터 추가 성공', data: newItem },
      { status: 201 },
    );
  }),

  // PUT 요청 (전체 업데이트)
  http.put(API_ROUTES.TEST, async ({ request }) => {
    const { id, message } = (await request.json()) as {
      id: number;
      message: string;
    };
    if (!id || !message) {
      return HttpResponse.json({ status: 400 }, { status: 400 });
    }

    const index = testData.findIndex((item) => item.id === id);
    if (index === -1) {
      return HttpResponse.json({ status: 404 }, { status: 404 });
    }

    testData[index] = { id, message };

    return HttpResponse.json(
      {
        status: 200,
        message: '데이터가 수정되었습니다.',
        data: testData[index],
      },
      { status: 200 },
    );
  }),

  // PATCH 요청 (부분 업데이트)
  http.patch(API_ROUTES.TEST, async ({ request }) => {
    const { id, message } = (await request.json()) as {
      id: number;
      message: string;
    };
    if (!id || !message) {
      return HttpResponse.json({ status: 400 }, { status: 400 });
    }

    const item = testData.find((item) => item.id === id);
    if (!item) {
      return HttpResponse.json({ status: 404 }, { status: 404 });
    }

    item.message = message;

    return HttpResponse.json(
      {
        status: 200,
        message: '데이터가 부분적으로 수정되었습니다.',
        data: item,
      },
      { status: 200 },
    );
  }),

  // DELETE 요청 (데이터 삭제)
  http.delete(API_ROUTES.TEST, async ({ request }) => {
    const { id } = (await request.json()) as { id: number };
    if (!id) {
      return HttpResponse.json({ status: 400 }, { status: 400 });
    }

    const index = testData.findIndex((item) => item.id === id);
    if (index === -1) {
      return HttpResponse.json({ status: 404 }, { status: 404 });
    }

    testData = testData.filter((item) => item.id !== id);

    return HttpResponse.json(
      { status: 200, message: `ID ${id} 데이터 삭제 성공` },
      { status: 200 },
    );
  }),
];
