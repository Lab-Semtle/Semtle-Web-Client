import { useState } from 'react';

export const useSignInForm = () => {
  const [email, setEmail] = useState('@g.kmou.ac.kr'); // 이메일 입력 필드 값 저장
  const [password, setPassword] = useState(''); // 비밀번호 입력 필드 값 저장
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 숨김/보임 값 저장
  const [emailError, setEmailError] = useState<string | null>(null); // 이메일 입력 필드 유효성 검사 저장
  const [passwordError, setPasswordError] = useState<string | null>(null); // 비밀번호 입력 필드 유효성 검사 결과 저장

  // 이메일 입력값 변경 시 실행
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // 상태 변수 업데이트
  };

  // 비밀번호 입력값 변경 시 실행
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); // 상태 변수 업데이트
  };

  // 비밀번호 표시/숨기기 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // 상태 변수 값 토글
  };

  // 로그인 버튼 클릭/폼 제출 이전에 유효성 검사 에러 초기화
  const resetErrors = () => {
    setEmailError(null);
    setPasswordError(null);
  };

  // 훅 반환 객체
  return {
    email,
    password,
    showPassword,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    togglePasswordVisibility,
    resetErrors,
    setEmailError,
    setPasswordError,
  };
};
