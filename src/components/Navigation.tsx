'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
//import Image from 'next/image';

export default function NavigationBar() {
  // 로그인 상태를 true로 설정하여 로그인 상태를 가정
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
  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false); // 드롭다운을 닫음
      }
    };

    document.addEventListener('mousedown', handleClickOutside); // 마우스 클릭 이벤트 리스너 추가

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);
  return (
    <nav className="group fixed top-0 z-50 w-full bg-gray-100 shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section: Logo and Toggle */}
        <div className="flex items-center gap-4">
          {/* Circle Logo */}
          <img src="/semtle_logo_square.jpg" alt="Logo" className="logoImage" />

          {/* Toggle Switch */}
          <label className="modeToggle">
            <input role="switch" type="checkbox" />
          </label>
        </div>

        {/* Center Section: Navigation Menu (Home ~ Archive) */}
        <div className="relative flex gap-4">
          <ul className="flex gap-4">
            <Link href="/" className="text-lg font-semibold text-gray-700">
              Home
            </Link>
            <li className="text-lg font-semibold text-gray-700">About</li>
            <li className="text-lg font-semibold text-gray-700">Activity</li>
            <li className="text-lg font-semibold text-gray-700">Archive</li>
          </ul>

          {/* Right Section: Join / Logout and Profile Image */}
          <ul className="flex gap-2">
            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/join"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Join
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <button className="btn-login">Login</button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Logout Button */}
                <li>
                  <button onClick={toggleLogin} className="logout-btn">
                    Logout
                  </button>
                </li>
                {/* Profile Image */}
                <li className="flex items-center">
                  <button onClick={toggleDropdown}>
                    <img
                      src="/semtle_logo_square.jpg" // 실제 프로필 이미지 경로
                      alt="Profile"
                      className="profile-image cursor-pointer"
                    />
                  </button>
                </li>
                {/* Dropdown Menu */}
                {isDropdownVisible && (
                  <div
                    ref={dropdownRef}
                    className="z-60 absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg"
                  >
                    <ul>
                      <li className="cursor-pointer px-4 py-2 hover:bg-gray-200">
                        개인정보관리
                      </li>
                      <li className="cursor-pointer px-4 py-2 hover:bg-gray-200">
                        내 활동관리
                      </li>
                      <li className="cursor-pointer px-4 py-2 hover:bg-gray-200">
                        시간표
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Dropdown Menu Container */}
      <div className="dropdown-container group-hover:max-h-[200px] group-hover:opacity-100">
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link href="/">소개</Link>
            </li>
            <li>
              <Link href="/">조직도</Link>
            </li>
            <li>
              <Link href="/">History</Link>
            </li>
          </ul>
        </div>
        <div className="dropdown-menu ml-0">
          <ul>
            <li>
              <Link href="/">활동</Link>
            </li>
            <li>
              <Link href="/">프로젝트</Link>
            </li>
            <li>
              <Link href="/">학회 일정</Link>
            </li>
          </ul>
        </div>
        <div className="dropdown-menu ml-0">
          <ul>
            <li>
              <Link href="/">학회회칙</Link>
            </li>
            <li>
              <Link href="/">Secret Note</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
