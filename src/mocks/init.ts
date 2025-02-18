/** MSW 초기화 */

export async function initMSW() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    if (typeof window !== 'undefined') {
      const { worker } = await import('./browser');
      await worker.start({
        onUnhandledRequest: 'bypass', // 경고 표시 없이 실제 서버로 전달
      });
      console.log('[initMSW] MSW가 정상적으로 시작되었습니다.');
    } else {
      const { server } = await import('./server');
      server.listen();
    }
  }
}
