/** 로그인 검증 로직 */

// 이메일 검증 로직
export const validateEmail = (email: string) => {
  if (/\s/.test(email)) {
    return '공백이 포함된 이메일은 입력할 수 없습니다.';
  }
  return null;
};

// 비밀번호 검증 로직
export const validatePassword = (password: string, emailUsername: string) => {
  if (password.length < 8) {
    return '비밀번호는 최소 8자 이상 입력해야합니다.';
  }
  if (!/[a-z]/.test(password)) {
    return '비밀번호에 최소 1개의 영문 소문자(a-z)가 포함되어야 합니다.';
  }
  if (!/\d/.test(password)) {
    return '비밀번호에 최소 1개의 숫자(0-9)가 포함되어야 합니다.';
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return '비밀번호에 최소 1개의 특수 문자( !,@,#,%,^,&,* )가 포함되어야 합니다.';
  }
  if (/[(){}[\]<>]/.test(password)) {
    return '비밀번호에 괄호( (,),[,],{,},<,> )를 사용할 수 없습니다.';
  }
  if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password)) {
    return '비밀번호에 한글을 포함할 수 없습니다.';
  }
  if (password.includes(emailUsername)) {
    return '비밀번호에 이메일과 동일한 문자열을 포함할 수 없습니다.';
  }
  return null;
};
