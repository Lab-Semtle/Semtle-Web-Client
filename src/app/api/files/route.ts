import { NextRequest, NextResponse } from 'next/server';
import {
  listFiles,
  getSignedUrlForDownload,
  deleteFile,
} from '@/lib/utils/ncp-storage';

export async function GET() {
  try {
    const files = await listFiles();
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

export async function DELETE(request: NextRequest) {
  try {
    const { key } = await request.json();
    await deleteFile(key);
    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('파일 삭제 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error deleting file' },
      { status: 500 },
    );
  }
}
