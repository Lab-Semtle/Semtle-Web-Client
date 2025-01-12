'use client';

import styles from './login.module.css';

export default function Page() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 페이지 새로고침 방지
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    console.log('Email: ', email);
    console.log('Password: ', password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <span>로고 이미지</span>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            required
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <button type="button" className={styles.joinButton}>
            Join
          </button>
        </div>
      </form>
      <div className={styles.footer}>
        <p>비밀번호를 잊어버리셨나요?</p>
        <p>가입했던 이메일로 재설정 문자 보내기</p>
      </div>
    </div>
  );
}
