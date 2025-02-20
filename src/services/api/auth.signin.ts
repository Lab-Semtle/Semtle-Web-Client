export async function fetchSignIn(email: string, password: string) {
  const isMocking = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';
  const API_BASE_URL = isMocking
    ? 'http://localhost:3000' // MSW 활성화 시에도 명확한 값 사용
    : process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_BASE_URL_PROD
      : process.env.NEXT_PUBLIC_API_BASE_URL_DEV;

  if (!API_BASE_URL) {
    console.error('[fetchSignIn] API_BASE_URL이 설정되지 않았습니다.');
    return Promise.reject(new Error('API_BASE_URL is not defined.'));
  }

  const SIGN_IN_URL = `${API_BASE_URL.replace(/\/$/, '')}/api/auth/signin`;

  console.log('[fetchSignIn] 로그인 API 요청:', SIGN_IN_URL, {
    email,
    password,
  });

  try {
    // 1️⃣ 먼저 CSRF 토큰 가져오기
    const csrfRes = await fetch(`${API_BASE_URL}/api/auth/csrf`, {
      method: 'GET',
      credentials: 'include', // 쿠키를 포함하여 요청
    });
    if (!csrfRes.ok) {
      throw new Error('CSRF 토큰을 가져오지 못했습니다.');
    }
    const csrfData = await csrfRes.json();
    const csrfToken = csrfData.csrfToken;

    // 2️⃣ 로그인 요청에 CSRF 토큰 포함하기
    const response = await fetch(SIGN_IN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password, csrfToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || `HTTP Error ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('[fetchSignIn] 예상치 못한 응답:', await response.text());
      throw new Error('서버에서 올바른 JSON 응답을 반환하지 않았습니다.');
    }

    const responseData = await response.json();
    console.log('[fetchSignIn] 로그인 성공:', responseData);

    return responseData;
  } catch (error) {
    console.error('[fetchSignIn] 로그인 처리 중 예외 발생:', error);
    return Promise.reject(new Error('500'));
  }
}
