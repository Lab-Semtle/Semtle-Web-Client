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

/** 저작권 */
export const COPYRIGHT = 'Copyright © ARCHI SEMTLE';

/** 이용약관 및 개인정보 정책 */
export const POLICIES = [
  {
    triggerText: '이용약관',
    title: '이용약관',
    description: '여기 이용약관 내용을 삽입합니다.',
    actionText: '닫기',
  },
  {
    triggerText: '개인정보수집 및 처리',
    title: '개인정보수집 및 처리',
    description: '여기에 개인정보수집 및 처리 내용을 삽입합니다.',
    actionText: '닫기',
  },
];
