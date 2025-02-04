'use client';
import * as React from 'react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import 'react-day-picker/style.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AlertSchedule from '@/components/AlertSchedule';


interface CalendarEventType {
  date: string;
  title: string;
  start: string;
  end: string;  // end는 선택적 속성
  location: string;
  description: string;
}

const CalendarEvent: CalendarEventType[] = [
  {
    date: '2025-02-10',
    title: '정기회의',
    start: '2025-02-10T12:30:00',
    end: '2025-02-12T13:30:00',
    location: '강의실 101호',
    description: '1월 정기회의 진행',
  },
  {
    date: '2025-02-15',
    title: '학회 프로젝트 발표',
    start: '2025-02-15T14:00:00',
    end: '2025-02-15T16:00:00', // 추가된 end
    location: '컨퍼런스룸 A',
    description: '학회에서 진행한 프로젝트 결과 발표',
  },
];

export default function CalendarPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventType | null>(
    null,
  );

  const handleEventClick = (info: { event: { title: string } }) => {
    const clickedEvent = CalendarEvent.find(
      (event) => event.title === info.event.title,
    );
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setIsPopupOpen(true); // 팝업 열기
    }
  };

  return (
    <main>
      <div className="mb-[70px] mt-[150px]">
        <Label className="flex justify-center text-[27px]">학회 일정</Label>
      </div>
      <div className="mb-[30px]">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          selectable={true}
          initialView="dayGridMonth"
          height="1100px"
          events={CalendarEvent}
          eventClick={handleEventClick} // 일정 클릭 시 팝업 열기
          eventClassNames="cursor-pointer"
        />
      </div>

      {isPopupOpen && selectedEvent && (
        <AlertSchedule
          selectedEvent={selectedEvent}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </main>
  );
}
