import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2Client = new S3Client({
  region: 'auto', // Cloudflare R2는 'auto' 사용
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json(
        { error: 'File name is required' },
        { status: 400 },
      );
    }

    // Cloudflare R2에서 파일 다운로드를 위한 서명된 URL 생성
    const command = new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: fileName,
    });

    const signedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 60 * 60,
    }); // 1시간 유효

    return NextResponse.json({
      url: signedUrl,
      message: 'File URL generated successfully',
    });
  } catch (error: any) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Download failed', details: error.message },
      { status: 500 },
    );
  }
}

// 페이지에서 사용법
// import { useEffect, useState } from 'react';

// export default function ImageViewer({ fileName }: { fileName: string }) {
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchImageUrl = async () => {
//       try {
//         const response = await fetch(`/api/download?fileName=${fileName}`);
//         const data = await response.json();
//         if (data.url) {
//           setImageUrl(data.url);
//         } else {
//           console.error('이미지를 불러올 수 없습니다.');
//         }
//       } catch (error) {
//         console.error('이미지 요청 실패:', error);
//       }
//     };

//     fetchImageUrl();
//   }, [fileName]);

//   return (
//     <div>
//       {imageUrl ? (
//         <img src={imageUrl} alt="Cloudflare R2 Image" className="rounded-lg shadow-md" />
//       ) : (
//         <p>이미지를 불러오는 중...</p>
//       )}
//     </div>
//   );
// }
