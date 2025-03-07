/** MSW 초기화 */

export async function initMSW() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    if (typeof window !== 'undefined') {
      const { worker } = await import('./browser');
      await worker.start({
        onUnhandledRequest: 'bypass', // 경고 표시 없이 실제 서버로 전달
      });
    } else {
      const { server } = await import('./server');
      server.listen();
    }
  }
}
