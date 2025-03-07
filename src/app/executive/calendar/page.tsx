import Calendar from '@/components/admin/calendar/calendar';

const CalendarPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start">
      <h1 className="mb-4 text-4xl font-bold text-red-400">준비중 입니다..!</h1>
      <div className="relative w-full max-w-4xl">
        <div className="pointer-events-none opacity-50">
          <Calendar />
        </div>
        {/* 클릭 방지 오버레이 */}
        <div className="pointer-events-auto absolute inset-0 bg-gray-500 bg-opacity-50"></div>
      </div>
    </div>
  );
};

export default CalendarPage;
