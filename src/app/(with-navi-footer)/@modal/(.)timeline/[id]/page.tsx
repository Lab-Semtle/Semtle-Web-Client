'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Modal from '@/components/common/Modal';
import TimelineStoryPage from '@/app/(with-navi-footer)/(about)/timeline/[id]/page';

export default function ModalTimelinePage() {
  const params = useParams();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id) {
      const idValue = Array.isArray(params.id) ? params.id[0] : params.id;
      setId(idValue);
    }
  }, [params]);

  if (!id) return null;

  return (
    <Modal>
      <TimelineStoryPage id={id} />
    </Modal>
  );
}
