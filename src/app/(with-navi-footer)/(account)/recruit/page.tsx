'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CircleHelp, UserCheck, CalendarDays, Link2 } from 'lucide-react';
import { Building2Icon, ThumbsUpIcon, Users2Icon } from 'lucide-react';

const faqs = [
  {
    question: '가입 비용이 있나요?',
    answer:
      '아니요, 가입은 무료입니다. 다만, 활동을 적극적으로 참여해야 합니다.',
  },
  {
    question: '코딩 경험이 없어도 가입할 수 있나요?',
    answer:
      '네! 기초부터 배우고 싶은 분들도 환영합니다. 하지만 열정이 중요합니다.',
  },
  {
    question: '어떤 기술을 배우나요?',
    answer:
      '알고리즘, 웹 개발, 서버 개발, 머신러닝 등 다양한 기술을 배울 수 있습니다.',
  },
  {
    question: '가입 후 어떤 활동을 하나요?',
    answer: '스터디, 프로젝트, 알고리즘 대회 참가 등 다양한 활동이 있습니다.',
  },
];

export default function JoinPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      {/* 🔹 포스터 이미지 */}
      <div className="mb-10 w-full max-w-4xl">
        <Image
          src="/images/join-poster.png" // ✅ 실제 이미지 경로 설정
          alt="Join Us Poster"
          width={800}
          height={500}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* 🔹 모집 정보 섹션 (새로운 아이콘 기반 UI) */}
      <div className="container py-16">
        <div className="mx-auto max-w-2xl">
          {/* Grid */}
          <div className="grid gap-12">
            <div>
              <h2 className="text-center text-3xl font-bold lg:text-4xl">
                모집 정보
              </h2>
            </div>
            <div className="space-y-6 lg:space-y-10">
              {/* 가입 조건 */}
              <div className="flex">
                <Users2Icon className="mt-2 h-6 w-6 flex-shrink-0" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg">
                    가입 조건
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    ✔ 전북대학교 재학생 <br />
                    ✔ 프로그래밍에 관심 있는 사람 <br />✔ 적극적으로 활동할 수
                    있는 사람
                  </p>
                </div>
              </div>

              {/* 모집 일정 */}
              <div className="flex">
                <CalendarDays className="mt-2 h-6 w-6 flex-shrink-0" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg">
                    모집 일정
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    📌 모집 시작: 2024년 8월 1일 <br />⏳ 모집 마감: 2024년 8월
                    31일
                  </p>
                </div>
              </div>

              {/* 신청 방법 */}
              <div className="flex">
                <Link2 className="mt-2 h-6 w-6 flex-shrink-0" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg">
                    신청 방법
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    아래 버튼을 클릭하여 신청하세요.
                  </p>
                  <Button
                    className="mt-2 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={() =>
                      window.open('https://join-us.example.com', '_blank')
                    }
                  >
                    가입 신청하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* End Grid */}
        </div>
      </div>

      {/* 🔹 FAQ 섹션 */}
      <div className="mt-16 max-w-4xl">
        <h2 className="text-center text-2xl font-bold md:text-3xl">
          자주 묻는 질문
        </h2>

        <div className="mx-auto mt-6 max-w-2xl divide-y divide-border">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-8 first:pt-0 last:pb-0">
              <div className="flex gap-x-5">
                <CircleHelp className="mt-1 size-6 shrink-0 text-muted-foreground" />
                <div className="grow">
                  <h3 className="font-semibold md:text-lg">{faq.question}</h3>
                  <p className="mt-1 text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
