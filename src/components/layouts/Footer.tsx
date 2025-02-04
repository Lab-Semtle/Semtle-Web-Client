'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AlertCard from '@/components/AlertCard';

// //NOTE - Footer Contact Data Fetching
// async function fetchContactData() {
//   const res = await fetch('example/api/contact');
//   if (!res.ok) {
//     throw new Error('Failed to load data...');
//   }
//   const ContactData: ContactData[] = await res.json();
//   return ContactData;
// }
//NOTE - Footer SNS Logo Data Fetching
// async function fetchFooterLogo() {
//   const res = await fetch('example/api/logo');
//   if (!res.ok) {
//     throw new Error('Failed to load data...');
//   }
//   const FooterLogo: FooterLogo[] = await res.json();
//   return FooterLogo;
// }
const ContactData = {
  address: '서울특별시 강남구 학회길 123',
  map_location: {
    latitude: 37.5665,
    longitude: 126.978,
  },
  general_contact: {
    Email: 'example@univ.ac.kr',
    Kakao: 'https://example.com/kakao',
    Instagram: 'https://example.com/instagram',
  },
  dev_contact: {
    Github: 'https://github.com/example',
    Discord: 'https://discord.gg/example',
    Kakao: 'https://example.com/devkakao',
  },
};
export default function Footer() {
  return (
    <Card className="rounded-none bg-black p-5 text-white">
      <CardHeader>
        <CardTitle className="flex gap-3">
          <Link href={ContactData.general_contact.Instagram}>
            <Image
              src="/instagram_logo.webp"
              alt="Instagram"
              width={35}
              height={35}
            />
          </Link>
          <Link href="/카페주소">
            <Image
              src="/naver_cafe_logo.jpg"
              alt="naver_cafe"
              width={35}
              height={35}
            />
          </Link>
          <Link href="/페이스북링크">
            <Image src="/facebook.png" alt="facebook" width={35} height={35} />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Contact Semtle
          <span className="ml-10" />
          전화번호{' | '}{' '}
          <Link href={ContactData.general_contact.Kakao}>
            {ContactData.general_contact.Kakao}
          </Link>
        </p>
        <p>
          Contact Dev.
          <span className="ml-[60px]" />
          <Link href={ContactData.dev_contact.Discord}>
            {ContactData.dev_contact.Discord}
          </Link>
        </p>
        <p>
          Github.
          <span className="ml-[100px]" />
          <Link href={ContactData.dev_contact.Github}>
            {ContactData.dev_contact.Github}
          </Link>
        </p>
        <p>
          Develpoers. <span className="ml-[60px]" />
          김민서 박준영 한태현 허태환 국태근 김아름 박상빈 신동혁 이서용
        </p>
        <p>
          Version <span className="ml-[92px]" />
          1.0 (2025)
        </p>
      </CardContent>
      <CardFooter className="gap-4">
        <p>All Right Reserved</p>
        <p>&copy;Arch Semtle</p>
        <AlertCard
          TriggerText="이용약관"
          TitleText="이용약관"
          DescriptionText="여기 이용약관 내용을 삽입합니다."
          ActionText="닫기"
        />
        <AlertCard
          TriggerText="개인정보수집 및 처리"
          TitleText="개인정보수집 및 처리"
          DescriptionText="여기에 개인정보수집 및 처리 내용을 삽입합니다."
          ActionText="닫기"
        />
      </CardFooter>
    </Card>
  );
}
