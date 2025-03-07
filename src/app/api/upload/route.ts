import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrlForUpload } from '@/lib/utils/ncp-storage';

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType } = await request.json();
    const signedUrl = await getSignedUrlForUpload(fileName, fileType);
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error('서명된 URL 생성 오류:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Error generating signed URL',
      },
      { status: 500 },
    );
  }
}
