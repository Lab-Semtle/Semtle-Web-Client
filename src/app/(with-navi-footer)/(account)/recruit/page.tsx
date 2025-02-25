'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CircleHelp, Users2Icon, CalendarDays, Link2 } from 'lucide-react';
import PageHeading from '@/components/common/PageHeading';
import {
  faqData,
  recruitImage,
  recruitConditions,
  recruitSchedule,
  recruitApplyUrl,
  recruitApplyDescription,
} from '@/constants/RecruitData';

export default function JoinPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-24">
      {/* 페이지 헤딩 */}
      <PageHeading
        title="아치셈틀 리크루팅"
        description="아치셈틀과 함께 배우고 성장하세요. 
        프로그래밍에 관심 있는 누구나 지원할 수 있습니다! 😺"
      />

      <div className="w-full max-w-4xl">
        {/* 포스터 이미지 */}
        <div className="mb-10 flex justify-center">
          <Image
            src={recruitImage}
            alt="Join Us Poster"
            width={400}
            height={800}
            className="h-auto w-full rounded-3xl shadow-lg"
          />
        </div>

        {/* 모집 정보 섹션 */}
        <div className="container py-40">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-12">
              <div>
                <h2 className="text-center text-3xl font-black tracking-tight lg:text-4xl">
                  모집 정보
                </h2>
              </div>
              <div className="space-y-6 lg:space-y-10">
                {/* 모집 조건 */}
                <div className="flex">
                  <Users2Icon className="mt-2 h-6 w-6 flex-shrink-0" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-lg font-semibold lg:text-xl">
                      가입 조건
                    </h3>
                    <p className="mt-1 text-lg font-medium text-muted-foreground lg:text-xl lg:leading-relaxed">
                      {recruitConditions.map((condition, index) => (
                        <span key={index}>
                          {condition}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* 모집 일정 */}
                <div className="flex">
                  <CalendarDays className="mt-2 h-6 w-6 flex-shrink-0" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-lg font-semibold lg:text-xl">
                      모집 일정
                    </h3>
                    <p className="mt-1 text-lg font-medium text-muted-foreground lg:text-xl lg:leading-relaxed">
                      {recruitSchedule.map((schedule, index) => (
                        <span key={index}>
                          {schedule}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* 신청 방법 */}
                <div className="flex">
                  <Link2 className="mt-2 h-6 w-6 flex-shrink-0" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-lg font-semibold lg:text-xl">
                      신청 방법
                    </h3>
                    <p className="mt-1 text-lg font-medium text-muted-foreground lg:text-xl lg:leading-relaxed">
                      {recruitApplyDescription.map((apply, index) => (
                        <span key={index}>
                          {apply}
                          <br />
                        </span>
                      ))}
                    </p>
                    <Button
                      className="mt-2 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                      onClick={() => window.open(recruitApplyUrl, '_blank')}
                    >
                      가입 신청하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ 섹션 */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-20 mt-20 text-center text-3xl font-black tracking-tight lg:text-4xl">
            자주 묻는 질문
          </h2>

          <div className="mx-auto mt-6 max-w-3xl divide-y divide-border">
            {faqData.map(({ faqQuestion, faqAnswer, id }) => (
              <div key={id} className="py-8 first:pt-0 last:pb-0">
                <div className="flex gap-x-5">
                  <CircleHelp className="mt-1 size-6 shrink-0 text-muted-foreground" />
                  <div className="grow">
                    <h3 className="text-lg font-semibold lg:text-xl">
                      {faqQuestion}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-muted-foreground lg:text-xl lg:leading-relaxed">
                      {faqAnswer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
