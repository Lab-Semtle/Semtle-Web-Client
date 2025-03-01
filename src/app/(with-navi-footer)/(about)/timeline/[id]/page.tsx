'use client';

import Image from 'next/image';
import { TimelineData } from '@/constants/TimelineData';

/** 학회 연혁 상세 페이지 */
export default function TimelineStoryPage({ id }: { id: string }) {
  const eventId = Number(id);
  if (!eventId) return <div className="text-red-500">잘못된 요청입니다.</div>;

  const event = TimelineData.find((item) => item.id === eventId);
  if (!event) return null;

  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900 dark:shadow-gray-800/50">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {event.title}
      </h2>
      <div className="relative my-4 h-64 w-full overflow-hidden rounded-md">
        <Image
          src={event.imageUrl || '/images/semtle_logo_sqare_white.jpg'}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
          priority
        />
      </div>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        {event.description}
      </p>
    </div>
  );
}
