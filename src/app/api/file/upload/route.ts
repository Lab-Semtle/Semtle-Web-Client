import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto', // Cloudflare R2에서는 'auto' 사용
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    if (!req.body) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 파일 이름과 Content-Type 가져오기
    const fileName =
      req.headers.get('x-vercel-filename') || `upload-${Date.now()}.png`;
    const contentType =
      req.headers.get('content-type') || 'application/octet-stream';

    // 요청된 파일을 ArrayBuffer로 변환
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Cloudflare R2 업로드 파라미터 (ACL 제거)
    const uploadParams = {
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    };

    // S3 업로드 실행
    await r2Client.send(new PutObjectCommand(uploadParams));

    // 업로드된 파일의 URL 반환
    return NextResponse.json({
      url: `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${fileName}`,
      message: 'File uploaded successfully',
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 },
    );
  }
}
