'use client';

//import Image from 'next/image';
//import { useState } from 'react';
import Link from 'next/link';

export default function NavigationBar() {
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
          {' '}
          {/* relative 추가 */}
          <ul className="flex gap-4">
            <Link href="/" className="text-lg font-semibold text-gray-700">
              Home
            </Link>
            <li className="text-lg font-semibold text-gray-700">About</li>
            <li className="text-lg font-semibold text-gray-700">Activity</li>
            <li className="text-lg font-semibold text-gray-700">Archive</li>
          </ul>
          {/* Right Section: Join and Login */}
          <ul className="flex gap-2">
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
