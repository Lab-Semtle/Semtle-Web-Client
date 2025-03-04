import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface FileObject {
  Key?: string;
  LastModified?: Date;
  ETag?: string;
  Size?: number;
  StorageClass?: string;
}

export interface FolderObject {
  name: string;
  path: string;
}

const NCP_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_NCP_ACCESS_KEY_ID!;
const NCP_SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_NCP_SECRET_ACCESS_KEY!;
const NCP_BUCKET = process.env.NEXT_PUBLIC_NCP_BUCKET_NAME!;
const NCP_ENDPOINT = process.env.NEXT_PUBLIC_NCP_OBJECT_STORAGE_ENDPOINT!;

const S3 = new S3Client({
  region: 'kr-standard',
  endpoint: NCP_ENDPOINT,
  credentials: {
    accessKeyId: NCP_ACCESS_KEY_ID,
    secretAccessKey: NCP_SECRET_ACCESS_KEY,
  },
});

export async function getSignedUrlForUpload(
  key: string,
  contentType: string,
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: NCP_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  try {
    return await getSignedUrl(S3, command, { expiresIn: 3600 });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
}

export async function getSignedUrlForDownload(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: NCP_BUCKET,
    Key: key,
  });

  try {
    return await getSignedUrl(S3, command, { expiresIn: 3600 });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
}

// prefix를 선택적(optional) 매개변수로 두어,
// 특정 폴더(postId/) 아래의 파일만 가져올 수도 있고,
// 전체 파일을 가져올 수도 있도록 변경
export async function listFiles(prefix?: string): Promise<FileObject[]> {
  const command = new ListObjectsV2Command({
    Bucket: NCP_BUCKET,
    Prefix: prefix || '', // prefix가 제공되면 해당 경로만 조회
  });

  try {
    const response = await S3.send(command);
    return (
      response.Contents?.map((file) => ({
        Key: file.Key,
        LastModified: file.LastModified,
        Size: file.Size,
      })) || []
    );
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
}

// 기존 수정 전 listFiles 코드
// export async function listFiles(prefix: string = ''): Promise<FileObject[]> {
//   const command = new ListObjectsV2Command({
//     Bucket: NCP_BUCKET,
//     Prefix: prefix,
//   });

//   try {
//     const response = await S3.send(command);
//     return response.Contents || [];
//   } catch (error) {
//     console.error('Error listing files:', error);
//     throw error;
//   }
// }

// NCP 폴더 목록 조회 기능 추가
export async function listFolders(): Promise<FolderObject[]> {
  const command = new ListObjectsV2Command({
    Bucket: NCP_BUCKET,
    Delimiter: '/', // 폴더 단위로 조회
  });

  try {
    const response = await S3.send(command);

    return (
      response.CommonPrefixes?.map((prefix) => ({
        name: prefix.Prefix?.replace(/\/$/, '') || '',
        path: prefix.Prefix || '',
      })) || []
    );
  } catch (error) {
    console.error('Error listing folders:', error);
    return [];
  }
}

export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: NCP_BUCKET,
    Key: key,
  });

  try {
    await S3.send(command);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}
