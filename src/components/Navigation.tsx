'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
//import Image from 'next/image';

export default function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <nav className="navBar">
      <div className="navBarLogoToggle">
        <div className="navBarLogo">
          <img src="/semtle_logo_square.jpg" alt="Logo" className="logoImage" />
          <label className="modeToggle">
            <input role="switch" type="checkbox" />
          </label>
        </div>

        <div className="navBarMenus">
          <ul className="navBarMenusLink">
            <Link href="/" className="navBarMenusLinks">
              Home
            </Link>
            <li className="group relative">
              <button className="navBarMenusLinks">About</button>
              <div className="dropdownContainer">
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
              <button className="navBarMenusLinks">Activity</button>
              <div className="dropdownContainer">
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
              <button className="navBarMenusLinks">Archive</button>
              <div className="dropdownContainer">
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

          <ul className="navBarLoginJoin">
            {!isLoggedIn ? (
              <>
                <li>
                  <Link href="/recruiting" className="navBarMenusLinks">
                    Join
                  </Link>
                </li>
                <li>
                  <Link href="/login">
                    <button className="btnLogin">Login</button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={toggleLogin} className="btnLogout">
                    Logout
                  </button>
                </li>
                <li className="flex items-center">
                  <button onClick={toggleDropdown}>
                    <img
                      src="/semtle_logo_square.jpg"
                      alt="Profile"
                      className="profileImage cursor-pointer"
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
