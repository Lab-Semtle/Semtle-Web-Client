import {
  SiInstagram,
  SiFacebook,
  SiNaver,
  SiGithub,
  SiDiscord,
  SiKakaotalk,
} from 'react-icons/si';
import { ElementType } from 'react';

interface ContactInfo {
  label: string; // 연락처 또는 SNS의 이름
  url: string; // 해당 서비스의 링크
  icon: ElementType; // React 아이콘 컴포넌트 (JSX 요소로 사용 가능)
}

/** SNS Links */
export const SNS_LINKS: ContactInfo[] = [
  { label: 'Instagram', url: 'https://www.instagram.com', icon: SiInstagram },
  { label: 'Naver Cafe', url: 'https://cafe.naver.com', icon: SiNaver },
  { label: 'Facebook', url: 'https://www.facebook.com', icon: SiFacebook },
];

/** 연락처 (Kakao, Discord, Github) */
export const CONTACTS: ContactInfo[] = [
  { label: 'Kakao', url: 'https://example.com/kakao', icon: SiKakaotalk },
  { label: 'Discord', url: 'https://discord.gg/example', icon: SiDiscord },
  { label: 'Github', url: 'https://github.com/example', icon: SiGithub },
];

/** 학회 정보 */
export const FOOTER_INFO = {
  address: '부산광역시 영도구 태종로 727, 국립한국해양대학교 공대 314호',
  version: 'Ver 1.0 (2025)',
  creators: [
    '김민서',
    '박준영',
    '한태현',
    '허태환',
    '국태근',
    '김아름',
    '박상빈',
    '신동혁',
    '이서용',
  ],
};

/** 학회 임원진 연락처 */
export const EXECUTIVES = [
  { role: '회장', name: '이상영', phone: '010-0000-0000' },
  { role: '부회장', name: '홍길동', phone: '010-1111-1111' },
  { role: '학습부장', name: '김민지', phone: '010-2222-2222' },
];
