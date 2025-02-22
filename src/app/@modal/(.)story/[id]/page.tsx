'use client';
import Modal from '@/components/common/modal';
]

export default function Page(props: any) {
  return (
    <div>
        <Modal>
            <BookPage {...props}/>    
        </Modal>
    </div>
);
}
