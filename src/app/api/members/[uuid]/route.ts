/** 목업 API
 * - 개인정보 조회
 * - 개인정보 수정
 */
/** 목업 API - 개인정보 조회 및 수정 */
import { NextResponse } from 'next/server';

// ✅ 사용자 정보 조회 (GET)
export async function GET(req: Request, context: { params: { uuid: string } }) {
  const { uuid } = context.params;

  console.log(`[API] GET 요청: /api/members/${uuid}`);

  if (!MOCK_USERS.has(uuid)) {
    console.warn(`[API] 유저 없음: ${uuid}`);
    return NextResponse.json(
      { status: 404, message: '해당 UUID의 사용자를 찾을 수 없음' },
      { status: 404 },
    );
  }

  const user = MOCK_USERS.get(uuid)!;

  // 명세서에 맞는 응답 구조
  const responseData = {
    status: 200,
    message: 'Member Showed successfully',
    name: user.name,
    birth: user.birth,
    phone: user.phone,
  };

  console.log(`[API] 응답 데이터:`, responseData);
  return NextResponse.json(responseData);
}

// ✅ 사용자 정보 수정 (PATCH)
export async function PATCH(
  req: Request,
  context: { params: { uuid: string } },
) {
  const { uuid } = context.params;
  const updateData = await req.json();

  console.log(`[API] PATCH 요청: /api/members/${uuid}`);
  console.log('[API] 요청 데이터:', updateData);

  if (!MOCK_USERS.has(uuid)) {
    console.warn(`[API] 유저 없음: ${uuid}`);
    return NextResponse.json(
      { status: 404, message: '해당 UUID의 사용자를 찾을 수 없음' },
      { status: 404 },
    );
  }

  const currentUser = MOCK_USERS.get(uuid)!;

  // 허용된 필드만 업데이트
  const allowedUpdates = ['name', 'birth', 'phone', 'profileImageUrl'];
  const filteredUpdate = Object.fromEntries(
    Object.entries(updateData).filter(([key]) => allowedUpdates.includes(key)),
  );

  if (Object.keys(filteredUpdate).length === 0) {
    return NextResponse.json(
      { status: 400, message: '잘못된 요청: 업데이트할 필드가 없습니다.' },
      { status: 400 },
    );
  }

  // 사용자 정보 업데이트
  const updatedUser = {
    ...currentUser,
    ...filteredUpdate,
    updatedAt: new Date().toISOString(),
  };

  MOCK_USERS.set(uuid, updatedUser);

  console.log(`[API] 업데이트된 사용자 데이터:`, updatedUser);

  return NextResponse.json({
    status: 200,
    message: 'Member updated successfully',
  });
}
