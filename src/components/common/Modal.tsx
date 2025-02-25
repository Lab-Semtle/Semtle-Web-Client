'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(
    <motion.dialog
      ref={dialogRef}
      onClose={() => router.back()}
      onClick={(e) => {
        if ((e.target as HTMLElement).nodeName === 'DIALOG') {
          router.back();
        }
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
    >
      <motion.div
        className="relative w-full max-w-5xl rounded-lg bg-white p-8 shadow-xl dark:bg-gray-900"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않음
      >
        <button
          className="absolute right-4 top-4 text-gray-600 dark:text-gray-400"
          onClick={() => router.back()}
        >
          <XIcon className="h-6 w-6" />
        </button>
        {children}
      </motion.div>
    </motion.dialog>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
