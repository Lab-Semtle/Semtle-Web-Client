import Link from 'next/link';
import React from 'react';
import {
  SNS_LINKS,
  CONTACTS,
  FOOTER_INFO,
  EXECUTIVES,
} from '@/constants/footer-items';

const Footer: React.FC = () => {
  return (
    <footer
      className="relative rounded-t-2xl bg-gray-800 py-10 text-white dark:bg-gray-900"
      style={{
        borderTopLeftRadius: '30px', // 왼쪽 위 둥글게
        borderTopRightRadius: '30px', // 오른쪽 위 둥글게
        overflow: 'hidden', // 내부 요소 잘림 방지
      }}
    >
      <div className="container mx-auto flex flex-col justify-between px-5 md:flex-row">
        {/* 왼쪽 영역 - SNS + ARCHI SEMTLE LAB 정보 */}
        <div className="text-left">
          {/* SNS + 연락처 아이콘 */}
          <div className="mb-4 flex flex-wrap gap-3">
            {[...SNS_LINKS, ...CONTACTS].map((link, index) => (
              <Link
                key={index}
                href={link.url}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon className="h-6 w-6 transition-opacity duration-300 hover:opacity-80" />
              </Link>
            ))}
          </div>

          {/* ARCHI SEMTLE LAB 정보 */}
          <p className="text-lg font-bold">ARCHI SEMTLE LAB</p>
          <p className="mt-2">{FOOTER_INFO.address}</p>
          <p className="mt-2">{FOOTER_INFO.version} Created by</p>
          <ul className="mt-1 list-none space-y-1">
            {FOOTER_INFO.creators.map((name, index) => (
              <li key={index} className="inline-block pr-2">
                {name}
                {index !== FOOTER_INFO.creators.length - 1 && ','}
              </li>
            ))}
          </ul>
        </div>

        {/* 오른쪽 영역 - 연락처 */}
        <div className="mt-6 text-right md:mt-0 md:text-left">
          {EXECUTIVES.map((executive, index) => (
            <div key={index} className="mt-3">
              <p className="font-bold">{executive.role}</p>
              <p>
                {executive.name} {executive.phone}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom - 이용약관 및 저작권 */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/policies/terms" className="hover:underline">
            이용약관
          </Link>
          <span>|</span>
          <Link href="/policies/privacy" className="hover:underline">
            개인정보처리방침
          </Link>
          <span>|</span>
          <p>Copyright © ARCHI SEMTLE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
