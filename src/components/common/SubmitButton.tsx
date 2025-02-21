// Next Auth 적용 중 임시 컴포넌트, 회원가입 및 로그인 페이지에서 사용할 제출 버튼
'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus(); // 비동기 상태 관리

  return (
    <button type="submit" disabled={pending}>
      {pending ? '로딩...' : name}
    </button>
  );
}
