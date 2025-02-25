/** MSW 초기화 */

export async function initMSW() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    if (typeof window !== 'undefined') {
      console.log('[initMSW] 브라우저 환경 감지됨');
      const { worker } = await import('./browser');
      await worker.start({
        onUnhandledRequest: 'bypass', // 경고 표시 없이 실제 서버로 전달
      });
      console.log('[initMSW] MSW가 정상적으로 시작되었습니다. (브라우저)');
    } else {
      console.log('[initMSW] 서버 환경 감지됨');
      const { server } = await import('./server');
      server.listen();
      console.log('[initMSW] MSW가 정상적으로 시작되었습니다. (서버)');
    }
  } else {
    console.log(
      '[initMSW] MSW가 비활성화됨 (NEXT_PUBLIC_API_MOCKING이 "enabled"가 아님)',
    );
  }
}
