/** MSW 초기화 */

let isMSWInitialized = false; // MSW가 이미 실행되었는지 확인

export async function initMSW() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    if (typeof window !== 'undefined') {
      const { worker } = await import('./msw-browser');

      await worker.start({
        onUnhandledRequest: 'bypass', // 경고 표시 없이 실제 서버로 전달
      });

      isMSWInitialized = true; // MSW가 실행되었음을 표시
      console.log('[initMSW] MSW가 정상적으로 시작되었습니다.');
    }
  }
}
