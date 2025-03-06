import { NextRequest, NextResponse } from 'next/server';
import { listFiles } from '@/lib/utils/ncp-storage';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const directory = searchParams.get('directory');

  if (!directory) {
    return NextResponse.json(
      { error: 'directory 파라미터가 필요합니다.' },
      { status: 400 },
    );
  }

  try {
    const files = await listFiles();

    const filteredFiles = files
      .filter((file) => file.Key) // Key가 존재하는 경우만 필터링
      .filter(
        (file) =>
          file.Key!.startsWith(`${directory}/`) && file.Key !== directory,
      ) // 폴더 자체를 나타내는 Key 제거
      .filter((file) => file.Key!.split('/').pop()?.trim() !== ''); // 빈 파일명 제거

    return NextResponse.json(filteredFiles);
  } catch (error) {
    console.error('파일 목록 오류:', error);
    return NextResponse.json(
      { error: '파일 목록을 가져오는 중 오류 발생' },
      { status: 500 },
    );
  }
}
