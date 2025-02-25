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
  label: string;
  url: string;
  icon: ElementType;
}

/** SNS Links */
export const SNS_LINKS: ContactInfo[] = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/2.3__0_archisemtle?igsh=anY2emVpY21lamtx',
    icon: SiInstagram,
  },
  {
    label: 'Naver Cafe',
    url: 'https://cafe.naver.com/archisemtle2022',
    icon: SiNaver,
  },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/share/g/18B9AYDGNc/',
    icon: SiFacebook,
  },
];

/** 연락처 (Kakao, Discord, Github) */
export const CONTACTS: ContactInfo[] = [
  { label: 'Kakao', url: 'https://example.com/kakao', icon: SiKakaotalk },
  { label: 'Discord', url: 'https://discord.gg/ukTmVtNtPF', icon: SiDiscord },
  { label: 'Github', url: 'https://github.com/Lab-Semtle', icon: SiGithub },
];

/** 학회 정보 */
export const FOOTER_INFO = {
  address: '부산광역시 영도구 태종로 727, 국립한국해양대학교 공학1관 308호',
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
  { role: '회장', name: '18 이상영', phone: '010-9214-7462' },
  { role: '부회장', name: '21 박유민', phone: '010-7313-7067' },
  { role: '학습부장', name: '20 박상빈', phone: '010-2402-5971' },
];
