/** 개별 타임라인 게시물 페이지 */

'use client';
import Image from 'next/image';
import { TimelineData } from '@/constants/TimelineData';

export default function TimelineStoryPage({ id }: { id: string }) {
  const eventId = Number(id);
  if (!eventId) return <div>잘못된 요청입니다.</div>;

  const event = TimelineData.find((item) => item.id === eventId);
  if (!event) return null;

  return (
    <div className="relative max-w-lg rounded-lg bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
        <Image
          src={event.imageUrl || '/images/semtle_logo_sqare_white.jpg'}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
          priority
        />
      </div>
      <p className="mt-2 text-gray-700">{event.description}</p>
    </div>
  );
}
