'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
//import Image from 'next/image';

export default function NavigationBar() {
  // 로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // 로그인/로그아웃 토글 함수
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev); // 드롭다운 상태를 토글
  };

  const dropdownRef = useRef(null);
  // 외부 클릭 시 마이페이지 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // 마우스 클릭 이벤트 리스너 추가

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);
  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-100 shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <img src="/semtle_logo_square.jpg" alt="Logo" className="logoImage" />

          <label className="modeToggle">
            <input role="switch" type="checkbox" />
          </label>
        </div>

        <div className="relative flex gap-4">
          <ul className="flex gap-4">
            <Link href="/" className="text-lg font-semibold text-gray-700">
              Home
            </Link>
            <li className="group relative">
              <button className="text-lg font-semibold text-gray-700">
                About
              </button>
              <div className="dropdown-container">
                <ul>
                  <li>
                    <Link href="/about">소개</Link>
                  </li>
                  <li>
                    <Link href="/organization">조직도</Link>
                  </li>
                  <li>
                    <Link href="/history">History</Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className="group relative">
              <button className="text-lg font-semibold text-gray-700">
                Activity
              </button>
              <div className="dropdown-container">
                <ul>
                  <li>
                    <Link href="/activities">활동</Link>
                  </li>
                  <li>
                    <Link href="/projects">프로젝트</Link>
                  </li>
                  <li>
                    <Link href="/schedule">학회 일정</Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className="group relative">
              <button className="text-lg font-semibold text-gray-700">
                Archive
              </button>
              <div className="dropdown-container">
                <ul>
                  <li>
                    <Link href="/regulations">학회회칙</Link>
                  </li>
                  <li>
                    <Link href="/secret">Secret Note</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <ul className="flex gap-2">
            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/recruiting"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Join
                  </Link>
                </li>
                <li>
                  <Link href="/login">
                    <button className="btn-login">Login</button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={toggleLogin} className="logout-btn">
                    Logout
                  </button>
                </li>
                <li className="flex items-center">
                  <button onClick={toggleDropdown}>
                    <img
                      src="/semtle_logo_square.jpg" // 실제 프로필 이미지 경로
                      alt="Profile"
                      className="profile-image cursor-pointer"
                    />
                  </button>
                </li>
                {isDropdownVisible && (
                  <div
                    ref={dropdownRef}
                    className="z-60 absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg"
                  >
                    <ul>
                      <li>
                        <Link href="/mypage/${userid}">개인정보관리</Link>
                      </li>
                      <li>
                        <Link href="/mypage/${userid}/activities"></Link>내
                        활동관리
                      </li>
                      <li>
                        <Link href="/">시간표</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
