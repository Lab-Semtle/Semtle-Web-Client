import { API_ROUTES } from '@/constants/ApiRoutes';

/**
 * NCP Object Storage에서 Presigned URL을 가져오는 함수
 */
export async function fetchNcpPresignedUrl(
  filePath: string,
): Promise<string | null> {
  try {
    const response = await fetch(API_ROUTES.GET_NCP_SIGNED_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: filePath }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const { signedUrl } = await response.json();
    return signedUrl || null;
  } catch (error) {
    console.error('Error fetching NCP presigned URL:', error);
    return null;
  }
}
