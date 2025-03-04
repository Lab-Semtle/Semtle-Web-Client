import { NextResponse } from 'next/server';
import { listFolders } from '@/lib/utils/ncp-storage';

/** NCP 폴더 목록 조회 API */
export async function GET() {
  try {
    const folders = await listFolders();
    return NextResponse.json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    return NextResponse.json(
      { error: 'Error listing folders' },
      { status: 500 },
    );
  }
}
