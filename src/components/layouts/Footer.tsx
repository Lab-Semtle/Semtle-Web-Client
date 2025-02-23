import Link from 'next/link';
import React from 'react';
import { SNS_LINKS, CONTACTS, COPYRIGHT, POLICIES } from '@/constants/footer';
import AlertCard from '@/components/AlertCard';

const Footer: React.FC = () => {
  return (
    <footer
      className="relative rounded-t-2xl bg-gray-900 py-10 text-white dark:bg-gray-800"
      style={{
        borderTopLeftRadius: '30px', // 왼쪽 위 둥글게
        borderTopRightRadius: '30px', // 오른쪽 위 둥글게
        overflow: 'hidden', // 내부 요소 잘림 방지
      }}
    >
      <div className="container mx-auto flex flex-col justify-between px-5 md:flex-row">
        {/* 왼쪽 영역 - SNS + ARCHI SEMTLE LAB 정보 */}
        <div className="text-left">
          {/* SNS + Contacts 아이콘 */}
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
          <p className="mt-2">
            부산광역시 영도구 태종로 727, 국립한국해양대학교 공대 314호
          </p>
          <p className="mt-2">
            Ver 1.0 (2025) Created by 김민서 박준영 한태현 허태환 국태근 김아름
            박상빈 신동혁 이서용
          </p>
        </div>

        {/* 오른쪽 영역 - 연락처 */}
        <div className="mt-6 text-right md:mt-0 md:text-left">
          <p className="font-bold">회장</p>
          <p>이상영 010-0000-0000</p>
          <p className="mt-3 font-bold">부회장</p>
          <p>홍길동 010-1111-1111</p>
          <p className="mt-3 font-bold">학습부장</p>
          <p>김민지 010-2222-2222</p>
        </div>
      </div>

      {/* Footer Bottom - 이용약관 및 저작권 */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
        <div className="flex flex-wrap justify-center gap-4">
          {POLICIES.map((policy, index) => (
            <React.Fragment key={index}>
              <AlertCard
                TriggerText={policy.triggerText}
                TitleText={policy.title}
                DescriptionText={policy.description}
                ActionText={policy.actionText}
              />
              {index !== POLICIES.length - 1 && (
                <span key={`divider-${index}`}>|</span>
              )}
            </React.Fragment>
          ))}
          <span>|</span>
          <p>{COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
