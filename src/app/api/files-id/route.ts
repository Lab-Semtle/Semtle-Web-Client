import { NextRequest, NextResponse } from 'next/server';
import { listFiles, getSignedUrlForDownload } from '@/lib/utils/ncp-storage';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  try {
    if (!postId) {
      return NextResponse.json(
        { error: 'postId is required' },
        { status: 400 },
      );
    }

    const files = await listFiles(postId);
    return NextResponse.json(files);
  } catch (error) {
    console.error('파일 목록 불러오기 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error listing files' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();
    const signedUrl = await getSignedUrlForDownload(key);
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error('다운로드 URL 생성 오류:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error generating download URL',
      },
      { status: 500 },
    );
  }
}
