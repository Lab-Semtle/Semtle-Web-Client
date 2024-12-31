'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className="nav-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="nav-list">
        <li className="logoContainer">
          <img src="/semtle_logo_square.jpg" alt="Logo" className="logoImage" />
          <label className="modeToggle">
            <input role="switch" type="checkbox" />
          </label>
        </li>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/services">Activity</Link>
        </li>
        <li>
          <Link href="/contact">Archive</Link>
        </li>
        <li>
          <Link href="/">Join</Link>
        </li>
        <li>
          <button className="btn-login">Login</button>
        </li>
      </ul>
      {/* 드롭다운 메뉴 */}
      <div className={`nav-dropdown ${isDropdownOpen ? 'open' : ''}`}>
        <ul className="ulFirst">
          <li>
            <Link href="/service1">소개</Link>
          </li>
          <li>
            <Link href="/service2">조직도</Link>
          </li>
          <li>
            <Link href="/service3">History</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/service1">활동</Link>
          </li>
          <li>
            <Link href="/service2">프로젝트</Link>
          </li>
          <li>
            <Link href="/service3">학회일정</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/service1">학회회칙</Link>
          </li>
          <li>
            <Link href="/service2">Secret Note</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
