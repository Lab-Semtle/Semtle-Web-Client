'use client';

import { useRouter } from 'next/navigation';
import style from './modal.module.css';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
    <dialog
      onClose={() => router.back()} // esc 버튼 -> 뒤로가기
      onClick={(e) => {
        // 모달의 배경이 클릭된거면 -> 뒤로가기
        // 자바스크립트에서 e.target의 nodeName 속성 지원안해서 에러뜨면 아래와 같이 any 타입으로 단언할 것
        if ((e.target as any).nodeName === 'DIALOG') {
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
