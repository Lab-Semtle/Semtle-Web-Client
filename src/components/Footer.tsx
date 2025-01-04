'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);

  const handleTermsClick = () => {
    setShowTermsPopup(true); // 이용약관 팝업을 띄운다
  };

  const handlePrivacyClick = () => {
    setShowPrivacyPopup(true); // 개인정보수집 팝업을 띄운다
  };

  const closePopup = () => {
    setShowTermsPopup(false);
    setShowPrivacyPopup(false);
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link href="/인스타주소">
          <img src="/instagram_logo.webp" alt="Instagram" />
        </Link>
        <Link href="카페주소">
          <img src="/naver_cafe_logo.jpg" alt="naver_cafe" />
        </Link>
      </div>

      <div className="footer-content2">
        <span>Contact Semtle</span>
        <span>전화번호 |</span>
        <Link
          href="https://open.kakao.com/o/xxxxxxx"
          target="_blank"
          rel="noopener noreferrer"
          className="chatLink"
        >
          오픈채팅주소
        </Link>
      </div>
      <div className="footer-content3">
        <span>Contact Dev.</span>
        <span>디스코드 링크</span>
      </div>
      <div className="footer-content4">
        <span>Github.</span>
        <Link
          href="https://github.com/XXX/xxxx"
          target="_blank"
          rel="noopener noreferrer"
          className="gitLink"
        >
          https://github.com/XXX/xxxx
        </Link>
      </div>
      <div className="footer-content5">
        <span>Developers.</span>
        <span>
          김민서 박준영 한태현 허태환 국태근 김아름 박상빈 신동혁 이서용
        </span>
      </div>
      <div className="footer-content6">
        <span>Version</span>
        <span>1.0 (2025)</span>
      </div>
      <div>
        <ul className="footer-content-end">
          <li>All Right Reserved</li>
          <li>&copy; Archi Semtle</li>
          <li className='footer-link' onClick={handleTermsClick}>이용약관</li>
          <li className='footer-link' onClick={handlePrivacyClick}>개인정보수집 및 처리</li>
        </ul>
        {/* 이용약관 팝업 */}
        {showTermsPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>이용약관</h2>
              <p>여기에 이용약관 내용이 들어갑니다.</p>
              <button onClick={closePopup}>닫기</button>
            </div>
          </div>
        )}

        {/* 개인정보수집 팝업 */}
        {showPrivacyPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>개인정보수집 및 처리</h2>
              <p>여기에 개인정보 처리방침 내용이 들어갑니다.</p>
              <button onClick={closePopup}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
