'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { TimelineData } from '@/constants/TimelineData';
import { motion } from 'framer-motion';

export default function StoryPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = Number(params?.id);
  if (isNaN(eventId)) return null;

  const event = TimelineData.find((item) => item.id === eventId);
  if (!event) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => router.back()} // 모달 바깥 클릭하면 닫힘
    >
      <motion.div
        className="relative max-w-lg rounded-lg bg-white p-6 shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 방지
      >
        <button
          className="absolute right-2 top-2 text-gray-600"
          onClick={() => router.back()}
        >
          ✕
        </button>
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
          <Image
            src={event.imageUrl || '/images/semtle_logo_sqare_white.jpg'}
            alt={event.title}
            layout="fill" // 부모 div 크기에 맞춰 자동으로 크기 조절
            objectFit="cover" // 이미지를 박스에 꽉 채우되 비율 유지
            className="rounded-md"
            priority // 모달에서는 우선적으로 로드
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
        <p className="mt-2 text-gray-700">{event.description}</p>
      </motion.div>
    </motion.div>
  );
}
