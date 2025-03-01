// utils/fetchPresignedUrl.ts
export const fetchPresignedUrl = async (
  imagePath?: string,
): Promise<string> => {
  if (!imagePath) return '/images/kmou_2022.jpg'; // 기본 이미지 제공

  try {
    const response = await fetch('/api/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: imagePath }),
    });

    if (!response.ok) {
      throw new Error(`요청 실패: ${response.status}`);
    }

    const fileData = await response.json();
    return fileData.signedUrl ?? '/images/kmou_2022.jpg'; // Presigned URL 반환
  } catch (error) {
    console.error('Presigned URL 가져오기 실패:', error);
    return '/images/kmou_2022.jpg'; // 오류 발생 시 기본 이미지 반환
  }
};
