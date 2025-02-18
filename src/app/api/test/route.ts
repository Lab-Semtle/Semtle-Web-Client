import { NextRequest, NextResponse } from 'next/server';

// 임시 데이터 저장소
let testData = [
  { id: 1, message: '첫 번째 메시지' },
  { id: 2, message: '두 번째 메시지' },
];

// GET 요청 - 전체 데이터 조회
export async function GET() {
  return NextResponse.json({
    status: 200,
    data: testData, // `data` 필드 포함
  });
}

// POST 요청 - 새 데이터 추가
export async function POST(req: NextRequest) {
  const { message } = await req.json();
  if (!message) {
    return NextResponse.json({ status: 400 }, { status: 400 });
  }

  const newItem = { id: testData.length + 1, message };
  testData.push(newItem);

  return NextResponse.json({
    status: 201,
    message: '새 데이터가 추가되었습니다.',
    data: newItem, // 선택적 data 포함
  });
}

// PUT 요청 - 특정 ID 데이터 수정 (전체 변경)
export async function PUT(req: NextRequest) {
  const { id, message } = await req.json();
  if (!id || !message) {
    return NextResponse.json({ status: 400 }, { status: 400 });
  }

  const index = testData.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ status: 404 }, { status: 404 });
  }

  testData[index] = { id, message };

  return NextResponse.json({
    status: 200,
    message: '데이터가 수정되었습니다.',
    data: testData[index], // 선택적 data 포함
  });
}

// PATCH 요청 - 특정 ID의 메시지 부분 수정
export async function PATCH(req: NextRequest) {
  const { id, message } = await req.json();
  if (!id || !message) {
    return NextResponse.json({ status: 400 }, { status: 400 });
  }

  const item = testData.find((item) => item.id === id);
  if (!item) {
    return NextResponse.json({ status: 404 }, { status: 404 });
  }

  item.message = message;

  return NextResponse.json({
    status: 200,
    message: '데이터가 부분적으로 수정되었습니다.',
    data: item, // 선택적 data 포함
  });
}

// DELETE 요청 - 특정 ID 데이터 삭제
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ status: 400 }, { status: 400 });
  }

  const index = testData.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ status: 404 }, { status: 404 });
  }

  testData = testData.filter((item) => item.id !== id);

  return NextResponse.json({
    status: 200,
    message: `ID ${id} 데이터가 삭제되었습니다.`, // `message`만 반환
  });
}
