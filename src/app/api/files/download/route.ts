import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrlForDownload } from '@/lib/utils/ncp-storage';

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json();

    if (!key) {
      return NextResponse.json(
        { error: '파일 키가 필요합니다.' },
        { status: 400 },
      );
    }

    // NCP 스토리지에서 파일 다운로드를 위한 서명된 URL 가져오기
    const signedUrl = await getSignedUrlForDownload(key);

    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error('파일 다운로드 오류:', error);

    let errorMessage = '파일 다운로드 중 오류 발생';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
