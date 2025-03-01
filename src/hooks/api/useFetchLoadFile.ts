export async function fetchLoadFile(file: File): Promise<string> {
  try {
    console.log(`[Cloudflare R2] 파일 업로드 요청: ${file.name}`);

    // 서버에서 Presigned URL 요청
    const presignedRes = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    });

    if (!presignedRes.ok) {
      throw new Error('Presigned URL을 가져오는 데 실패했습니다.');
    }

    const { signedUrl } = await presignedRes.json();

    // 파일 업로드 실행
    const uploadRes = await fetch(signedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error('파일 업로드에 실패했습니다.');
    }

    console.log(`[Cloudflare R2] 파일 업로드 완료: ${signedUrl.split('?')[0]}`);

    return signedUrl.split('?')[0]; // 파일의 최종 URL 반환
  } catch (error) {
    console.error('파일 업로드 중 오류 발생:', error);
    return ''; // 오류 발생 시 빈 문자열 반환
  }
}
