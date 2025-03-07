'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Modal from '@/components/common/Modal';
import { TimelineData } from '@/constants/TimelineData';
import type { TimelineElement } from '@/types/timeline';
import Image from 'next/image';

export default function ModalTimelinePage() {
  const params = useParams();
  const [event, setEvent] = useState<TimelineElement | null>(null);

  useEffect(() => {
    if (params?.id) {
      const idValue = Array.isArray(params.id)
        ? Number(params.id[0])
        : Number(params.id);
      const foundEvent = TimelineData.find((item) => item.id === idValue);
      setEvent(foundEvent || null);
    }
  }, [params]);

  if (!event) return null;

  return (
    <Modal>
      <div className="relative min-h-[80vh] w-full max-w-5xl rounded-lg bg-white p-8 dark:bg-gray-900">
        {/* 제목 */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {event.title}
        </h2>

        {/* 이미지 */}
        <div className="relative my-6 h-[500px] w-full overflow-hidden rounded-md">
          <Image
            src={event.imageUrl || '/images/semtle_logo_sqare_white.jpg'}
            alt={event.title}
            width={900}
            height={500}
            className="rounded-md object-cover"
            priority
          />
        </div>

        {/* 본문 */}
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {event.description}
        </p>
      </div>
    </Modal>
  );
}
