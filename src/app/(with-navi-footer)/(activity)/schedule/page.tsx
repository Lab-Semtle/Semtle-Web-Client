/** 학회 일정 페이지 */

'use client';
import * as React from 'react';
import { useState } from 'react';
import 'react-day-picker/style.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AlertSchedule from '@/components/common/AlertSchedule';
import PageHeading from '@/components/common/PageHeading';
import { ScheduleEvent, ScheduleEventType } from '@/constants/Schedule';

export default function CalendarPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEventType | null>(
    null,
  );

  const handleEventClick = (info: { event: { title: string } }) => {
    const clickedEvent = ScheduleEvent.find(
      (event) => event.title === info.event.title,
    );
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setIsPopupOpen(true); // 팝업 열기
    }
  };

  return (
    <main className="px-6 pb-32 pt-24">
      <div className="flex justify-center">
        <PageHeading
          title="학회 일정"
          description="📅 아치셈틀의 주요 일정을 확인할 수 있습니다."
        />
      </div>
      <div className="lg:px-6d mx-auto mb-[30px] max-w-7xl px-2 sm:px-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          selectable={true}
          initialView="dayGridMonth"
          height="1100px"
          events={ScheduleEvent}
          eventClick={handleEventClick} // 일정 클릭 시 팝업 열기
          eventClassNames="cursor-pointer text-base rounded-lg px-2 py-1"
          dayCellClassNames="text-xl font-bold"
          dayHeaderContent={(arg) => (
            <div className="text-xl font-semibold">{arg.text}</div>
          )}
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
