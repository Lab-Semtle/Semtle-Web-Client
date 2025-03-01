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
    return NextResponse.json({ error: 'Error listing files' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { key } = await request.json();

  try {
    const signedUrl = await getSignedUrlForDownload(key);
    return NextResponse.json({ signedUrl });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error generating download URL' },
      { status: 500 },
    );
  }
}
