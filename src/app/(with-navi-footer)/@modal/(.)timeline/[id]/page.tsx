// import Modal from '@/components/common/Modal';
// import TimelineStoryPage from '@/app/(with-navi-footer)/(about)/timeline/[id]/page';

// export default function ModalTimelinePage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   return (
//     <Modal>
//       <TimelineStoryPage id={params.id} />
//     </Modal>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Modal from '@/components/common/Modal';
import TimelineStoryPage from '@/app/(with-navi-footer)/(about)/timeline/[id]/page';

export default function ModalTimelinePage() {
  const params = useParams(); // ✅ useParams로 동적 경로 가져오기
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id) {
      setId(params.id); // ✅ useEffect에서 상태 업데이트
    }
  }, [params]);

  if (!id) return null; // ✅ id가 없을 경우 아무것도 렌더링하지 않음

  return (
    <Modal>
      <TimelineStoryPage id={id} />
    </Modal>
  );
}
