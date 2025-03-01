import { useState, useEffect } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';

export function useHealthCheck() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('api 요청 : ', API_ROUTES.GET_BANNERS);
      const response = await fetch(API_ROUTES.GET_BANNERS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('api 응답 : ', response);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setStatus(data.message || '서버 응답을 확인할 수 없습니다.');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthStatus();
  }, []);

  return { status, loading, error, refetch: fetchHealthStatus };
}
